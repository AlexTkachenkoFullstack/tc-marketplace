import React from 'react';
import { Navigate } from 'react-router-dom';

import { isAuthUser } from "redux/auth/selectors";
import { useAppSelector } from "redux/hooks";

interface RestrictedRouteProps {
    component:React.ReactNode;
    redirectTo: string;
  }
 
 const RestrictedRoute:React.FC<RestrictedRouteProps> = ({component, redirectTo}) => { 
  const auth: string | null = useAppSelector(isAuthUser)

  return (
     <>
        {auth ? <Navigate to={redirectTo} replace/>:component} 
      </>
  );
  };

  export default RestrictedRoute