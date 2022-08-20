import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
// import routes from '../../routes/routes'


const FrondtendLayout = () => {
   
    
  return (
    
    <div>
        <Navbar />
        <div id="layoutSidenav_content">

            <Outlet />

        </div>
    </div>

  )
}

export default FrondtendLayout