import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


const Contact = () => {

    const initialContactDetail = {
        name: "",
        email: "",
        msg: ""
    }
    const [contactDetail, setContactDetail] = useState(initialContactDetail)

    //for show success message for payment
    function showSuccessMessage(message) {
        Swal.fire({
            title: 'Success',
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
        setContactDetail({ ...contactDetail, [name]: value });
    }

    const handleSend = () => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/contact-us`, contactDetail)
            .then(res => {
                console.log(res.data);
                showSuccessMessage("Your message will be sent to the admin, and they will contact you.")
                setContactDetail(initialContactDetail)
            })
            .catch(err => {
                console.log(err)
                showErrorMessage(err.response.data.error)
                setContactDetail(initialContactDetail)
            })
    }

    return (
        <>
            <body class="sub_page">
                <div class="hero_area">
                    <Layout />
                </div>

                <section class="contact_section layout_padding">
                    <div class="container">
                        <div class="heading_container">
                            <h2>
                                Any Problems <br />
                                Any Questions
                            </h2>
                        </div>
                    </div>
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-5  offset-md-1">
                                <div class="contact_form">
                                    <h4>
                                        Get In touch
                                    </h4>

                                    <form>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Name"
                                            value={contactDetail.name}
                                            onChange={handleInputChange} required />

                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={contactDetail.email}
                                            onChange={handleInputChange} required />

                                        <input
                                            type="text"
                                            id="msg"
                                            name="msg"
                                            placeholder="Message"
                                            class="message_input"
                                            value={contactDetail.msg}
                                            onChange={handleInputChange} required />

                                        <button type='button' onClick={handleSend}>Send</button>
                                    </form>

                                </div>
                            </div>
                            <div class="col-md-6 px-0">
                                <div class="img-box">
                                    <img src="./images/contact-img.png" alt="" />
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

export default Contact;