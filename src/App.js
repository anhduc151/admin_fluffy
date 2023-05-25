import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { publicRoutes } from './routes';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotificationComponent from './components/Notification'
import { gql } from '@apollo/client';
import client from './configGQL';
import { setSchools } from "./Redux/feat/schoolsSlice";
import { setCurrentUser } from './Redux/feat/userSlice';

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const error = useSelector(state => state.error.content)
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error.message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [error]);

  useEffect(() => {
    client
      .query({
        query: gql`
          query getSchools($queryParams: QueryFilterDto!) {
            getSchools(queryParams: $queryParams) {
              items {
                name
                id
              }
            }
          }
        `,
        variables: {
          queryParams: {
            limit: 99,
            page: 1,
          },
        },
      })
      .then((result) => {
        dispatch(setSchools(result.data.getSchools.items))
      })
  }, [currentUser]);


  useEffect(() => {
    client
      .query({
        query: gql`
        query getMe {
          getMe {
            id
            lastName
            firstName
            email
          }
        }
      `,
      })
      .then((result) => {
        dispatch(setCurrentUser(result.data.getMe));
      })
    .catch((error) => {
      if (error) {
        navigate("/signin")
      }
    });
  }, [currentUser])


  return (
    <>
      {visible && <NotificationComponent error={error} />}
      <div className='App'>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component
            return <Route key={index} path={route.path} element={<Page />} />
          })}
        </Routes>
      </div>
    </>
  );
}

export default App;
