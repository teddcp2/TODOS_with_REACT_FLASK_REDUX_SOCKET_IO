from pymongo import MongoClient

client = MongoClient('mongodb://localhost:27017/')
todo = client['TODO_APP_DB']['TODO_collection']

print('Number of Records : ', todo.count_documents({}))
