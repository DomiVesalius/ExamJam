import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
from course import Course

connection_string = "mongodb+srv://examjam:5w7O6pg4B5apbaWR@cluster0.g9pxqnk.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(connection_string)['ExamJam']['Course']


def retrieve(school_course_site: str):
    ls = []
    # soup is a BeautifulSoup object that stores all the html markup for the website
    # in a way that is easy to parse relevant content from the html
    html_payload = requests.get(school_course_site)
    soup = BeautifulSoup(html_payload.content, 'html.parser')

    # All the courses on the school_course_site are enclosed in a div tag with
    # class name 'no-break views-row'
    list_of_divs = soup.findAll('div', {'class': 'no-break views-row'})

    # soup.findAll returns a cursor object that can be looped over to parse each div
    # separately
    print("number of courses on site: {}".format(len(list_of_divs)))
    for d in list_of_divs:
        title_course_code = d.find('h3').decode_contents().split(':')
        course_code, title, = title_course_code[0].strip(), ''.join(title_course_code[1:]).strip()
        campus = course_code[-2:]
        course_code = course_code[:len(course_code) - 2]
        description = list(d.find('div', {'class': 'views-field views-field-body'})
                           .findChildren('div', recursive=False))[0]
        description = description.get_text()

        program_area = d.find('span', {'class': 'views-field views-field-field-breadth-requirements'})
        if program_area is not None:
            program_area = program_area.get_text()
            program_area = program_area.split(':')[-1].split(",")
            program_area = [i.strip() for i in program_area]
        else:
            program_area = ''
        course = Course(courseCode=course_code,
                        description=description,
                        programArea=program_area,
                        title=title,
                        campuses=campus)
        ls.append(course.dict())
        # print(course.dict())

    return ls


# html_payload = requests.get(utsg_courses)
# soup = BeautifulSoup(html_payload.content, 'html.parser')
if __name__ == '__main__':
    utsc_courses = 'https://utsc.calendar.utoronto.ca/print/view/pdf/search_courses/print_page/debug'
    x = retrieve(utsc_courses)
    client.insert_many(x)
