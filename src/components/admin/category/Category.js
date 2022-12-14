import axios from 'axios';
import React, {useState} from 'react'
import swal from 'sweetalert';
import {Link} from 'react-router-dom'

const Category = () => {

    const [categoryInput, setCategory] = useState({
        slug: '',
        name: '',
        description: '',
        status: '',
        meta_title: '',
        meta_keyword: '',
        meta_description: '',
        error_list: [],
    })
    

    const handleInput= (e) => {
        e.persist();
        setCategory({...categoryInput, [e.target.name]: e.target.value })
    }

    const submitCategory = (e) => {
        e.preventDefault();

        const data = {
            slug: categoryInput.slug,
            name: categoryInput.name,
            description: categoryInput.description,
            status: categoryInput.status,
            meta_title: categoryInput.meta_title,
            meta_keyword: categoryInput.meta_keyword,
            meta_description: categoryInput.meta_description,

        }

        axios.post(`/api/store-category`, data).then(res => {
            if (res.data.status === 200) {
                swal("Success",res.data.message, "success");
                document.getElementById(`CATEGORY_FORM`).reset();
            }
            else if (res.data.status === 400) {
                setCategory({...categoryInput, error_list:res.data.errors});
            }
        })
    }
  return (
    <div className='container-fluid px-4'>
        <div className='card mt-4'>

            <div className='card-header'>
                <h4>Add Category 
                    <Link to="/admin/view-category" className="btn btn-primary btn-sm float-end">View Category</Link>
                </h4>
            </div>
            <div className='card-body'>

                <form onSubmit={submitCategory} id="CATEGORY_FORM">

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
                                <span>{categoryInput.error_list.slug}</span>
                            </div>
                            <div className='form-group mb-3'>
                                <label>Name</label>
                                <input className='form-control' onChange={handleInput} value={categoryInput.name} type="text" name='name' />
                                <span>{categoryInput.error_list.name}</span>
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
                                <span>{categoryInput.error_list.meta_title}</span>
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
                    <button type='submit' className='btn btn-primary px-4 float-end'>Submit</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Category