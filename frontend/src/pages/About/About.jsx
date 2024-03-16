import React from 'react';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';

import './About.css';

const Home = () => {

    return (
        <>
            <body class="sub_page">
                <div class="hero_area">
                    <Layout />
                </div>

                <section class="about_section layout_padding">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-5 offset-lg-1 col-md-11 offset-md-1">
                                <div class="detail-box">
                                    <h2>
                                        About <br />
                                        LK Taxi
                                    </h2>
                                    <p>
                                        At LK Taxi, we're dedicated to providing seamless transportation solutions tailored to your needs. With a focus on reliability, convenience, and exceptional service, we strive to exceed our customers' expectations with every ride. Whether you're exploring the city or heading to the airport, trust LK Taxi for a comfortable and hassle-free journey every time.
                                    </p>

                                    <ul className="check two-col strong">
                                        <div className="row">
                                            <div className="col-12 col-sm-6">
                                                <li>Efficient Booking</li>
                                                <li>24/7 Availability</li>
                                                <li>Diverse Fleet</li>
                                                <li>Professional Drivers</li>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <li>Transparent Pricing</li>
                                                <li>Real-Time Tracking</li>
                                                <li>Secure Payments</li>
                                                <li>Dedicated Support</li>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-11 col-11 offset-1 offset-md-1 offset-lg-0 col-lg-6 mt-md-5 mt-lg-0">
                                <div class="img-box">
                                    <img src="./images/about-img.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="home-calltoaction-area relative">
                    <div className="container">
                        <div className="overlay overlay-bg"></div>
                        <div className="row align-items-center section-gap">
                            <div className="col-lg-12">
                                <h3 className='text-center'>LK Taxi: Your Trusted Travel Companion in Sri Lanka</h3>
                                <p className='text-center'>
                                    Experience seamless transportation solutions with LK Taxi, the premier online taxi booking platform in Sri Lanka. Whether you're exploring the city, heading to the airport, or booking a hotel, trust LK Taxi for reliable service, trained drivers, and hassle-free travel experiences tailored to your comfort and convenience. Book your ride today and discover the ultimate in travel ease with LK Taxi.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />

            </body>
        </>
    )
}

export default Home;