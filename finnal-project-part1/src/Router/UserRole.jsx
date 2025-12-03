import React from 'react';
import useAuth from '../Hook/useAuth';
import useRole from '../Hook/useRole';
import Loding from '../Shared/Loding';
import Forbidint from '../components/Forbidint';

const UserRole = ({children}) => {
    const { loding } = useAuth();
  const { role, roleLoding } = useRole();

  if(loding){
    return <Loding></Loding>
  }

  if ( roleLoding) {
    return <Loding></Loding>;
  }

  if (role !== "user") {
    return <Forbidint></Forbidint>;
  }
  return children;
};

export default UserRole;