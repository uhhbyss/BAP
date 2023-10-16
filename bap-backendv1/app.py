from flask import Flask, render_template, request, jsonify 
from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS
import os
from config import config

app = Flask(__name__)

uri = config["MONGO_URI"]
client = MongoClient(uri)
db = client["BAP-MAIN"]

CORS(app)

@app.route('/')
@app.route('/login/', methods=['GET', 'POST'])
def login():

    user = request.args.get('user')
    password = request.args.get('pw')

    if(user and password):
        if request.method == 'GET':
            foundUser = db['UserAuth'].find_one({'username':user})
            if foundUser and foundUser['password'] == password:
                return jsonify({
                    "status": 'Successfully Logged in (valid user and pass)'
                })
            else:
                return jsonify({
                    "status":"Failed to login (username not found or pass incorrect)"
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
            'status': 'Didnt fill in either user or pass'
        })
        
            
        

        
    
    









if __name__ == '__main__':
    app.run()