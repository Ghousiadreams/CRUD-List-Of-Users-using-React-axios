import React, { useState } from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'


const Home = () => {
    const [data, setData] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:3000/users')
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    }, [])

    function handleDelete(id) {
        alert("You want to Delete user with ID: " + id);
        if(window.confirm("Are you sure you want to delete this user?")) {
            axios.delete("http://localhost:3000/users/"+id)
            .then(res => {
                console.log(res.data);
                setData(data.filter(user => user.id !== id));
                toast.error("User Deleted successfully")
            })
            .catch(err => {
                console.log(err);
                toast.error("User Deletion failed");
            });
        }
    }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center bg-light vh-200'>
        <h1 style={{ color: 'teal' }}>React CRUD Operations Practice Project</h1>
        <h1>List of Users</h1>
        <div className='w-75 rounded bg-white border shadow p-4'> 
            <div className='d-flex justify-content-end'>
                <Link to='/create' className='btn btn-success'>Add+</Link>
            </div>
            <table className='table table-striped table-hover'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user,index) => (
                        <tr key={index}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <Link to={`/read/${user.id}`}>
                                <button className='btn btn-sm btn-info me-2'>Read</button></Link>
                                
                                <Link to={`/update/${user.id}`}>
                                    <button className='btn btn-sm btn-primary me-2'>Edit</button>
                                </Link>

                                
                                <button className='btn btn-sm btn-danger' onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Home