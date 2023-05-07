// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from '../Pages/Dashboard';
import Courses from '../Pages/Courses'
import Payment from '../Pages/Payment'
import Student from '../Pages/Student'
import Tutor from '../Pages/Tutor'
import SignIn from '../SignIn/index'
import Profile from '../Pages/Profile';
import RequestTutor from '../Pages/Request';

const publicRoutes = [
        { path: '/signin', component: SignIn},
        { path: '/', component: DashBoard },
        { path: '/courses', component: Courses},
        { path: '/payment', component: Payment},
        { path: '/students', component: Student},
        { path: '/tutors', component: Tutor},
        { path: 'request', component: RequestTutor},
        { path: '/profile', component: Profile},
]

const privateRoutes = [
    
]

export { publicRoutes, privateRoutes }