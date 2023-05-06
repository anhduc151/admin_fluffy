import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from '../Pages/Dashboard';

const publicRoutes = [
        { path: '/', component: DashBoard },
]

const privateRoutes = [
    
]

export { publicRoutes, privateRoutes }