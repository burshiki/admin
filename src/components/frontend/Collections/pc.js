import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../../../layouts/frontend/Navbar'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
const Pc = () => {
    let navigate= useNavigate();
    const [loading, setLoading]= useState(true);
    const [product, setProduct]= useState([]);
    const [category, setCategory]= useState([]);

    useEffect(()=>{
        let isMounted = true;
        // const product_slug = props.math.params.slug;
        // ${product_slug}
        axios.get(`/api/fetchproducts/`).then(res=>{
            if(isMounted){
                if(res.data.status === 200){
                    setProduct(res.data.product_data.product);
                    setProduct(res.data.product_data.category);
                }
                else if(res.data.status === 400){
                    swal("warning", res.data.message, "");
                }

                else if(res.data.status === 404){
                    navigate('/collections');
                    swal("Warning", res.data.message, "error")
                }
            }
        })






        return (
            isMounted= false
        );

    }, [navigate]);

    if(loading){
        return <h4>Loading produicts...</h4>
    }
    else{
        var showProduct= '';
        showProduct= product.map((item, idx)=>{
            return(
                <div className="col-md-3">
                    <div className="card">
                    <Link to=''>
                        <img src={'http://127.0.0.1:8000/${item.image}'} alt={item.name} srcset="" />
                    </Link>
                        <div className="card-body">
                            <h5>{item.name}</h5>
                        </div>
                    </div>
                </div>
            )
        });

    }



  return (
    <div>
        <Navbar/>
        <div>
        <h1>View Category</h1>
        <div className='py-3'>
        <div className="container">
            <div className="row">
            {showProduct}
            </div>
        </div>
            
        </div>
    </div>
    </div>
  )
}

export default Pc