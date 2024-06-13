import React, { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketProvider } from './context/socket';
import ProtectRoute from './auth/ProtectRoute';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { userExists, userNotExists } from './redux/reducers/auth';
import { Toaster } from 'react-hot-toast';
import { LayoutLoader } from './layout/Loaders';

const Home = lazy(() => import('./pages/Home'));
const Chat = lazy(() => import('./pages/Chat'));
const Group = lazy(() => import('./pages/Group'));
const Login = lazy(() => import('./pages/Login'));

const App = () => {
  const { user, loader } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/profile`, {
        withCredentials: true,
      })
      .then(({ data }) =>{
         dispatch(userExists(data.user))
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(userNotExists())
      }
    );
  }, [dispatch]);

  return loader ? (<LayoutLoader />) : (
    <Router>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path='/' element={<Home />} />
            <Route path='/chat/:id' element={<Chat />} />
            <Route path='/groups' element={<Group />} />
          </Route>

          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

        </Routes>
      </Suspense>
      <Toaster position='top-center'/>
    </Router>
  )
}

export default App