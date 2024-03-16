import React from 'react';
import './index.css'

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            {/* <section id="block-footer">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12 col-ms-6">
                            <h4>About us</h4>
                            <p>Experience hassle-free travel with City Taxi, your trusted online taxi booking service in Sri Lanka. Our commitment to reliability and convenience ensures seamless journeys for every passenger. Trust City Taxi for efficient booking, professional drivers, and a comfortable ride every time.</p>

                        </div>
                        <div class="col-lg-5 col-md-5 hidden-md hidden-sm hidden-xs hidden-ms">
                            <h4>Explore</h4>
                            <div class="row">
                                <div class="col-md-12">
                                    <ul class="nav navbar-nav">
                                        <li><a href="/about">About Us</a></li>
                                        <li><a href="/services">Services</a></li>
                                        <li><a href="/contact-us">Contact Us</a></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                        <div class="col-lg-3 col-md-6 col-sm-6 col-ms-6">
                            <h4>Contact Us</h4>
                            <p><span class="yellow">Address : </span>107 Dam Street, 12, Colombo, Sri Lanka.</p>

                            <ul class="address">
                                <li><span class="fa fa-phone"></span>077-000-0000</li>
                                <li><span class="fa fa-envelope"></span><a href="#">Citytaxi@gmail.com</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <footer>
                <div class="container">
                    <a href="#">City Taxi</a> {currentYear} © All Rights Reserved
                    <a href="#" class="go-top hidden-xs hidden-ms"></a>
                </div>
            </footer> */}


            <section class="info_section layout_padding-top layout_padding2-bottom">
                <div class="container">
                    <div className='footer-logo-section'>
                        <a href='/'>
                            <img src="./images/Taxilogo.png" alt="TaxiPark" />
                        </a>
                        <p>Experience hassle-free travel with City Taxi, your trusted online taxi booking service in Sri Lanka. Our commitment to reliability and convenience ensures seamless journeys for every passenger. Trust City Taxi for efficient booking, professional drivers, and a comfortable ride every time.</p>
                    </div>

                    <div class="box">
                        
                        <div class="info_links">
                            <ul>
                                <li class=" ">
                                    <a class="" href="/">Home <span class="sr-only">(current)</span></a>
                                </li>
                                <li class="">
                                    <a class="" href="/about"> About</a>
                                </li>
                                <li class="">
                                    <a class="" href="/services">Services</a>
                                </li>
                                <li class="">
                                    <a class="" href="/contact-us">Contact Us</a>
                                </li>
                                <li class="">
                                    <a class="" href="/log-in">Login</a>
                                </li>
                            </ul>
                        </div>
                        <div class="info_social">
                            <div>
                                <a href="#">
                                    <img src="./images/gps.png" alt="" />
                                    <span className='ml-1 footer-text'>107 Dam Street, 12, Colombo, Sri Lanka.</span>
                                </a>
                            </div>
                            <div>
                                <a href="#">
                                    <img src="./images/phone.png" alt="" />
                                    <span className='ml-1 footer-text'>077-000-0000</span>
                                </a>
                            </div>
                            <div>
                                <a href="#">
                                    <img src="./images/email.png" alt="" />
                                    <span className='ml-1 footer-text'>Citytaxi@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </section>


            <section class="container-fluid footer_section">
                <div class="container">
                    <p>
                        &copy; {currentYear} All Rights Reserved By
                        <a href="#"> City Taxi</a>
                    </p>
                </div>
            </section>
        </>
    )
}

export default Footer;