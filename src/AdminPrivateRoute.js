import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

import axios from 'axios'
import swal from 'sweetalert';



const AdminPrivateRoute = () => {

  const navigate = useNavigate();

  const [Authenticated, setAuthenticated] = useState(false);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {

    axios.get(`/api/checkingAuthenticated`).then(res => {
      
      if(res.status === 200) {
        
        setAuthenticated(true);
        
      }
      setLoading(false);
      
    });
    
    return () => {
      
      setAuthenticated(false);

  };

}, []);

axios.interceptors.response.use(undefined, function axiosRetryInterceptors(err) {

  if(err.response.status === 401) {
    swal("Unauthorized",err.response.data.message,"warning");
    navigate('/');
  }
  return Promise.reject(err);
});

axios.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  if (error.response.status === 403) {
    swal("Forbidden", error.response.data.message, "warning");
    navigate('/403')
  }
  else if (error.response.status === 404) {
    swal("404 Error", "Page Not Found", "warning");
    navigate('/404')
  }
  return Promise.reject(error)

})

  if(Loading) {
    return <h1>Loading...</h1>
  }

  return (
    Authenticated ? <Outlet /> : <Navigate to="login" />  
    
  )
}

export default AdminPrivateRoute