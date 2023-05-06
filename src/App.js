// import './App.css'
// import MainDash from './components/MainDash/MainDash';
// import Navbar from './components/Navbar';
// import RightSide from './components/RigtSide/RightSide';
// import Sidebar from './components/Sidebar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
           {publicRoutes.map((route, index) => {
            const Page = route.component
            return <Route key={index} path={route.path} element={<Page />}/>
           })}
        </Routes>
      </div>
    </Router>




    // <div className="App">
    //   <div className="AppGlass">
    //     <Sidebar/>
    //     <Navbar/>
    //     <MainDash/>
    //     <RightSide/>
    //   </div>
    // </div>
  );
}

export default App;
