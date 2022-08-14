import React from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

import MasterLayout from './layouts/admin/MasterLayout'
import Dashboard from './components/admin/Dashboard'
import Profile from './components/admin/Profile'
import Category from './components/admin/category/Category'
import ViewCategory from './components/admin/category/ViewCategory'
import EditCategory from './components/admin/category/EditCategory'
import AddProduct from './components/admin/product/AddProduct'
import Home from './components/frontend/Home'
import Login from './components/frontend/auth/Login'
import Register from "./components/frontend/auth/Register"
import AdminPrivateRoute from './AdminPrivateRoute'
import Page403 from "./components/errors/Page403"
import Page404 from "./components/errors/Page404"
import axios from "axios"
import Collections from './components/frontend/Collections/ViewCategory'

import ViewProduct from './components/frontend/Collections/ViewProduct'


axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : ``;
  return config;
})

function App() {


  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/403" element={<Page403 />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/login" element={localStorage.getItem('auth_token') ? <Navigate to="/" /> : <Login />} /> 
          <Route path="/register" element={localStorage.getItem('auth_token') ? <Navigate to="/" /> : <Register />} /> 
          <Route path="/collections" element={<Collections />} />
          {/* <Route path="/pc" element={<Pc />} /> */}
          <Route path="/collections/:slug" element={<ViewProduct />} />
          
          {/* <Route path="/admin" element={<MasterLayout />} > 
              
                <Route path='/admin/dashboard' element={<Dashboard />} />
                <Route path='/admin/profile' element={<Profile />} />
                <Route path='/admin/category' element={<Category />} />
             
                <Route path="/login" element={<Navigate to="admin/dashboard" /> } />
             
          </Route>  */}
         
          <Route element={<AdminPrivateRoute />} >
              <Route path="/admin" element={<MasterLayout />} > 
                <Route path='/admin/dashboard' element={<Dashboard />} />
                <Route path='/admin/profile' element={<Profile />} />
                <Route path='/admin/add-category' element={<Category />} />
                <Route path='/admin/view-category' element={<ViewCategory />} />
                <Route path='/admin/edit-category/:id' element={<EditCategory />} />
                <Route path='/admin/add-product' element={<AddProduct />} />
                <Route path="/admin" element={<Navigate to="/admin/dashboard" /> } />
              </Route>
          </Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
