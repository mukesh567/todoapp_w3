import React, { useEffect, useState } from 'react'
import { login } from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';

import Header from './partials/Header.jsx';



const Login = () => {

    const [form, setForm] = useState({
        username: '',
        password: '',
    })

    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const user = localStorage.getItem("user");
        if (user) {
            return navigate('/')
        }
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await login(form);

        setErrors(null);

        if (result.status === 200) {
            if (result.data.status === 200) {
                localStorage.setItem('user', JSON.stringify(result.data.data));
                toast.success(result.data.message)
                navigate('/')
                return;
            }

            if (result.data.status === 201) {
                setErrors(result.data.data);
                return;
            }

            if (result.data.status === 202) {
                toast.error(result.data.message);
                return;
            }

        }
        else {
            toast.error("Something went wrong! Try again")
        }
    }

    return <>

        <Header />
       
        <div className='container'>

            <div className="row justify-content-md-center mt-4">
                <div className="col-lg-5 card border-primary mt-4">

                    <div className="card-body">
                        <h4 className="card-title">Login Now</h4>

                        <div className="form-group">
                            <label className="form-label mt-4">
                                Username
                            </label>
                            <input
                                type="text"
                                name='username'
                                onChange={handleChange}
                                className="form-control"

                                placeholder="Enter username"
                            />

                            {
                                errors?.username && <small className='form-text text-danger'>
                                    {errors.username.msg}
                                </small>
                            }

                        </div>

                        <div className="form-group">
                            <label className="form-label mt-4">
                                Password
                            </label>
                            <input
                                type="password"
                                name='password'
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter password"
                            />

                            {
                                errors?.password && <small className='form-text text-muted'>
                                    {errors.password.msg}
                                </small>
                            }
                        </div>



                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-primary">
                        Login
                    </button>
                </div>
            </div>

        </div>
    </>
}

export default Login