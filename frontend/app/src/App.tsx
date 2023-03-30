import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/Profile/ProfilePage';
import RegistrationPage from './pages/Auth/RegistrationPage';
import LoginPage from './pages/Auth/LoginPage';
import ExamPage from './pages/Exam/ExamPage';
import PostPage from './pages/Post/PostPage/PostPage';
import Dashboard from './pages/Dashboard/Dashboard';
import CoursePage from './pages/Course/CoursePage';
import PathConstants from './utils/pathConstants';
import CourseSearch from './pages/Dashboard/CourseSearch/CourseSearch';
import PostCreationPage from './pages/Post/PostCreationPage/PostCreationPage';
import { MainPage } from './pages/Main/MainPage';
import EditProfilePage from './pages/EditProfile/EditProfilePage';


/**
 * For now this is just to show that the frontend and backend are connected.
 * Frontend sends a request to the backend to create a random person. The person is saved in the DB and the frontend
 * then fetches a list of all existing random people.
 * @constructor
 */
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={PathConstants.rootPage} element={<MainPage />}></Route>
                <Route path={PathConstants.profilePage} element={<ProfilePage />}></Route>
                <Route path={PathConstants.profileEditPage} element={<EditProfilePage />} />
                <Route path={PathConstants.dashboard} element={<Dashboard />}></Route>
                <Route path={PathConstants.courseSearch} element={<CourseSearch />}></Route>
                <Route path={PathConstants.registerPage} element={<RegistrationPage />} />
                <Route path={PathConstants.loginPage} element={<LoginPage />} />
                <Route path={PathConstants.examPage} element={<ExamPage />} />
                <Route path={PathConstants.coursePage} element={<CoursePage />} />
                <Route path={PathConstants.postPage} element={<PostPage />} />
                <Route path={PathConstants.postCreationPage} element={<PostCreationPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
