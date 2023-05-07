import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from '../Pages/Dashboard';
import SignIn from '../SignIn/index'
import Courses from '../Pages/Courses'
import Payment from '../Pages/Payment'
import Student from '../Pages/Student'
import Tutor from '../Pages/Tutor'

const publicRoutes = [
        { path: '/signin', component: SignIn},
        { path: '/', component: DashBoard },
        { path: '/courses', component: Courses},
        { path: '/payment', component: Payment},
        { path: '/students', component: Student},
        { path: '/tutors', component: Tutor},
]

const privateRoutes = [
    
]

export { publicRoutes, privateRoutes }