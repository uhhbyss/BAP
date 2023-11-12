from flask import Flask, render_template, request, jsonify, send_from_directory 
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS, cross_origin
# import os
# from config import config

from .cipher import encrypt

app = Flask(__name__, static_folder="../bapfrontendv1/build", static_url_path="")
CORS(app)

# uri = config["MONGO_URI"]
uri = "mongodb+srv://bisaamh:bisaamhassan@bap-hrd.wlvquy6.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
db = client["BAP-MAIN"]


'''
metadata structure:

username = string of encrypted email
projects = list of project ids

'''


def creatProjectForGlobalUser(id):
    db_HWSet1 = db['HWSets'].find_one({'name' : "HWSet1"})
    hw1avail = db_HWSet1['availability']
    hw1capa = db_HWSet1['capacity']

    db_HWSet2 = db['HWSets'].find_one({'name' : "HWSet2"})
    hw2avail = db_HWSet2['availability']
    hw2capa = db_HWSet2['capacity']


    db_project = db['Projects'].find_one({'id' : id})
    proj_name = db_project['name']
    hw1checked = db_project['checkedOut'][0]
    hw2checked = db_project['checkedOut'][1]
    usersWithAccess = db_project['users']
    description = db_project['description']

    return {'name' : proj_name,
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
        }



def findProjects(projectIDList):
    # these are hardcoded for rn but we need to shift to something that could DYNAMICALLY read from the HWSets document in the database
    # db_HWSet1 = db['HWSets'].find_one({'name' : "HWSet1"})
    # hw1avail = db_HWSet1['availability']
    # hw1capa = db_HWSet1['capacity']

    # db_HWSet2 = db['HWSets'].find_one({'name' : "HWSet2"})
    # hw2avail = db_HWSet2['availability']
    # hw2capa = db_HWSet2['capacity']


    projects = []
    for id in projectIDList:
        db_project = db['Projects'].find_one({'id' : id})
        proj_name = db_project['name']
        hw1checked = db_project['checkedOut'][0]
        hw2checked = db_project['checkedOut'][1]
        usersWithAccess = db_project['users']
        description = db_project['description']
        
        projects.append(creatProjectForGlobalUser(id))
    return projects

def getUserMetadata(user):
    return db['UserMetadata'].find_one({'username': user})

def createUserMetadata(user):
    db['UserMetadata'].insert_one({
        'username' : user,
        'projects': []
    })



@app.route('/')
@cross_origin()
def serve():
    print('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', request.path)
    return send_from_directory(app.static_folder, 'index.html')



