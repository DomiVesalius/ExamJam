from pymongo import MongoClient

connection_string = "mongodb://localhost:27017/ExamJam"
client = MongoClient(connection_string)['ExamJam']['Course']

if __name__ == '__main__':
    data = client.find({}, {'_id': 1, 'courseCode': 1, 'programArea': 1})
    for d in data:
        identification = d['_id']
        area = d['programArea']
        code = d['courseCode']
        if type(area) == str:
            split_on_comma = d['programArea'].split(',')
            list_of_program_areas = [i.strip() for i in split_on_comma]
            client.update_one({'_id': identification}, {"$set": {"programArea": list_of_program_areas}})
