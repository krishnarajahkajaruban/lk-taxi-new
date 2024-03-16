import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const intialCredentials = {
        email: "",
        phoneNum: 0,
        role: ""
    }
    const [credentials, setCredentials] = useState(intialCredentials);

    //for show success message for payment
    function showSuccessMessage(message) {
        Swal.fire({
            title: 'Register Successful!',
            text: message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        });
    }

    //for show error message for payment
    function showErrorMessage(message) {
        Swal.fire({
            title: 'Error!',
            text: message,
            icon: 'error',
            confirmButtonColor: '#d33',
            confirmButtonText: 'OK',
        });
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(credentials)
        console.log(process.env.REACT_APP_SERVER_URL)

        axios.post(`${process.env.REACT_APP_SERVER_URL}/user-reg`, credentials)
            .then(res => {
                console.log(res.data);
                showSuccessMessage("Find your Login Credentials in your email")
                setCredentials({ ...credentials, email: "", phoneNum: 0 });
                navigate("/log-in")
            })
            .catch(err => {
                console.log(err)
                showErrorMessage(err.response.data.error)
            })

    }

    return (
        <>
            <body class="sub_page">
                <div class="hero_area">
                    <Layout />
                </div>
                
                <section class="service_section contact_section layout_padding">
                    <div class="container">
                        <div class="heading_container">
                            <h2>
                                Register
                            </h2>
                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-6 col-md-6">
                                <h4><b>Create Your City Taxi Account</b></h4>
                                <p className='mt-5'>
                                    Join the City Taxi community today and unlock a world of convenient transportation solutions. By registering for an account, you gain access to exclusive features, personalized services, and seamless booking experiences. Sign up now to start enjoying the benefits of being an City Taxi member. It's quick, easy, and free. Simply fill out the registration form below to get started on your journey with us. Welcome aboard!
                                </p>
                            </div>
                            <div className="col-12 col-lg-6 col-md-6">
                                <div class="contact_form">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="role" className='log-label'>Select Role</label>

                                            <div className="radio-inputs">
                                                <label className="radio">
                                                    <input type="radio" name="role" value="Customer"
                                                        onChange={handleInputChange} />
                                                    <span className="name">Customer</span>
                                                </label>

                                                <label className="radio">
                                                    <input type="radio" name="role" value="Driver"
                                                        onChange={handleInputChange} />
                                                    <span className="name">Driver</span>
                                                </label>
                                            </div>
                                        </div>

                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={credentials.email}
                                            onChange={handleInputChange} required />

                                        <input
                                            type="number"
                                            id="phoneNum"
                                            name="phoneNum"
                                            placeholder="Enter your mobile number"
                                            value={credentials.phoneNum}
                                            onChange={handleInputChange} required />

                                        <button type='submit' onClick={handleSubmit}>SUBMIT</button>

                                        <hr className='hor-line' />
                                        <div className='dont-acc-text'>You already have an account?,&nbsp;
                                            <a href="/log-in">Login</a>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </body>
        </>
    )
}

export default Register;