@app.route('/login/', methods=['GET'])
@cross_origin()
def login():

    user = request.args.get('user')
    password = request.args.get('pw')


    if(user and password):

        user = encrypt(user, 8, 1)
        password = encrypt(password, 20, -1)

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
@cross_origin()
def signup():
    user = request.args.get('user')
    password = request.args.get('pw')

    if(user and password):
        user = encrypt(user, 8, 1)
        password = encrypt(password, 20, -1)

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
@cross_origin()
def projects():
    username = request.args.get('username')
    if username:
        user = encrypt(username, 8, 1)
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
            elif typeReq == "getAvailability":
                hwsetName = request.args.get('hwset')
                availability = db['HWSets'].find_one({'name' : hwsetName})['availability']
                return jsonify({
                    'status': 'succesfully retrieved availability',
                    'availability' : availability,
                    'code': 'true'
                })
            # might want to change this because we are doing the computations on the frontend rather than the backend
        elif request.method == "POST":
            typeReq = request.args.get('typeReq')
            if typeReq == "checkIn":
                input = int(request.args.get("amount"))
                hwset = request.args.get("hwset")
                projId = request.args.get('project')

                currentAvailable = db['HWSets'].find_one({'name' : hwset})['availability']
                newAvailable = currentAvailable + input

                index = 0 if hwset=='HWSet1' else 1

                db['HWSets'].update_one({'name' : hwset}, { "$set" : {'availability': newAvailable } })
                # db['Projects'].update_one({'id': projId}, {'$inc' : {'checkedout.' + str(index) : -1 * input}})
                currList = db['Projects'].find_one({'id':projId})['checkedOut']
                currList[index] -= input
                db['Projects'].update_one({'id' : projId}, { "$set" : {'checkedOut': currList } })


                return jsonify({
                        'status' : "Successfully checked IN",
                        'code' : 'true'
                    })

            elif typeReq == "checkOut":
                input = int(request.args.get("amount"))
                hwset = request.args.get("hwset")
                projId = request.args.get('project')

                currentAvailable = db['HWSets'].find_one({'name' : hwset})['availability']
                newAvailable = currentAvailable - input

                index = 0 if hwset=='HWSet1' else 1

                db['HWSets'].update_one({'name' : hwset}, { "$set" : {'availability': newAvailable } })
                # this needs to be changed when dynamic hwset are added -> from checkedout.0 to checkedout.$ to account for changing hwset indexes
                # result = db['Projects'].update_one({'name': projName}, {'$inc' : {'checkedout.0.value': input}})
                currList = db['Projects'].find_one({'id':projId})['checkedOut']
                currList[index] += input
                db['Projects'].update_one({'id' : projId}, { "$set" : {'checkedOut': currList } })

                return jsonify({
                        'status' : "Successfully checked OUT",
                        'code' : 'true'
                    })
            
            elif typeReq == "joinProj":
                projectID = request.args.get("ID")
                if db['Projects'].find_one({'id': projectID}):
                    if username not in db['Projects'].find_one({'id': projectID})['users']:
                        db['Projects'].update_one({'id': projectID},{'$push':{'users': username}})
                        db['UserMetadata'].update_one({'username' : user}, {'$push':{'projects': projectID}})
                        return jsonify({
                            'status' : 'Successfully added you to the project!',
                            'code' : 'true'
                        })
                    else: 
                        return jsonify({
                            'status' : 'User already exists in Project!',
                            'code' : 'false'
                        })
                else:
                    return jsonify({
                        'status' : 'ProjectID not found!',
                        'code' : 'false'
                    })
                
            elif typeReq == "leaveProj":
                projectID = request.args.get("ID")
                if db['Projects'].find_one({'id': projectID}):
                    if username in db['Projects'].find_one({'id': projectID})['users']:
                        db['Projects'].update_one({'id': projectID},{'$pull':{'users': username}})
                        db['UserMetadata'].update_one({'username' : user}, {'$pull':{'projects': projectID}})
                        return jsonify({
                            'status' : 'Successfully removed you to the project!',
                            'code' : 'true'
                        })
                    else: 
                        return jsonify({
                            'status' : 'User not already in Project!',
                            'code' : 'false'
                        })
                else:
                    return jsonify({
                        'status' : 'ProjectID not found!',
                        'code' : 'false'
                    })
    else:
        return jsonify({
            'status':'no valid username'
        })
    




@app.route('/projectcreation/', methods=['POST'])
@cross_origin()
def projectcreation():
    name = request.args.get('name')
    id = request.args.get('id')
    description = request.args.get('description')
    currUser = request.args.get('currUser')
    accessUser = encrypt(currUser, 8, 1)

    if name and id and description:
        if request.method == "POST":

            alreadyExists = True if db['Projects'].find_one({'username': name}) or db['Projects'].find_one({'id':id}) else False

            if not alreadyExists:
                db['Projects'].insert_one({
                        'name' : name, 
                        'id' : id, 
                        'description': description,
                        'checkedOut' : [0, 0],
                        'users' : [currUser]
                    })
                db['UserMetadata'].update_one({'username':accessUser}, {'$push':{'projects': id}})
                
                returnForUser = creatProjectForGlobalUser(id)
                # what needs to be stored in the user global state (below) is different from what is stored in the database (above)
                return jsonify({
                    'status': 'Sucessfully created a new project',
                    'code' : 'true',
                    'returnProject' : returnForUser
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