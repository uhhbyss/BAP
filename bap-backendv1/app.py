from flask import Flask, render_template, request, jsonify 
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS
import os
from config import config

import cipher

app = Flask(__name__)
CORS(app)

uri = config["MONGO_URI"]
client = MongoClient(uri)
db = client["BAP-MAIN"]


'''
metadata structure:

username = string of encrypted email
projects = list of project ids

'''

    
def findProjects(projectIDList):
    # these are hardcoded for rn but we need to shift to something that could DYNAMICALLY read from the HWSets document in the database
    db_HWSet1 = db['HWSets'].find_one({'name' : "HWSet1"})
    hw1avail = db_HWSet1['availability']
    hw1capa = db_HWSet1['capacity']

    db_HWSet2 = db['HWSets'].find_one({'name' : "HWSet2"})
    hw2avail = db_HWSet2['availability']
    hw2capa = db_HWSet2['capacity']


    projects = []
    for id in projectIDList:
        db_project = db['Projects'].find_one({'id' : id})
        proj_name = db_project['name']
        hw1checked = db_project['checkedOut'][0]
        hw2checked = db_project['checkedOut'][1]
        usersWithAccess = db_project['users']
        description = db_project['description']
        
        projects.append({
            'name' : proj_name,
            # might not need id as an attribute
            'id' : id,
            'users' : usersWithAccess,
            'description' : description,
            'hwsets' : [
                {
                    'name' : "HWSet1",
                    'capacity' : hw1capa,
                    'availability' : hw1avail,
                    'checkedOut' : hw1checked 
                },
                {
                    'name' : "HWSet2",
                    'capacity' : hw2capa,
                    'availability' : hw2avail,
                    'checkedOut' : hw2checked 
                }
            ]
        })
    return projects

def getUserMetadata(user):
    return db['UserMetadata'].find_one({'username': user})

def createUserMetadata(user):
    db['UserMetadata'].insert_one({
        'username' : user,
        'projects': []
    })



@app.route('/')
@app.route('/login/', methods=['GET'])
def login():

    user = request.args.get('user')
    user = cipher.encrypt(user, 8, 1)
    password = request.args.get('pw')
    password = cipher.encrypt(password, 20, -1)


    if(user and password):
        if request.method == 'GET':
            foundUser = db['UserAuth'].find_one({'username':user})
            if foundUser and foundUser['password'] == password:
                print('success')

                userMetaData = getUserMetadata(user)
                foundProjects = findProjects(userMetaData['projects'])

                return jsonify({
                    "status": 'Successfully Logged in (valid user and pass)',
                    'code':'true',
                    'projects': foundProjects
                })
            else:
                print('failure')
                return jsonify({
                    "status":"Failed to login (username not found or pass incorrect)",
                    'code':'false'
                })
    else:
        return jsonify({
            'status': 'Didnt fill in either user or pass',
            'code':'false'
        })
        

@app.route('/signup/', methods=['POST'])
def signup():
    user = request.args.get('user')
    user = cipher.encrypt(user, 8, 1)
    password = request.args.get('pw')
    password = cipher.encrypt(password, 20, -1)

    if(user and password):
        if request.method == 'POST':

            alreadyExists = True if db['UserAuth'].find_one({'username':user}) else False

            if(not alreadyExists):
                db['UserAuth'].insert_one({
                'username':user,
                'password':password
                })

                createUserMetadata(user)

                return jsonify({
                    'status':'Successfully created an account',
                    'code':'true'
                })
            else:
                return jsonify({
                    'status':'Account already exists',
                    'code':'false2'
                })
    else:
        return jsonify({
            'status': 'Didnt fill in either user or pass',
            'code':'false'
        })


@app.route('/projects/', methods=["GET", "POST"])
def projects():
    username = request.args.get('username')
    user = cipher.encrypt(username, 8, 1)

    if request.method == "GET":
        typeReq = request.args.get('typeReq')

        if typeReq == "getProjs":
            if username:
                project_ids = db['UserMetadata'].find_one({'username' : user})['projects']
                projects = findProjects(project_ids)

                return jsonify({
                    'projects' : projects,
                    'status' : "Successfully retreived projects the user is a part of!",
                    'code' : "true"
                })
            else:
                return jsonify({
                    'projects' : [],
                    'status' : "Username is empty!",
                    'code' : 'false'
                })
        # might want to change this because we are doing the computations on the frontend rather than the backend
    elif request.method == "POST":
        typeReq = request.args.get('typeReq')
        if typeReq == "checkIn":
            input = int(request.args.get("amount"))
            hwset = request.args.get("hwset")

            currentAvailable = db['HWSets'].find_one({'name' : hwset})['availability']
            newAvailable = currentAvailable + input

            db['HWSets'].update_one({'name' : hwset}, { "$set" : {'availability': newAvailable } })

            return jsonify({
                    'status' : "Successfully checked IN",
                    'code' : 'true'
                })

        elif typeReq == "checkOut":
            input = int(request.args.get("amount"))
            hwset = request.args.get("hwset")

            currentAvailable = db['HWSets'].find_one({'name' : hwset})['availability']
            newAvailable = currentAvailable - input

            db['HWSets'].update_one({'name' : hwset}, { "$set" : {'availability': newAvailable } })
            
            return jsonify({
                    'status' : "Successfully checked OUT",
                    'code' : 'true'
                })

@app.route('/projectcreation/', methods=['POST'])
def projectcreation():
    name = request.args.get('name')
    id = request.args.get('id')
    description = request.args.get('description')
    currUser = request.args.get('currUser')

    if name and id and description:
        if request.method == "POST":

            alreadyExists = True if db['Projects'].find_one({'username': name}) or db['Projects'].find_one({'id':id}) else False

            if not alreadyExists:
                db['Projects'].insert_one(
                    {
                        'name' : name, 
                        'id' : id, 
                        'description': description,
                        'checkedOut' : [0, 0],
                        'users' : [currUser]
                    }
                )
                return jsonify({
                    'status': 'Sucessfully created a new project',
                    'code' : 'true'
                })
            else: 
                return jsonify({
                    'status' : 'Project name or id may already exist!',
                    'code' : 'false1'
                })
    else:
        return jsonify({
            'status': 'One or more inputs are empty!',
            'code' : 'false2'
        })


    


if __name__ == '__main__':
    app.run()