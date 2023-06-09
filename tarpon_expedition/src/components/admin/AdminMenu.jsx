import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function AdminMenu() {

    const navigate = useNavigate();

    const goTours = () =>{
        navigate('/TourManagement',{});
    }

    const goReservations = () =>{
        navigate('/ReservationManagement',{});
    }
    
    const handleLogout = () =>{
         navigate('/',{});
    }

    const handleRegisterEmp = () =>{
        navigate('/RegisterEmployee',{});
    }

    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
                <div style={{float: 'right', width: '85%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                    <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', backdropFilter: 'blur(15px)',border: '2px solid rgba(255,255,255,.5)',boxShadow: '0 0 30px rgba(0,0,0,.5)'}}>
                        <h1 tabIndex='0' style={{fontFamily: 'lato', fontSize: '40px', fontWeight:'bold', marginBottom:'50px'}}>Admin Menu</h1>
                        <button style={{width:'35%', height:'15%', fontSize: '30px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '20px', marginBottom:'40px'}}onClick={() => goTours()}>Manage Tours</button>
                        <button style={{width:'35%', height:'15%', fontSize: '30px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '20px', marginBottom:'40px'}}onClick={() => goReservations()}>Manage Reservations</button>
                        <button style={{width:'35%', height:'15%', fontSize: '30px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '20px', marginBottom:'20px'}}onClick={handleRegisterEmp}>Register Employee</button>
                        <button style={{width:'35%', height:'15%', fontSize: '30px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '20px', marginBottom:'20px'}}onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}