import React from 'react';

 //import '../Dashboard/ss.js';

const HDashboard = ({userRole,role,total,booking} ) => {
    const divStyle = {
        width: '40px',
        height: '40px'
      };
    return (
        <div className="main-wrapper">
        <div className="page-wrapper">
            <div className="content container-fluid">
                <div className="page-name mb-4">
                    <h4 className="m-0"><img src="./images/img/profile.jpg" className="mr-1" style={divStyle} alt="profile" /> Welcome <b> {userRole}</b> </h4><p>As a {role}</p>
                    <label>Sun, 17 March 2024</label>
                </div>
                <div className="row mb-4">
                    <div className="col-xl-12 col-sm-12 col-12">
                        <div className="breadcrumb-path">
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item"><a href="http://localhost:3000/dashboard"><img src="./images//img/dash.png" className="mr-3" alt="breadcrumb" />Home</a></li>
                                <li className="breadcrumb-item active">Dashboard</li>
                            </ul>
                            <h3>{role}  Dashboard</h3>
                        </div>
                    </div>
                    <div className="col-xl-6 col-sm-12 col-12">
                        <div className="row">
                            <div className="col-xl-6 col-sm-6 col-12">
                            </div>
                            <div className="col-xl-6 col-sm-6 col-12">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-xl-3 col-sm-6 col-12">
                        <div className="card board1 fill1">
                            <div className="card-body">
                                <div className="card_widget_header">
                                    <label>Total Booking</label>
                                    <h4>{booking}</h4>
                                </div>
                                <div className="card_widget_img">
                                    <img src="./images/img/dash1.png" alt="card-img" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-sm-6 col-12">
                        <div className="card board1 fill4">
                            <div className="card-body">
                                <div className="card_widget_header">
                                    <label>Income</label>
                                    <h4>{total}</h4>
                                </div>
                                <div className="card_widget_img">
                                    <img src="./images/img/dash4.png" alt="card-img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {(!role === "Customer")&&
                <div className="row">
                    <div className="col-xl-6 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="card-title">Total Salary By Unit</h5>
                                </div>
                            </div>
                            <div className="card-body">
                                <div id="sales_chart"></div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
            {}
        </div>
        </div>
        
    );
};

export default HDashboard;
