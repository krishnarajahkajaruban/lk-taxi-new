import React, { useEffect, useState } from 'react';
import './Home.css';
import Layout from '../../components/Layout';
import { Footer } from '../../components/Footer';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';


const Home = () => {
    // window.location.reload()
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [user, setUser] = useState();
    const [selectedDate, setSelectedDate] = useState(null);
    const [toLocations, setToLocations] = useState([]);
    const [fromLocations, setFromLocations] = useState([]);

    const [filteredLocations, setFilteredLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');

    const [filteredToLocations, setFilteredToLocations] = useState([]);
    const [selectedToLocation, setSelectedToLocation] = useState('');

    const [routeDetail, setRouteDetail] = useState([]);
    const [searching, setSearching] = useState(true);
    const [showDateAndTime, setShowDateAndTime] = useState(false);

    const [extractedDate, setExtractedDate] = useState('');
    const [extractedTime, setExtractedTime] = useState('');
    const [pickUpLocation, setPickUpLocation] = useState("");
    const [to, setTo] = useState("");
    const [from, setFrom] = useState("");
    const [driverId, setDriverId] = useState("");
    const [money, setMoney] = useState("");
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [bookingButtonStatus, setBookingButtonStatus] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleChange = date => {
        setSelectedDate(date);
    };

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

    function smoothScroll(target) {
        const targetElement = document.getElementById(target);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    }

    const getProtectedData = async (accessToken) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/protected`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    // setTimeout(() => {
    //     window.location.reload(true);
    // }, 1000);

    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem('token'));
        if (storedToken) {
            setToken(storedToken);
        }
    }, [token])

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                try {
                    const user = await getProtectedData(token);
                    console.log(user);
                    setUser(user);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData();
        }
    }, [token]);

    useEffect(() => {
        const dateTime = new Date(selectedDate);
        const extractedDate = dateTime.toDateString(); // Extracting date
        const extractedTime = dateTime.toLocaleTimeString(); // Extracting time

        setExtractedDate(extractedDate);
        setExtractedTime(extractedTime);
    }, [selectedDate]);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue) {
            setSelectedLocation(inputValue); // Update selectedLocation state
            const filtered = fromLocations.filter(location =>
                location.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredLocations(filtered);
        } else {
            setSelectedLocation("")
            setFilteredLocations([])
        }

    };

    // Function to handle click on filtered location
    const handleLocationClick = (location) => {
        setSelectedLocation(location);
        setFilteredLocations([]);
    };

    const handleToInputChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue) {
            setSelectedToLocation(inputValue); // Update selectedLocation state
            const filtered = toLocations.filter(location =>
                location.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredToLocations(filtered);
        } else {
            setSelectedToLocation("")
            setFilteredToLocations([])
        }

    };

    // Function to handle click on filtered location
    const handleToLocationClick = (location) => {
        setSelectedToLocation(location);
        setFilteredToLocations([]);
    };

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_SERVER_URL}/find-from-routes`)
            .then(res => {
                console.log(res.data)
                setFromLocations(res.data);
            })
            .catch(err => {
                console.log(err)
            })

        axios.get(`${process.env.REACT_APP_SERVER_URL}/find-to-routes`)
            .then(res => {
                console.log(res.data)
                setToLocations(res.data);
            })
            .catch(err => {
                console.log(err);
            })

    }, [])

    const handleRouteDetail = () => {
        setSearching(true)
        setRouteDetail([])
        axios.get(`${process.env.REACT_APP_SERVER_URL}/route-detail/${selectedLocation}/${selectedToLocation}`)
            .then(res => {
                console.log(res.data);
                setRouteDetail(res.data);
                setSearching(false)
            })
            .catch(err => {
                console.log(err)
                setSearching(false)
            })
    }

    function closeModal() {
        setIsOpen(false);
    }

    const renderStars = (numStars) => {
        const stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push(<i key={i} className='fa fa-star rate'></i>);
        }
        for (let i = numStars; i < 5; i++) {
            stars.push(<i key={i} className='fa fa-star'></i>);
        }
        return stars;
    };

    useEffect(() => {
        if (driverId) {
            setBookingButtonStatus(false);
            console.log(driverId)
            axios.post(`${process.env.REACT_APP_SERVER_URL}/already-booked`, { from: selectedLocation, to: selectedToLocation, driverId, customerId: user?.id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json'
                }
            })
                .then(res => {
                    console.log(res.data);
                    if (res.data.message === "Already Booked") {
                        setBookingButtonStatus(false);
                        showErrorMessage("You have already booked this driver, and the trip is not finished yet.")
                    } else if (res.data.message === "Not Booked") {
                        setBookingButtonStatus(true);
                    }
                })
                .catch(err => {
                    console.log(err)
                    showErrorMessage(err.response.data.error)
                    setBookingButtonStatus(false);
                })
        }
    }, [driverId]);

    const handleBooking = () => {
        const bookingData = {
            driverId,
            time: extractedTime,
            date: extractedDate,
            customerId: user.id,
            from,
            to,
            money,
            pickUpLocation

        }

        axios.post(`${process.env.REACT_APP_SERVER_URL}/create-new-booking`, bookingData, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
            .then(res => {
                console.log(res.data);
                showSuccessMessage("Booking Notification sent to Driver");
            })
            .catch(err => {
                console.log(err)
                showErrorMessage(err.response.data.error)
            })

        setIsOpen(false);

    }
    useEffect(() => {
        if (!modalIsOpen) {
            setDriverId("")
            setShowDateAndTime(false)
            setSelectedRowIndex(null)
            setBookingButtonStatus(false)
        }
    }, [modalIsOpen])

    return (
        <>
            <body>
                <div class="hero_area">
                    <Layout />

                    <section class="slider_section">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-7 ">
                                    <div class="box">
                                        <div class="detail-box">
                                            <h4>
                                                Welcome to
                                            </h4>
                                            <h1>
                                                LK TAXI
                                            </h1>
                                        </div>
                                        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                            <ol class="carousel-indicators">
                                                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                                <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                                                <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                                            </ol>
                                            <div class="carousel-inner">
                                                <div class="carousel-item active">

                                                    <div class="img-box">
                                                        <img src="./images/slider-img.png" alt="" />
                                                    </div>
                                                </div>
                                                <div class="carousel-item">
                                                    <div class="img-box">
                                                        <img src="./images/slider-img.png" alt="" />
                                                    </div>
                                                </div>
                                                <div class="carousel-item">
                                                    <div class="img-box">
                                                        <img src="./images/slider-img.png" alt="" />
                                                    </div>
                                                </div>
                                                <div class="carousel-item">
                                                    <div class="img-box">
                                                        <img src="./images/slider-img.png" alt="" />
                                                    </div>
                                                </div>
                                                <div class="carousel-item">
                                                    <div class="img-box">
                                                        <img src="./images/slider-img.png" alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-5 ">
                                    <div class="slider_form">
                                        <div className="slider_form_header">
                                            <h4>
                                                Get A Taxi Now
                                            </h4>

                                            <h6>Effortlessly Book Your Ride</h6>
                                        </div>

                                        <p>
                                            Experience convenience at your fingertips - just input your details below and let LK Taxi handle the rest, ensuring prompt and reliable transportation for your journey.
                                        </p>
                                        <form action="" className='booking__form'>
                                            <div className="position-relative mb-3">
                                                <input
                                                    type="search"
                                                    name="from"
                                                    className='booking__form_input mb-0'
                                                    placeholder="Pick Up Location"
                                                    value={selectedLocation}
                                                    onChange={handleInputChange}
                                                    required />

                                                <div className='search-result-data-area custom'>
                                                    {filteredLocations.map((location, index) => (
                                                        <div
                                                            key={index}
                                                            className='search-result-data'
                                                            onClick={() => handleLocationClick(location)}>
                                                            {location}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="position-relative mb-3">
                                                <input
                                                    type="search"
                                                    name="to"
                                                    className='booking__form_input mb-0' placeholder="Drop Location"
                                                    value={selectedToLocation}
                                                    onChange={handleToInputChange}
                                                    required />

                                                <div className='search-result-data-area custom'>
                                                    {filteredToLocations.map((location, index) => (
                                                        <div
                                                            key={index}
                                                            className='search-result-data'
                                                            onClick={() => handleToLocationClick(location)}
                                                        >
                                                            {location}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div class="btm_input">
                                                <button className='book__btn'
                                                    data-toggle="modal"
                                                    data-target=".booking-modal"
                                                    type='button'
                                                    onClick={handleRouteDetail}
                                                    disabled={!(selectedLocation && selectedToLocation)}>
                                                    Submit
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

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
                                        At LK Taxi, we are committed to providing unparalleled transportation solutions in Sri Lanka. With a focus on reliability, comfort, and customer satisfaction, we strive to exceed expectations with every ride. Our dedicated team of professionals ensures a seamless booking experience and safe journeys, making us the preferred choice for travelers across the country. Trust LK Taxi for all your transportation needs, and experience convenience like never before.
                                    </p>
                                    <a href="/about">
                                        Read More
                                    </a>
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

                <section class="service_section layout_padding">
                    <div class="container">
                        <div class="heading_container">
                            <h2>
                                Our <br />
                                Taxi Services
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
                                        Enjoy the luxury of having your own private driver with LK Taxi's exclusive private driver service. Whether you're exploring the city or attending business meetings, our professional drivers will ensure a comfortable and personalized travel experience tailored to your needs.
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
                                        Start or end your journey with ease with LK Taxi's reliable airport transfer service. Our experienced drivers will greet you at the airport and ensure a seamless transition to your destination, allowing you to relax and unwind after your flight.
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
                                        Let LK Taxi take the burden off your shoulders with our convenient luggage transfer service. Whether you're traveling with heavy bags or oversized luggage, our drivers will safely transport your belongings to your desired location, ensuring a stress-free travel experience from start to finish.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="why_section layout_padding">
                    <div class="container">
                        <div class="heading_container">
                            <h2>
                                Why <br />
                                Choose Us
                            </h2>
                        </div>
                        <div class="why_container">
                            <div class="box">
                                <div class="img-box">
                                    <img src="./images/delivery-man-white.png" alt="" class="img-1" />
                                    <img src="./images/delivery-man-black.png" alt="" class="img-2" />
                                </div>
                                <div class="detail-box">
                                    <h5>
                                        Best Drivers
                                    </h5>
                                    <p>
                                        At LK Taxi, we pride ourselves on employing the best drivers in the industry. Our team consists of experienced professionals who prioritize your safety, comfort, and satisfaction. With extensive knowledge of local routes and a commitment to excellence, our drivers ensure a smooth and enjoyable journey for every passenger.
                                    </p>
                                </div>
                            </div>
                            <div class="box">
                                <div class="img-box">
                                    <img src="./images/shield-white.png" alt="" class="img-1" />
                                    <img src="./images/shield-black.png" alt="" class="img-2" />
                                </div>
                                <div class="detail-box">
                                    <h5>
                                        Safe and Secure
                                    </h5>
                                    <p>
                                        Your safety is our top priority at LK Taxi. We adhere to the highest safety standards to ensure that you travel with peace of mind. From regular vehicle maintenance to thorough background checks on our drivers, we go above and beyond to provide a safe and secure transportation experience for all our customers.
                                    </p>
                                </div>
                            </div>
                            <div class="box">
                                <div class="img-box">
                                    <img src="./images/repairing-service-white.png" alt="" class="img-1" />
                                    <img src="./images/repairing-service-black.png" alt="" class="img-2" />
                                </div>
                                <div class="detail-box">
                                    <h5>
                                        24x7 support
                                    </h5>
                                    <p>
                                        We understand that travel plans can change unexpectedly, which is why we offer 24x7 customer support at LK Taxi. Whether you need assistance with booking a ride, have questions about our services, or require support during your journey, our dedicated support team is here to help you every step of the way.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="service_section layout_padding mt-5">
                    <div class="container">
                        <div class="heading_container">
                            <h2>
                                Our <br />
                                Features
                            </h2>
                        </div>
                        <div className="row section-title feature-title-section">
                            <h4>Your Go-To Online Taxi Booking Platform in Sri Lanka</h4>
                            <p>Welcome to LK Taxi, your premier choice for hassle-free and efficient transportation solutions across Sri Lanka. With our user-friendly online platform, we've revolutionized the way you book taxis, ensuring a seamless experience from start to finish.</p>
                        </div>

                        <div className="row feature-content-section">
                            <div className="col-lg-4 single-gallery">
                                <div className='sub-about-area'>
                                    <h3>Effortless Booking</h3>
                                    <p>
                                        Say goodbye to long waiting times and frustrating phone calls. With LK Taxi, you can book your ride in just a few clicks from the comfort of your home or while on the go.
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

                <section className="home-calltoaction-area relative mt-5">
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

            {/* booking modal here */}
            <div class="modal fade bd-example-modal-lg booking-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" isOpen={modalIsOpen}>
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div className="modal-header modal--header">
                            <h6>Booking</h6>
                            <button className='btn close-button' data-dismiss="modal"
                                aria-label="Close">&times;</button>
                        </div>

                        <div class="modal-body modal--body">
                            <div className="selected-location-area">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className='selected-location'>
                                            <h6 className='text-orange'>From : </h6>
                                            <h6 className='text-white sub-text text-capitalize'>{selectedLocation}</h6>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className='selected-location'>
                                            <h6 className='text-orange'>To : </h6>
                                            <h6 className='text-white sub-text text-capitalize'>{selectedToLocation}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="inner-two-col">
                                <div class="text-page">
                                    <div className="book-table-area table-responsive">
                                        <table className='table table-hover bg-white mb-0'>
                                            <thead>
                                                <tr className='bg-yellow'>
                                                    <th>No.</th>
                                                    <th>Driver Name</th>
                                                    <th>Mobile No.</th>
                                                    <th>Amount</th>
                                                    <th>Rating</th>
                                                    {user?.role === "Customer" && <th className='text-center'>Select</th>}
                                                </tr>
                                            </thead>

                                            {routeDetail.length > 0 ?
                                                <tbody>
                                                    {routeDetail.map((rout, index) => (
                                                        <tr key={index}>
                                                            <td className='verical-align-middle'>{index + 1}.</td>
                                                            <td className='verical-align-middle'>{rout?.driver?.userName}</td>
                                                            <td className='verical-align-middle'>{rout?.driver?.phoneNum}</td>
                                                            <td className='verical-align-middle'>{rout?.money}</td>

                                                            <td className='verical-align-middle'>
                                                                <div className="current-rating">
                                                                    {renderStars(rout?.driver?.rating)}
                                                                </div>
                                                            </td>

                                                            {user?.role === "Customer" &&
                                                                <td className='text-center'>
                                                                    <button
                                                                        className='btn modal-btn view-btn btn-success'
                                                                        onClick={() => {
                                                                            setSelectedRowIndex(index);
                                                                            setShowDateAndTime(true);
                                                                            setDriverId(rout?.driver?.id);
                                                                            setTo(rout?.to);
                                                                            setFrom(rout?.from);
                                                                            setMoney(rout?.money);
                                                                        }}
                                                                        disabled={selectedRowIndex === index}
                                                                    >
                                                                        {selectedRowIndex === index ? "Selected" : "Select"}
                                                                    </button>
                                                                </td>
                                                            }
                                                        </tr>
                                                    ))}
                                                </tbody> :
                                                <tr>
                                                    <td colSpan={6} className='text-center text-secondary'>{searching ? "Searching..." : "No Driver Details!"}</td>
                                                </tr>
                                            }
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {showDateAndTime &&
                                <form action="">
                                    <div className='book-form-area'>
                                        <div className="row">
                                            <div className="col-12 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="" className='form-label absolute text-orange'>Pickup Location</label>
                                                    <input type="text" className='form-control dark-theme' placeholder='Enter your pickup location'
                                                        value={pickUpLocation}
                                                        onChange={(e) => setPickUpLocation(e.target.value)} />
                                                </div>
                                            </div>

                                            <div className="col-12 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="" className='form-label absolute text-orange'>Date & Time</label>
                                                    <div className='w-100 date-picker-custom'>
                                                        <DatePicker
                                                            className='form-control dark-theme'
                                                            placeholderText='Select Date and Time'
                                                            selected={selectedDate}
                                                            onChange={handleChange}
                                                            showTimeSelect
                                                            dateFormat="MMMM d, yyyy h:mm aa"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            }

                        </div>
                        <div className={`modal-footer modal--footer d-flex ${!(user?.role === "Customer") ? 'justify-content-between' : 'justify-content-end'}`}>
                            {!(user?.role === "Customer") &&
                                <div className='not-customer-area'>
                                    <p className='not-customer'>
                                        You are currently not logged in as a customer.
                                    </p>
                                    <div className='plz'>Please&nbsp;
                                        <a href='##'
                                            data-dismiss="modal"
                                            onClick={() => {
                                                localStorage.removeItem("token")
                                                navigate('/log-in')
                                            }}>Login</a>
                                    </div>
                                </div>
                            }

                            <div>
                                {user?.role === "Customer" &&
                                    <button type="button" data-dismiss="modal" class="btn btn-success modal-btn mr-2"
                                        onClick={() => handleBooking()}
                                        disabled={routeDetail.length === 0 || selectedDate === null || pickUpLocation === "" || !bookingButtonStatus || !showDateAndTime}>Book</button>
                                }
                                <button type="button" class="btn btn-danger modal-btn" data-dismiss="modal" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
        </>
    )
}

export default Home;
