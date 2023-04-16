import { Route, Routes, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Routes>
      <Route path='/' element={props.loggedIn ? <Component {...props} /> : <Navigate to="/signin" />}>
      </Route>
    </Routes>
  );
};

export default ProtectedRoute;
