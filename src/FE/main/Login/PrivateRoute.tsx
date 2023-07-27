// import { ROLE } from './roles';
// import { useSelector } from 'react-redux';
// import { Navigate, Route, useLocation } from 'react-router-dom';

// const PrivateRoute = ({
//   children,
//   roles,
// }: {
//   children: JSX.Element;
//   roles: Array<Role>;
// }) => {
//   let location = useLocation();
//   const { isAuthenticated, user, loading } = useSelector(state => state.auth);

//   if (loading) {
//     return <p className="container">Checking auth..</p>;
//   }

//   const userHasRequiredRole = user && roles.includes(user.role) ? true : false;

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} />;
//   }

//   if (isAuthenticated && !userHasRequiredRole) {
//     return <AccessDenied />; // build your won access denied page (sth like 404)
//   }

//   return children;
// };