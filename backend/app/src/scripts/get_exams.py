import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import time
import gridfs
import concurrent.futures

connection_string = "mongodb+srv://examjam:5w7O6pg4B5apbaWR@cluster0.g9pxqnk.mongodb.net/?retryWrites=true&w=majority"
db = MongoClient(connection_string)['ExamJam']
client = db['Course']
exams = db['Exam']
fs = gridfs.GridFS(db)


def get_courses_by_first_letter():
    d = {}
    all_courses = list(client.find({}, {'_id': 0, 'courseCode': 1}))
    for course in all_courses:
        if course['courseCode'][0] not in d:
            d[course['courseCode'][0]] = [course]
        else:
            d[course['courseCode'][0]].append(course)
    return d


def get_exams(list_of_courses):
    cookies = {
        "_ga": "GA1.2.558914513.1654707171",
        "_ga_80VDTXHB7F": "GS1.1.1673238173.1.0.1673238174.0.0.0",
        "_ga_9H2P504YR1": "GS1.1.1673236966.1.1.1673238172.0.0.0",
        "ezproxy": "QVqDySQIuNm8dpo",
        "JSESSIONID": "8759A4EDF5BD2DD0EE5D7D41E2B25E76"
    }

    fs_ls = []
    for course in list_of_courses:
        code = course['courseCode']
        print(code)
        exam_repo_path = 'https://exams-library-utoronto-ca.myaccess.library.utoronto.ca/simple-search?query=title%3A' \
                         + course['courseCode']
        x = requests.get(
            exam_repo_path,
            cookies=cookies)
        time.sleep(1)
        soup = BeautifulSoup(x.content, 'html.parser')
        table = soup.findAll('td', {'headers': "t2"})
        if len(table) != 0:
            for i in table:
                path = "https://exams-library-utoronto-ca.myaccess.library.utoronto.ca"
                route = i.find('a')["href"]
                title = i.find('a').get_text()
                if code in title:
                    exam_page = requests.get(path + route, cookies=cookies)
                    time.sleep(1)
                    exam_page = BeautifulSoup(exam_page.content, 'html.parser')
                    exam_page = exam_page.find("aside", {"id": "item-display-bitstreams"}).find('a')["href"]

                    exam_link = path + exam_page
                    exam_binary = requests.get(exam_link, cookies=cookies).content
                    time.sleep(1)

                    files_id = fs.put(exam_binary)
                    new_exam = {'title': title,
                                'courseCode': code,
                                'link': exam_link,
                                'files_id': files_id}
                    exams.insert_one(new_exam)
                    # fs_ls.append((exam_binary, new_exam))

    # def upload_to_db(tup):
    #     f_id = fs.put(tup[0])
    #     tup[1]['files_id'] = f_id
    #     exams.insert_one(tup[1])
    #
    # if len(fs_ls) > 0:
    #     with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
    #         executor.map(upload_to_db, fs_ls)
    return list_of_courses[0]['courseCode'][0]


if __name__ == '__main__':
    '''
    A 427 
    B 258 - Done
    C 1013
    D 142 - Done
    E 959
    F 469
    G 349
    H 658
    I 282
    J 139
    L 246
    M 626
    N 250
    P 1011
    R 360
    S 631 - Done
    T 96 - Done
    U 60 - Done Execution time: 122.18462586402893 seconds
    V 206
    W 191 - Done
    '''
    # courses = get_courses_by_first_letter()
    # cs_courses = list(client.find({'courseCode': {'$regex': '^CSC'}}, {'_id': 0, 'courseCode': 1}))
    math_courses = list(client.find({'courseCode': {'$regex': '^MAT'}}, {'_id': 0, 'courseCode': 1}))
    stats_courses = list(client.find({'courseCode': {'$regex': '^STA'}}, {'_id': 0, 'courseCode': 1}))
    interested_courses = [math_courses, stats_courses]
    for c in interested_courses:
        st = time.time()
        letter = get_exams(c)
        et = time.time()
        elapsed_time = et - st
        with open('duration.txt', 'a') as f:
            timeeeeeee = 'Execution time: ' + str(elapsed_time) + ' seconds \n'
            f.write(timeeeeeee)

