import axios from 'axios';
import React, {useEffect, useState} from 'react'

import {Link, useNavigate, useParams} from 'react-router-dom'
import swal from 'sweetalert';

const EditCategory = (props) => {


    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [categoryInput, setCategory] = useState([]);
    const [error, setError] = useState([]);
    const {id} = useParams();

    useEffect(() => {

        axios.get(`/api/edit-category/${id}`).then(res => {
            // console.log({id})
            if (res.data.status === 200) {
               
                setCategory(res.data.category);
            }
            else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/view-category');
            }
            setLoading(false);
        })
    },[id, navigate])

    const handleInput = (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value})
    }

    const updateCategory = (e) => {
        e.preventDefault();

        const data = categoryInput;
        axios.put(`/api/update-category/${id}`, data).then(res => {
            if (res.data.status === 200) {

                swal("Success", res.data.message, "success");
                navigate('/admin/view-category');
                setError([]);
            }
            else if(res.data.status === 422) {

                swal("All fields must be fill in", "", "error");
                setError(res.data.errors);
            }
            else if(res.data.status === 404) {
                swal("Error", res.data.message, "error");
                navigate('/admin/view-category');
            }
        })
    }

    if (loading) {
        return <h4>Loading Category...</h4>
    }

  return (
    <div className='container px-4'>
        <div className='card mt-4'>

<div className='card-header'>
    <h4>Edit Category 
        <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">Back</Link>
    </h4>
</div>
<div className='card-body'>

    <form onSubmit={updateCategory}>

        <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
            </li>
            <li class="nav-item" role="presentation">
                <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">SEO Tags</button>
            </li>
        </ul>
        <div class="tab-content" id="myTabContent">
            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
                <div className='form-group mb-3'>
                    <label>Slug</label>
                    <input className='form-control' onChange={handleInput} value={categoryInput.slug} type="text" name='slug' />
                    {/* <span>{categoryInput.error_list.slug}</span> */}
                    <small className='text-danger'>{error.slug}</small>
                </div>
                <div className='form-group mb-3'>
                    <label>Name</label>
                    <input className='form-control' onChange={handleInput} value={categoryInput.name} type="text" name='name' />
                    {/* <span>{categoryInput.error_list.name}</span> */}
                    <small className='text-danger'>{error.name}</small>
                </div>
                <div className='form-group mb-3'>
                    <label>Description</label>
                    <textarea className='form-control' onChange={handleInput} value={categoryInput.description} name='description'></textarea>
                </div>
                <div className='form-group mb-3'>
                    <label>Status</label>
                    <input type="checkbox" name='status' onChange={handleInput} value={categoryInput.status} /> Status 0=shown/1=hidden
                </div>
            </div>
            <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab" tabIndex={0}>
                <div className='form-group mb-3'>
                    <label>Meta Title</label>
                    <input className='form-control' onChange={handleInput} value={categoryInput.meta_title} type="text" name='meta_title' />
                    {/* <span>{categoryInput.error_list.meta_title}</span> */}
                    <small className='text-danger'>{error.meta_title}</small>
                </div>
                <div className='form-group mb-3'>
                    <label>Meta Keywords</label>
                    <textarea className='form-control' onChange={handleInput} value={categoryInput.meta_keyword} name='meta_keyword'></textarea>
                </div>
                <div className='form-group mb-3'>
                    <label>Meta Description</label>
                    <textarea className='form-control' onChange={handleInput} value={categoryInput.meta_description} name='meta_description'></textarea>
                </div>
            </div>
        </div>
        <button type='submit' className='btn btn-primary px-4 float-end'>Update</button>
    </form>
</div>
</div>
    </div>
  )
}

export default EditCategory