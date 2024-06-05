import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Chat = lazy(() => import('./pages/Chat'));
const Group = lazy(() => import('./pages/Group'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={() => <div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat/:id' element={<Chat />} />
          <Route path='/groups' element={<Group />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App