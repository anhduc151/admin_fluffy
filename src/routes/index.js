import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from '../Pages/Dashboard';
import SignIn from '../SignIn/index'

const publicRoutes = [
        { path: '/', component: DashBoard },
        { path: '/signin', component: SignIn},
]

const privateRoutes = [
    
]

export { publicRoutes, privateRoutes }