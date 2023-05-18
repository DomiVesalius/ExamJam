# Backend Documentation

## Setting up DB locally

Make sure to request `ryu-kyu` to gain access to local DB files.

There are two DB folders:

1.   `localdb_data_2023_02_08`:
     This folder contains the necessary `json` files used to load the DB with courses/exam data info.
     This is useful when attempting to work on course search, course details, exam details page(s).
2.   `localdb-data_2023_02_14`:
     This folder contains the necessary `json` files used to load the DB with Piazza posts from specific courses such as CSC108, CSC148, etc. Useful for working on creating posts, viewing posts, etc. from course details page.

The process of loading these `json` files to the DB is exactly the same as all other `json` files.

For the sake of simplicity, the following example will be demonstrated to load the first DB folder.

### Prerequisites

-   [Mongo DB Compass](https://www.mongodb.com/try/download/compass)
    -   Head to `MongoDB Compass (GUI)` tab on left panel to download.

### Steps

0.   Make sure Docker Desktop is running.
1.   From root directory of repository, run `make build` and `make run` to build and run the docker containers respectively.
2.   Open `Mongo DB Compass` and type `mongodb://localhost:27017` as URI (leaving default settings for connection options), and connect.
3.   Note the folder structure of `localdb_data_2023_02_08` directory:
     -   `Course.json`
     -   `Exam.json`
     -   `fs.chunks.json`
     -   `fs.files.json`
4.   Go to `ExamJam.Course` section of the DB.
     1.   Click on `ADD DATA > Import JSON or CSV file`, and select `Course.json`. Then click on `Import`.
          -   Ignore any red warnings of duplicate key errors, if shown.
     2.   Click `Done`.
5.   Repeat same step (as above) for `ExamJam.Exam` with `Exam.json` file.
6.   For `fs...` files, we need to create the necessary collections in Mongo DB.
     1.   Next to `ExamJam`, click on `+` button.
     2.   Write `fs.chunks` for collection name and click on `Create Collection`.
     3.   Similarly, repeat steps 1-2 for `fs.files`.
7.   In `fs.chunks` and `fs.files` collections, import the necessary `json` files into the collection as stated in Step 4.
8.   That's it.
9.   Now, head to `localhost` URL in browser. (Note: We use `localhost` without specifying port number since the microservices are handled through Nginx.)
10.   Register, and login as user. Then, click on search icon. Now, the warning won't show and all courses should be displayed.

