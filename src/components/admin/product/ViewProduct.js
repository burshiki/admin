import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



const ViewProduct = () => {

    const [loading, setLoading] = useState(true);
    const [productlist, setProductlist] = useState([]);

    useEffect(() => {
        axios.get(`/api/view-product`).then(res => {
            console.log(res.data.product)
            if (res.data.status === 200) {

                setProductlist(res.data.product);
            }
            setLoading(false);
           
        });
    }, []);

    var viewproduct_HTMLTABLE = "";

    if (loading) {
        return <h4>Products are loading...</h4>
    }
    else {
        viewproduct_HTMLTABLE =
        productlist.map( (item) => {
            return(
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.category.name}</td>
                    <td>{item.brand.name}</td>
                    <td>{item.name}</td>
                    <td>{item.selling_price}</td>
                    <td><img src={`http://localhost:8000/${item.image}`} width="50px" alt="{item.name"  /></td>
                    <td><Link to={`admin/edit-product/${item.id}`} className='btn btn-success btn-sm'>Edit</Link></td>
                    <td><button className='btn btn-danger btn-sm'>Delete</button></td>
                </tr>
            )
        });
    }

  return (
    <div className='card px-4 mt-3'>
        <div className='card-header'>
            <h4>View Product
                <Link className='btn btn-primary btn-sm float-end' to="/admin/add-product">Add Product</Link>
            </h4>
        </div>
        <div className='card-body'>
            <div className='table-responsive'>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Category Name</th>
                            <th>Brand</th>
                            <th>Product Name</th>
                            <th>Selling Price</th>
                            <th>Image</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {viewproduct_HTMLTABLE}
                    </tbody>
                </table>

            </div>
        </div>
    </div>
  )
}

export default ViewProduct