import React, {useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify'


const Create = () => {
    const [values, setValues] = useState({
        name:'',
        email: '',
        phone: ''
    })

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3000/users", values)
        .then(res => {
            console.log(res);
            toast.success("User Created successfully");
            navigate("/");
        })
        .catch(err => {
            console.log(err);
            toast.error("User Creation failed");
        });
    }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
        <div className='w-50 border bg-white px-5 pt-3 pb-5 rounded shadow'>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-2'>
                    <label htmlFor='name' >Name</label>
                    <input type='text' className='form-control' id='name' name='name' placeholder='Enter Name' onChange={(e) => setValues({...values, name: e.target.value})} />
                </div>
                <div className='mb-2'>
                    <label htmlFor='email' >Email</label>
                    <input type='email' className='form-control' id='email' name='email' placeholder='Enter Email' 
                    onChange={(e) => setValues({...values, email: e.target.value})}/>
                </div>
                <div className='mb-2'>
                    <label htmlFor='phone' >Phone</label>
                    <input type='text' className='form-control' id='phone' name='phone' placeholder='Enter Phone' 
                    onChange={(e) => setValues({...values, phone: e.target.value})}/>
                </div>
                <button type='submit' className='btn btn-success'>Create</button>
                <Link to='/' className='btn btn-primary ms-3'>Back</Link>
            </form>
        </div>
    </div>
  )
}

export default Create