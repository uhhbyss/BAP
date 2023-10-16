from flask import Flask, render_template, request, jsonify 
from pymango import MongoClient
from bson import ObjectId
import os

app = Flask(__name__)

uri = os.environ["MONGO_URI"]
client = MongoClient(uri)
db = client[]






if __name__ == '__main__':
    app.run()