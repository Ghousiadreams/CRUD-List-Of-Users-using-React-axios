import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {toast, ToastContainer} from 'react-toastify';


const Update = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(()=>{
    axios.get("http://localhost:3000/users/"+id)
    .then(res => 
      setValues(res.data))
    .catch(err => console.log(err));
    
  }, [])

  function handleUpdate(e) {
    e.preventDefault();
    axios.put("http://localhost:3000/users/" + id, values)
      .then(res => {
        toast.success("User Updated successfully");
        navigate("/");
      })
      .catch(err => {
        console.log(err);
        toast.error("Update failed");
      });
  }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
        <div className='w-50 border bg-white px-5 pt-3 pb-5 rounded shadow'>
          
            <h1>Update User</h1>
            <form onSubmit={handleUpdate}>
                <div className='mb-2'>
                    <label htmlFor='name' >Name</label>
                    <input type='text' className='form-control' id='name' name='name' value={values.name} onChange={(e) => setValues({...values, name: e.target.value})} />
                </div>
                <div className='mb-2'>
                    <label htmlFor='email' >Email</label>
                    <input type='email' className='form-control' id='email' name='email' value={values.email} 
                    onChange={(e) => setValues({...values, email: e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='phone' >Phone</label>
                    <input type='text' className='form-control' id='phone' name='phone' value={values.phone} 
                    onChange={(e) => setValues({...values, phone: e.target.value})}/>
                </div>
                <button type='submit' className='btn btn-success'>Update</button>
                <Link to='/' className='btn btn-primary ms-3'>Back</Link>
            </form>
        </div>
    </div>
  )
}

export default Update