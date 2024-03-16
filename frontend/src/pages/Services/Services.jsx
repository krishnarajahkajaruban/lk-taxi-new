import React from 'react';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';

const Services = () => {

    return (
        <>
            <body class="sub_page">
                <div class="hero_area">
                    <Layout />
                </div>

                <section class="service_section layout_padding">
                    <div class="container">
                        <div class="heading_container">
                            <h2>
                                Our <br />
                                Services
                            </h2>
                        </div>
                        <div class="service_container">
                            <div class="box">
                                <div class="img-box">
                                    <img src="./images/delivery-man.png" alt="" />
                                </div>
                                <div class="detail-box">
                                    <h5>
                                        Private Driver
                                    </h5>
                                    <p className='mt-4'>
                                        Enjoy the luxury of having your own private driver with City Taxi's exclusive private driver service. Whether you're exploring the city or attending business meetings, our professional drivers will ensure a comfortable and personalized travel experience tailored to your needs.
                                    </p>
                                </div>
                            </div>
                            <div class="box with-border">
                                <div class="img-box">
                                    <img src="./images/airplane.png" alt="" />
                                </div>
                                <div class="detail-box">
                                    <h5>
                                        Airport Transfer
                                    </h5>
                                    <p className='mt-4'>
                                        Start or end your journey with ease with City Taxi's reliable airport transfer service. Our experienced drivers will greet you at the airport and ensure a seamless transition to your destination, allowing you to relax and unwind after your flight.
                                    </p>
                                </div>
                            </div>
                            <div class="box">
                                <div class="img-box">
                                    <img src="./images/backpack.png" alt="" />
                                </div>
                                <div class="detail-box">
                                    <h5>
                                        Luggage Transfer
                                    </h5>
                                    <p className='mt-4'>
                                        Let City Taxi take the burden off your shoulders with our convenient luggage transfer service. Whether you're traveling with heavy bags or oversized luggage, our drivers will safely transport your belongings to your desired location, ensuring a stress-free travel experience from start to finish.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="service_section layout_padding">
                    <div class="container">
                        <div class="heading_container">
                            <h2>
                                Our <br />
                                Features
                            </h2>
                        </div>
                        <div className="row section-title feature-title-section">
                            <h4>Your Go-To Online Taxi Booking Platform in Sri Lanka</h4>
                            <p>Welcome to City Taxi, your premier choice for hassle-free and efficient transportation solutions across Sri Lanka. With our user-friendly online platform, we've revolutionized the way you book taxis, ensuring a seamless experience from start to finish.</p>
                        </div>

                        <div className="row feature-content-section">
                            <div className="col-lg-4 single-gallery">
                                <div className='sub-about-area'>
                                    <h3>Effortless Booking</h3>
                                    <p>
                                        Say goodbye to long waiting times and frustrating phone calls. With City Taxi, you can book your ride in just a few clicks from the comfort of your home or while on the go.
                                    </p>
                                </div>

                                <div className='sub-about-area'>
                                    <h3>24/7 Availability</h3>
                                    <p>
                                        Whether it's a late-night flight or an early morning meeting, our services are available round the clock to cater to your transportation needs anytime, anywhere.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 single-gallery">
                                <div className='sub-about-area'>
                                    <h3>Wide Range of Vehicles</h3>
                                    <p>
                                        From sedans to minivans, we offer a diverse fleet of vehicles to suit your specific requirements, ensuring a comfortable and safe journey for individuals and groups alike.
                                    </p>
                                </div>

                                <div className='sub-about-area'>
                                    <h3>Transparent Pricing</h3>
                                    <p>
                                        No more surprises when it comes to fares. With transparent pricing and no hidden charges, you can easily plan your travel budget with confidence.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 single-gallery">
                                <div className='sub-about-area'>
                                    <h3>Real-Time Tracking</h3>
                                    <p>
                                        Track your ride in real-time and stay informed about your driver's location, estimated time of arrival, and more, providing you with peace of mind throughout your journey.
                                    </p>
                                </div>

                                <div className='sub-about-area'>
                                    <h3>Secure Payment Options</h3>
                                    <p>
                                        We prioritize your safety and convenience, which is why we offer secure payment options, including cashless transactions, for a hassle-free experience.
                                    </p>
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
                                <h3 className='text-center'>City Taxi: Your Trusted Travel Companion in Sri Lanka</h3>
                                <p className='text-center'>
                                    Experience seamless transportation solutions with City Taxi, the premier online taxi booking platform in Sri Lanka. Whether you're exploring the city, heading to the airport, or booking a hotel, trust City Taxi for reliable service, trained drivers, and hassle-free travel experiences tailored to your comfort and convenience. Book your ride today and discover the ultimate in travel ease with City Taxi.
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

export default Services;