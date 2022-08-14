import React, { useState } from 'react'
import Navbar from '../../../layouts/frontend/Navbar'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import swal from 'sweetalert'


const Register = () => {

    const navigate = useNavigate();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: []
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name]: e.target.value 
        });
    };

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', data).then(res =>{
                if(res.data.status === 200){
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, "success");
                    navigate('/');
                }
                else {
                    setRegister({...registerInput,error_list:res.data.validation_errors});
                }
            });
        });
    }

  return (
    <div>
        <Navbar />
        <div className='container py-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header'>
                            <h4>Register</h4>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={registerSubmit}>
                                <div className='form-group mb-3'>
                                    <label>Full Name</label>
                                    <input className='form-control' onChange={handleInput} value={registerInput.name} type="" name="name"  />
                                    <span>{registerInput.error_list.name}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Email</label>
                                    <input className='form-control' onChange={handleInput} value={registerInput.email} type="" name="email"  />
                                    {registerInput.error_list.email}
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Password</label>
                                    <input className='form-control' onChange={handleInput} value={registerInput.password} type="password" name="password" />
                                    {registerInput.error_list.password}
                                </div>
                                <div className='form-group mb-3'>
                                    <button className='btn btn-primary' type='submit'>Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
  )
}

export default Register