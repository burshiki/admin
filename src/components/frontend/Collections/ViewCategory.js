import axios from 'axios';
import React, { useState, useEffect} from 'react'
import Navbar from '../../../layouts/frontend/Navbar'
import {Link} from 'react-router-dom'

const ViewCategory = () => {
    const [category, setCategory]= useState([]);
    const [loading, setLoading]= useState(true);

    useEffect(()=> {

        let isMounted= true;

        axios.get(`/api/getCategory`).then(res=>{
            
                if(res.data.status === 200){
                    setCategory(res.data.category);
                }
                setLoading(false);
            
            

        });
        return () =>{
            isMounted= false;
        }
    },[]);

    if(loading){
        return(<h4>Loading categsz....</h4>)
    }else{
        var showCategory='';
        showCategory= category.map((item, idx)=>{
            return(
                <div className="col-md-4" key={idx}>
                    <div className="card">
                        <div className="card-body">
                            <Link to={`${item.slug}`}>
                                <h5>{item.name}</h5>
                            </Link>
                        </div>
                        
                    </div>
                </div>
            )
        })
    }

  return (
    <div>
        <Navbar/>
        <h1>View Category</h1>
        <div className='py-3'>
        <div className="container">
            <div className="row">
            {showCategory}
            </div>
        </div>
            
        </div>
    </div>
  )
}

export default ViewCategory 