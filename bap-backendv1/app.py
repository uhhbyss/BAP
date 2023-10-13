# from flask import Flask, render_template, request, jsonify 
# from pymango import MongoClient
# from bson import ObjectId

# app = Flask(__name__)

# uri = 'mongodb+srv://bisaamh:bisaamhassan@bap-hrd.wlvquy6.mongodb.net/?retryWrites=true&w=majority'
# client = MongoClient(uri)
# db = client[]






# if __name__ == '__main__':
#     app.run()



from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://bisaamh:bisaamh@bap-hrd.wlvquy6.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)