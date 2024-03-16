import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';
import './Login.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
// import { useNavigate } from "react-router-dom";


const Login = () => {
    // const navigate = useNavigate()
    const intialCredentials = {
        userName: "",
        password: "",
        role: ""
    }
    const [credentials, setCredentials] = useState(intialCredentials);

    //for show success message for payment
    function showSuccessMessage(message) {
        Swal.fire({
            title: 'Congratulation!',
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
        let endPoint;
        if (credentials.role === "Admin") {
            endPoint = "login-admin"
        } else if (credentials.role === "Customer") {
            endPoint = "login-customer"
        } else if (credentials.role === "Driver") {
            endPoint = "login-driver"
        } else if (credentials.role === "Operator") {
            endPoint = "login-operator"
        }

        console.log(endPoint);
        if (!(credentials.role === "")) {
            axios.post(`${process.env.REACT_APP_SERVER_URL}/${endPoint}`, credentials)
                .then(res => {
                    console.log(res.data);
                    showSuccessMessage("Login Successful!")
                    setCredentials(intialCredentials);
                    if (credentials.role === "Customer") {
                        localStorage.setItem("token", JSON.stringify(res.data.accessToken));
                        // navigate(`/about`);
                        window.location.href = "/"
                    } else {
                        localStorage.setItem("token", JSON.stringify(res.data.accessToken));
                        // navigate(`/dashboard`);
                        window.location.href = "/dashboard"
                    }
                })
                .catch(err => {
                    console.log(err)
                    showErrorMessage(err.response.data.message)
                })
        } else {
            showErrorMessage("Select User Role")
        }
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
                                Login
                            </h2>
                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-6 col-md-6">
                                <h4><b>Login to Your LK Taxi Account</b></h4>
                                <p className='mt-5'>
                                    Welcome back to LK Taxi! Log in to your account to access your booking history, manage your preferences, and enjoy exclusive benefits. Whether you're a frequent traveler or a first-time user, we're here to make your experience with us as seamless as possible. Simply enter your credentials below to get started. If you don't have an account yet, you can easily sign up to unlock even more features and perks. Join us today and let LK Taxi take you where you need to go.
                                </p>
                            </div>
                            <div className="col-12 col-lg-6 col-md-6">
                                <div class="contact_form">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="role" className='log-label'>Select Role</label>

                                            <div className="radio-inputs">
                                                <label className="radio">
                                                    <input type="radio" name="role" value="Admin"
                                                        onChange={handleInputChange} />
                                                    <span className="name">Admin</span>
                                                </label>
                                                <label className="radio">
                                                    <input type="radio" name="role" value="Operator"
                                                        onChange={handleInputChange} />
                                                    <span className="name">Operator</span>
                                                </label>

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
                                            id="userName"
                                            name="userName"
                                            placeholder="Enter your user name"
                                            value={credentials.userName}
                                            onChange={handleInputChange} required />

                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            value={credentials.password}
                                            onChange={handleInputChange} required />

                                        <button type='submit' onClick={handleSubmit}>LOGIN</button>

                                        <hr className='hor-line' />
                                        <div className='dont-acc-text'>You don't have an account?,&nbsp;
                                            <a href="/sign-up">Signup</a>
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

export default Login;