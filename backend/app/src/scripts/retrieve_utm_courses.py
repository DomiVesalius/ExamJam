import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
from course import Course

connection_string = "mongodb+srv://examjam:5w7O6pg4B5apbaWR@cluster0.g9pxqnk.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(connection_string)['ExamJam']['Course']


def retrieve(site: str):
    html_payload = requests.get(site)
    soup = BeautifulSoup(html_payload.content, 'html.parser')
    list_of_divs = soup.findAll('div', {'class': 'no-break views-row'})
    ls = []
    for d in list_of_divs:
        title_course_code = d.find('h3').decode_contents().split('•')
        course_code, title, = title_course_code[0].strip(), ''.join(title_course_code[1:]).strip()
        campus = course_code[-2:]
        course_code = course_code[:len(course_code) - 2]
        if campus[-1] == '0':
            continue
        description = list(d.find('div', {'class': 'views-field views-field-field-desc'})
                            .findChildren('div', recursive=False))[0]
        description = description.get_text()

        program_area = list(d.find('div', {'class': 'views-field views-field-field-timetable-link'})
                            .findChildren('div', recursive=False))[0]
        program_area = program_area.get_text().split(':')[-1].split(',')
        program_area = [i.strip() for i in program_area]

        check = list(client.find({'courseCode': course_code}))
        if len(check) == 0:
            # construct document
            new_course = Course(courseCode=course_code,
                                title=title,
                                description=description,
                                programArea=program_area,
                                campuses=campus)
            ls.append(new_course.dict())
        else:
            # swap old description with new description
            # swap old program area with new program area
            # append to campuses list.
            client.update_one({'courseCode': course_code},
                              {'$set': {"description": description, "programArea": program_area},
                               '$push': {"campuses": campus}})

    return ls


if __name__ == '__main__':
    utm = 'https://utm.calendar.utoronto.ca/print/view/pdf/search_courses/print_page/debug'
    utm_specific_courses = retrieve(utm)
    if utm_specific_courses:
        client.insert_many(utm_specific_courses)
