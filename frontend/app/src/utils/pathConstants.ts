enum PathConstants {
    profilePage = '/dashboard/profile',
    profileEditPage = '/dashboard/profile/edit',
    dashboard = '/dashboard',
    registerPage = '/register',
    loginPage = '/login',
    rootPage = '/',
    courseSearch = '/dashboard/course-search',
    examPage = '/dashboard/courses/:courseCode/exams/:examId',
    coursePage = 'dashboard/courses/:courseCode',
    postPage = '/dashboard/courses/:courseCode/posts/:postId',
    postCreationPage = '/dashboard/courses/:courseCode/create-post',
    piazzaPostPage = '/dashboard/courses/forums/:forumId/posts/:postNumber'
}

export default PathConstants;
