import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TourPageStyle.css";

export function TourInfo() {
    const navigate = useNavigate();
    const handleHome = () =>{
        navigate('/',{});
    }

    const handleTour = () =>{
        navigate('/Tours',{});
    }

    const handleLogin = () =>{
        navigate('/Login',{});
    }

    const handleMyAccount = () =>{
        navigate('/ClientMenu',{});
    }

    const startBook = () => {
        navigate('/ReservationDate',{state: {date: '01/01/2023', package: '', schedule: '', tour: 'tour', price: '100'}});
    };

    const [tourImages, setTourImages] = useState([]);

    const handleAddTourImage = (e) => {
        e.preventDefault();
        const url = e.target.elements.url.value;
        setTourImages([...tourImages, url]);
        e.target.elements.url.value = "";

        {tourImages.map((image, index) => (console.log("aqui",image)))};
    }

    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', height: '100vh',flexDirection: 'column', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div class='navbarTour'>
                    <img src={require('./hostia.png')} class = 'logo'/>
                        <ul>
                            <li><a onClick={handleHome}> Home </a></li>
                            <li><a onClick={handleTour}> Tours </a></li>
                            <li><a onClick={handleTour}> About </a></li>
                            <li><a onClick={handleTour}> Contact </a></li>
                            <li><a onClick={handleLogin}> LOGIN </a></li>
                            <li><a onClick={handleMyAccount}>MY ACCOUNT</a></li>
                        </ul>
                </div>
                <h1>Tour Information</h1>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh',width: '100%'}}>
                <div style={{float: 'left', width: '50%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', display: 'flex', flexDirection: 'column'}}>
                    <label style={{fontFamily: 'lato', fontSize: '25px', fontWeight:'bold', marginBottom:'20px'}}>Name:</label>
                    <label style={{fontFamily: 'lato', fontSize: '25px', fontWeight:'bold', marginBottom:'20px'}}>Price:</label>
                    <label style={{fontFamily: 'lato', fontSize: '25px', fontWeight:'bold', marginBottom:'20px'}}>Techniques:</label>
                    <label style={{fontFamily: 'lato', fontSize: '25px', fontWeight:'bold', marginBottom:'20px'}}>Description:</label>
                    <label style={{fontFamily: 'lato', fontSize: '25px', fontWeight:'bold', marginBottom:'20px'}}>Schedules:</label>
                </div>
                <div style={{float: 'right ', width: '50%', height:'100%', overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <label style={{fontFamily: 'lato', fontSize: '25px', fontWeight:'bold', marginBottom:'20px'}}>Tour</label>
                    <label style={{fontFamily: 'lato', fontSize: '25px', fontWeight:'bold', marginBottom:'20px'}}>100$</label>
                    <label style={{fontFamily: 'lato', fontSize: '25px', fontWeight:'bold', marginBottom:'20px'}}>1 2 and 3</label>
                    <label style={{fontFamily: 'lato', fontSize: '25px', fontWeight:'bold', marginBottom:'20px'}}>This is a tour in the tour section</label>
                    <label style={{fontFamily: 'lato', fontSize: '25px', fontWeight:'bold', marginBottom:'20px'}}>From X to Y</label>
                    
                </div>
                </div>
                
                <button class='btn' onClick={() => startBook()} >Book Now</button>
            </div>
            
        </Fragment>
    )
}