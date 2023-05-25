// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from '../Pages/Dashboard';
import Payment from '../Pages/Payment'
import Student from '../Pages/Student'
import Tutor from '../Pages/Tutor'
import SignIn from '../SignIn/index'
import RequestTutor from '../Pages/Request';
import Session from '../Pages/Session'
import Messages from '../Pages/Messages';
import Courses from '../Pages/Courses'
import ViewCourse from '../Pages/Viewcourse'

const publicRoutes = [
        { path: '/signin', component: SignIn},
        { path: '/', component: DashBoard },
        { path: '/payment', component: Payment},
        { path: '/students', component: Student},
        { path: '/tutors', component: Tutor},
        { path: '/request', component: RequestTutor},
        { path: '/session', component: Session},
        { path: '/messages', component: Messages},
        { path: '/courses', component: Courses},
        { path: '/courses/:id', component: ViewCourse},
]

const privateRoutes = [
]

export { publicRoutes, privateRoutes }