from typing import List


class Course:
    """A class that will be used to construct Mongodb documents.
    """

    def __init__(self, courseCode: str, title: str, description: str, programArea: List[str], campuses: str) -> None:
        self.courseCode = courseCode
        self.title = title
        self.description = description
        self.programArea = programArea
        self.campuses = [campuses]

    def dict(self) -> dict[str: str]:
        """A helper function that will return a dictionary representation of a Course object.
        Will be used by Pymongo to upload document to the cloud database
        """
        return self.__dict__

    def __repr__(self):
        return str(self.dict())

