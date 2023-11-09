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
                return jsonify({
                    "status": 'Successfully Logged in (valid user and pass)',
                    'code':'true'
                })
            else:
                print('failure')
                return jsonify({
                    "status":"Failed to login (username not found or pass incorrect)",
                    'code':'false'
                })
        # elif request.method == 'POST':
        #     db['UserAuth'].insert_one({
        #         'username':user,
        #         'password':password
        #     })
        #     return jsonify({
        #         'status':'Successfully created an account'
        #     })
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

@app.route('/projectcreation/', methods=['POST'])
def projectcreation():
    name = request.args.get('name')
    id = request.args.get('id')
    description = request.args.get('description')

    if name and id and description:
        if request.method == "POST":

            alreadyExists = True if db['Projects'].find_one({'username': name}) or db['Projects'].find_one({'id':id}) else False

            if not alreadyExists:
                db['Projects'].insert_one(
                    {
                        'name' : name, 
                        'id' : id, 
                        'description': description,
                        'checkedOut' : [0, 0]
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
    
@app.route('/projects/', methods=["POST"])
def projects():
    username = request.args.get('username')
    user = cipher.encrypt(username, 8, 1)

    if username:
        if request.method == "POST":
            project_ids = db['UserMetadata'].find_one({'username' : user})['projects']
            projects = []

            db_HWSet1 = db['HWSets'].find_one({'name' : "HWSet1"})
            hw1avail = db_HWSet1['availability']
            hw1capa = db_HWSet1['capacity']

            db_HWSet2 = db['HWSets'].find_one({'name' : "HWSet2"})
            hw2avail = db_HWSet2['availability']
            hw2capa = db_HWSet2['capacity']

            for id in project_ids:
                db_project = db['Projects'].find_one({'id' : id})
                proj_name = db_project['name']
                hw1checked = db_project['checkedOut'][0]
                hw2checked = db_project['checkedOut'][1]
                projects.append({
                    'name' : proj_name,
                    'HWSets' : [
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
            


if __name__ == '__main__':
    app.run()