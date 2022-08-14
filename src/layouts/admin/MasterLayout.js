import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/scripts'

import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

// import routes from '../../routes/routes'


const MasterLayout = () => {
   
    
  return (
    
    <div className='sb-nav-fixed'>
        <Navbar />
        <div id="layoutSidenav">

            <div id="layoutSidenav_nav">
                <Sidebar />
            </div>

            <div id="layoutSidenav_content">
                <main>
                    
                    <Outlet />
                    {/* <Routes>
                   
                        <Route path="/admin/*" element={<Navigate to="/admin/dashboard" /> } />

                    </Routes> */}

                </main>
                <Footer />
            </div>

        </div>
    </div>

  )
}

export default MasterLayout