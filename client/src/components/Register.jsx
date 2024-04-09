import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api.js';
import { toast } from 'react-toastify'

import Header from './partials/Header.jsx';

const Register = () => {

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
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

    const result = await register(form)

    if (result.status === 200) {
      if (result.data.status === 200) {
        localStorage.setItem('user', JSON.stringify(result.data.data));
        toast.success(result.data.message)
        navigate('/')
        return;
      }

      if (result.data.status === 201) {
        setErrors(result.data.data)
        return;
      }

      if (result.data.status === 202) {
        toast.error(result.data.message);
        return;
      }

    } else {
      toast.error("Something went wrong! Try again")
    }
  }

  return (
    <>
    <Header/>
   
      <div className="container">
        <div className="row justify-content-md-center mt-4">
          <div className="col-lg-5 card border-primary mb-3">

            <div className="card-header h4 text-center">
              Register An Account
            </div>

            <div className="card-body">

              <div className="form-group">
                <label className='col-form-label mt-4'>
                  Name
                </label>

                <input
                  type="text"
                  className='form-control'
                  placeholder='Enter Your Name'
                  name='name'
                  onChange={handleChange}
                />

                {
                  errors?.name && <small className='form-text text-danger'>
                    {errors.name.msg}
                  </small>
                }
              </div>

              <div className="form-group">
                <label className='col-form-label mt-4'>
                  Username
                </label>

                <input
                  type="text"
                  className='form-control'
                  placeholder='Enter Username'
                  name='username'
                  onChange={handleChange}
                />
                {
                  errors?.username && <small className='form-text text-danger'>
                    {errors.username.msg}
                  </small>
                }
              </div>

              <div className="form-group">
                <label className='col-form-label mt-4'>
                  Email
                </label>

                <input
                  type="email"
                  className='form-control'
                  placeholder='Enter Email'
                  name='email'
                  onChange={handleChange}
                />
                {
                  errors?.email && <small className='form-text text-danger'>
                    {errors.email.msg}
                  </small>
                }
              </div>

              <div className="form-group">
                <label className='col-form-label mt-4'>
                  Password
                </label>

                <input
                  type="password"
                  className='form-control'
                  placeholder='Enter Password'
                  name='password'
                  onChange={handleChange}
                />
                {
                  errors?.password && <small className='form-text text-danger'>
                    {errors.password.msg}
                  </small>
                }
              </div>

            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Register Now
            </button>

          </div>
        </div>
      </div>
    </>
  )
}

export default Register