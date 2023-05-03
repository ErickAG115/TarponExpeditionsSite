import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../website/MainPageStyle.css";

export function ClientMenu() {
    const navigate = useNavigate();

    const location = useLocation();

    //Data received from other page
    const pageNumber = location?.state?.pageNumber;

    // Data from login
    const idUser = location?.state?.idUser;
    const email = location?.state?.email;
    const firstName = location?.state?.firstName;
    const lastName = location?.state?.lastName;
    console.log('Tours userData', idUser,email,firstName,lastName);

    // Data from the tour that have been selected
    const idTour = location?.state?.idTour;
    const tourName = location?.state?.tourName;
    const imgTour = location?.state?.imgTour;
    const tourPlace = location?.state?.tourPlace;
    const tourType = location?.state?.tourType;
    const tourTech = location?.state?.tourTech;
    const tourPrice = location?.state?.tourPrice;
    const tourDescription = location?.state?.tourDescription;

    const handleBack = () =>{
        //IF THE USER COMES FROM TOURS CATALOG
        if(pageNumber == 2){
            navigate('/Tours',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
        }
        //IF THE USER COMES FROM TOUR INFO
        else if(pageNumber == 5){
            navigate('/TourInfo',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName,
                idTour: idTour, tourName: tourName, imgTour: imgTour, tourPlace: tourPlace,
                tourType: tourType, tourTech: tourTech, tourPrice: tourPrice, tourDescription: tourDescription}});
        }
        //IF THE USER COMES FROM ABOUT US
        else if(pageNumber == 6){
            navigate('/AboutUs',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
        }
        //IF THE USER COMES FROM CONTACT
        else if(pageNumber == 7){
            navigate('/Contact',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
        }
        //IF THE USER COMES FROM HOME
        else if(pageNumber == 1){
            navigate('/',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
        }
    }

    const goReservations = () =>{
        navigate('/ClientReservations', {state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName,
            idTour: idTour, tourName: tourName, imgTour: imgTour, tourPlace: tourPlace,
            tourType: tourType, tourTech: tourTech, tourPrice: tourPrice, tourDescription: tourDescription, pageNumber: pageNumber}})
    }

    const goPassword = () =>{
        navigate('/ChangePassword', {state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName,
            idTour: idTour, tourName: tourName, imgTour: imgTour, tourPlace: tourPlace,
            tourType: tourType, tourTech: tourTech, tourPrice: tourPrice, tourDescription: tourDescription, pageNumber: pageNumber}})
    }

    const handleLogout = () =>{
        navigate('/',{});
    }
    return (
        <Fragment>
            <div class='banner'>
                <button style={{background:'transparent',border:'none'}}>
                    <img onClick={handleBack} src={require('../website/icons8-go-back-64.png')} alt={'Back button'} style={{padding:'5px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft:'20px'}}/>
                </button>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh',}}>
                    <div style={{float: 'right', width: '65%', height:'90%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                        <div style={{background: 'transparent', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px',backdropFilter: 'blur(15px)',border: '2px solid rgba(255,255,255,.5)',boxShadow: '0 0 30px rgba(0,0,0,.5)'}}>
                            <h1 tabIndex='0' style={{fontFamily: 'lato', fontSize: '40px', fontWeight:'bold', marginBottom:'60px', color:'#fff'}}>User Information</h1>
                            <button style={{width:'27%', height:'10%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '7px', marginBottom:'40px'}} onClick={handleLogout}>Logout</button>
                            <button style={{width:'27%', height:'10%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '7px', marginBottom:'40px'}} onClick={goReservations}>Check Reservations</button>
                            <button style={{width:'27%', height:'10%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '7px', marginBottom:'20px'}} onClick={goPassword}>Change Password</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}