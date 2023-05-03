import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AboutUsStyle.css";


export function AboutUs() {
    const navigate = useNavigate();
    const location = useLocation();

    const pageNumber = 6;


    // Data from login
    const idUser = location?.state?.idUser;
    const email = location?.state?.email;
    const firstName = location?.state?.firstName;
    const lastName = location?.state?.lastName;
    console.log('About Us userData', idUser,email,firstName,lastName);


    const handleHome = () =>{
        navigate('/',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    }

    const handleTour = () =>{
        navigate('/Tours',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    }

    const handleContact = () =>{
        navigate('/Contact',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    }

    const handleLogin = () =>{
        if(idUser == undefined && email == undefined && firstName == undefined && lastName == undefined){
            navigate('/Login',{state:{pageNumber: pageNumber}});    
        }
        else{
            alert("You've already Login");
        }
    }

    const handleMyAccount = () =>{
        // VALIDATE THAT THE USER HAS ALREADY LOGIN
        // ANY OTHER CASE, SEND HIM TO LOGIN
        if(idUser == undefined && email == undefined && firstName == undefined && lastName == undefined){
            navigate('/Login',{state:{pageNumber: pageNumber}});
        }
        else{
            navigate('/ClientMenu',{state:{pageNumber: pageNumber, idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
        }
    }

    return (
        <Fragment>
                <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', height: '120vh', flexDirection: 'column'}}>
                    
                    <div class='navbarAbout'>
                    <img src={require('./logoNegro.png')} class = 'logo'/>
                            <ul>
                                <li><button onClick={handleHome}> Home </button></li>
                                <li><button onClick={handleTour}> Tours </button></li>
                                <li><button> About </button></li>
                                <li><button onClick={handleContact}> Contact </button></li>
                                <li><button onClick={handleLogin}> LOGIN </button></li>
                                <li><button onClick={handleMyAccount}>MY ACCOUNT</button></li>
                            </ul>
                    </div>


                    <div style={{width: '50%', height:'40%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <div style={{float: 'left', width: '50%', height:'120%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', marginRight:'10px', position: 'relative', top:'-20px'}}>
                            <img src={require('./Company Logo.jpg')} alt={'company logo'} style={{height:'60%',width:'100%', borderRadius: '10px'}}/>
                        </div>
                        <div style={{float: 'right', width: '50%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', marginLeft:'10px', marginTop:'15px', position: 'relative', top:'-20px'}}>
                            <p tabIndex='0' style={{fontFamily:'lato'}}>In Tarpon Expedition, we believe in sustainable fishing practices that preserve the delicate ecosystem of the Caribbean coast. Our skilled guides will take you out to the best fishing spots in the area, where you can catch a variety of fish, including snapper, marlin, and tuna. We provide all the necessary equipment, including rods, reels, bait, and tackle.</p>
                        </div>
                    </div>
                    <label tabIndex='0' style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', position: 'relative', left: '-370px', top:'-30px'}}>Team</label>
                    <div style={{width: '50%', height:'20%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', top:'-30px'}}>
                        <img src={require('./Team Member 1.jpg')} alt={'team member 1'} style={{height:'110%',width:'90%', borderRadius: '10px', marginRight:'10px'}}/>
                        <img src={require('./Team Member 2.jpg')} alt={'team member 2'} style={{height:'110%',width:'90%', borderRadius: '10px'}}/>
                        <img src={require('./Team Member 3.jpg')} alt={'team member 3'} style={{height:'110%',width:'90%', borderRadius: '10px', marginLeft:'10px'}}/>
                    </div>
                    <label tabIndex='0' style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', position: 'relative', left: '-380px', top:'-20px'}}>Equipment</label>
                    <div style={{width: '60%', height:'20%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', top:'-20px'}}>
                        <img src={require('./Boats.jpg')} alt={'boats'} style={{height:'100%',width:'80%', borderRadius: '10px', marginRight:'10px'}}/>
                        <img src={require('./Fishing Lures.jpg')} alt={'fishing lures'} style={{height:'100%',width:'80%', borderRadius: '10px'}}/>
                        <img src={require('./Fishing Rods.jpg')} alt={'fishing rods'} style={{height:'100%',width:'80%', borderRadius: '10px', marginLeft:'10px'}}/>
                    </div>
                    <div>
                        <br />
                    </div>
                </div>
           
        </Fragment>
    )
}