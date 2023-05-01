import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import "./TourPageStyle.css";

export function TourInfo() {
    
    const navigate = useNavigate();

    const location = useLocation();
    // Data from the tour that have been selected
    const idTour = location.state.idTour;
    const tourName = location.state.tourName;
    const imgTour = location.state.imgTour;
    const tourPlace = location.state.tourPlace;
    const tourType = location.state.tourType;
    const tourTech = location.state.tourTech;
    const tourPrice = location.state.tourPrice;
    const tourDescription = location.state.tourDescription;

    // Data from login
    const idUser = location?.state?.idUser;
    const email = location?.state?.email;
    const firstName = location?.state?.firstName;
    const lastName = location?.state?.lastName;

    console.log('TourInfo, userData', idUser,email,firstName,lastName);

    const handleHome = () =>{
        navigate('/',{});
    }

    const handleTour = () =>{
        navigate('/Tours',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    }

    const handleLogin = () =>{
        const pageNumber = 4;
        navigate('/Login',{state:{pageNumber: pageNumber, idTour: idTour, tourName: tourName, imgTour: imgTour, tourPlace: tourPlace,
                            tourType: tourType, tourTech: tourTech, tourPrice: tourPrice, tourDescription: tourDescription}});
    }

    const handleMyAccount = () =>{
        navigate('/ClientMenu',{});
    }

    const startBook = () => {

        const pageNumber = 3;
        
        if(idUser == undefined && email == undefined && firstName == undefined && lastName == undefined){
            alert('NO esta loggeado');
            navigate('/Login',{state:{pageNumber: pageNumber, date: '01/01/2023', package: '', schedule: '', tour: 'tour', price: '100',
                                        idTour: idTour, tourName: tourName,tourPrice: tourPrice}});

        }
        else{
            alert('SÍ está loggeado');
            navigate('/ReservationDate',{state: {date: '01/01/2023', package: '', schedule: '', tour: 'tour', price: '100',
                                        idTour: idTour, tourName: tourName,tourPrice: tourPrice,
                                        idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
        }

        //navigate('/ReservationDate',{state: {date: '01/01/2023', package: '', schedule: '', tour: 'tour', price: '100'}});
        //navigate('/Login',{state:{pageNumber: pageNumber}});
    };

    const [tourImages, setTourImages] = useState([]);
    
    const handleBack = () =>{
        navigate('/Tours',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    }


    return (
        <Fragment>
            <div className='tourInfoback'>
                <div class='navbarTour'>
                    <img src={require('./hostia.png')} class = 'logo'/>
                        <ul>
                            <li><button onClick={handleHome}> Home </button></li>
                            <li><button onClick={handleTour}> Tours </button></li>
                            <li><button> About </button></li>
                            <li><button> Contact </button></li>
                            <li><button onClick={handleLogin}> LOGIN </button></li>
                            <li><button onClick={handleMyAccount}>MY ACCOUNT</button></li>
                        </ul>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh" }}>
                    <div style={{ float: "right", width: "50%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "auto" }}>    
                        <div style={{ background: "white", height: "100%", width: "90%", display: "flex", flexDirection: "column", overflow: "auto", alignItems: "center", justifyContent: "center", borderRadius: "10px", border: "2px solid rgba(255,255,255,.5)", boxShadow: "0 0 30px rgba(0,0,0,.5)" }}>
                            
                            
                            <h1 style={{ textAlign: "center"}}>{tourName}</h1>
                            <img src={imgTour} style={{ maxWidth: "250px", height: "auto", marginBottom: "10px" }} />
                            <p style={{ textAlign: "center", marginBottom: "10px", marginLeft:'50px', marginRight:'50px' }}>{tourDescription}</p>
                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "80%", margin: "10px 0" }}>
                                <label style={{fontWeight:'bold'}}>Place: {tourPlace}</label>
                                <label style={{fontWeight:'bold'}}>Tour Type: {tourType}</label>
                                <label style={{fontWeight:'bold'}}>Techniques: {tourTech && tourTech.join(', ')}</label>
                                
                            </div>
                            <label style={{fontWeight:'bold', fontSize:'18px', marginTop:'2px', marginBottom:'20px'}}>Price: ${tourPrice}</label>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <button class='btnTInfo2' onClick={handleBack} >Back</button>
                                <button class='btnTInfo btnT1' onClick={() => startBook()} >Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>


                
            </div>
            
        </Fragment>
    )
}