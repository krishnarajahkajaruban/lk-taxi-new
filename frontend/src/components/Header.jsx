import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import $ from "jquery";

import { useLocation } from 'react-router-dom';

export const Header = () => {

    const [isCollapsed, setIsCollapsed] = useState(true);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth > 1199 && !isCollapsed) {
                setIsCollapsed(true);
            }
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isCollapsed]);

    function toggleNavbar() {
        setIsCollapsed(!isCollapsed);
    }

    ////////////////////

    const [token, setToken] = useState("");
    const [user, setUser] = useState();
    const navigate = useNavigate()

    const location = useLocation();

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

    useEffect(() => {
        const storedToken = JSON.parse(localStorage.getItem('token'));
        if (storedToken) {
            setToken(storedToken);
        }
    }, [])

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

    return (
        <>
            <header class="header_section">
                <div class="container-fluid">
                    <nav class="navbar navbar-expand-lg custom_nav-container ">
                        <a class="navbar-brand" href="/">
                            <img src="./images/Taxilogo.png" alt="CityTaxi" />
                        </a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <div class="d-flex ml-auto flex-column flex-lg-row align-items-center">
                                <ul class="navbar-nav">
                                    <li class={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                                        <a class="nav-link" href="/">Home<span class="sr-only">(current)</span></a>
                                    </li>
                                    <li class={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>
                                        <a class="nav-link" href="/about">About</a>
                                    </li>
                                    <li class={`nav-item ${location.pathname === '/services' ? 'active' : ''}`}>
                                        <a class="nav-link" href="/services">Services </a>
                                    </li>
                                    <li class={`nav-item ${location.pathname === '/contact-us' ? 'active' : ''}`}>
                                        <a class="nav-link" href="/contact-us">Contact Us</a>
                                    </li>

                                    {!user &&
                                        <li class={`nav-item ${location.pathname === '/log-in' ? 'active' : ''}`}>
                                            <a class="nav-link" href="/log-in">Login</a>
                                        </li>
                                    }

                                    {user &&
                                        <li class={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                                            <a class="nav-link" href="/dashboard">Profile</a>
                                        </li>
                                    }
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header