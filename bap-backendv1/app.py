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



if __name__ == '__main__':
    app.run()