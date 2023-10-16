from dotenv import load_dotenv
import os
load_dotenv()

uri = 'mongodb+srv://bisaamh:bisaamhassan@bap-hrd.wlvquy6.mongodb.net/?retryWrites=true&w=majority'


config = os.environ
DB_USERNAME = os.environ["DB_USERNAME"]
DB_PASS = os.environ["DB_PASS"]
DB_HOST = os.environ["DB_HOST"]
config["MONGO_URI"] = f"mongodb+srv://{DB_USERNAME}:{DB_PASS}@{DB_HOST}"