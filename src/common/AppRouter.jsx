import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import Dashboard from './dashboard'
import Home from './page/home/HomePage'

export default function AppRouter() {
  return (
    <Routes>
      <Route index element={<Root />} />
      <Route
        path='home'
        element={
          <Dashboard>
            <Home />
          </Dashboard>
        }
      />
      <Route
        path='/empty'
        element={
          <Dashboard>
            <div>Nothing</div>
          </Dashboard>
        }
      />
      <Route path='*' element={<NoMatch />} />
    </Routes>
  )
}

function Root() {
  const location = useLocation()
  return <Navigate to='/home' state={{ from: location }} />
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to='/'>Go to the home page</Link>
      </p>
    </div>
  )
}
