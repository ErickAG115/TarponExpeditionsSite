import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./TourPageStyle.css";
import { db } from "../../firebase";
import { addDoc, collection, getDocs, where, query  } from "firebase/firestore";

export function Tours() {
    const pageNumber = 2; 

    const navigate = useNavigate();
    const location = useLocation();


    // Data from login
    const idUser = location?.state?.idUser;
    const email = location?.state?.email;
    const firstName = location?.state?.firstName;
    const lastName = location?.state?.lastName;
    console.log('Tours userData', idUser,email,firstName,lastName);


    
    const [tourImages, setTourImages] = useState([]);

    const [tours, setTours] = useState([]);
    const toursCollectionRef = collection(db, "Tours");

    useEffect(() => {
        const getTours = async () => {
            const q = query(collection(db, "Tours"), where("Deleted", "==", false));
            const querySnapshot = await getDocs(q);
            const tours = [];
            querySnapshot.forEach((doc) => {
                tours.push({ ...doc.data(), id: doc.id });
            });
      setTours(tours);
    };
        getTours();
    }, []);

    const handleHome = () =>{
        navigate('/',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    }

    const handleAbout = () =>{
        navigate('/AboutUs',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    }

    const handleContact = () =>{
        navigate('/Contact',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    }

    const handleLogin = () =>{
        if(idUser == undefined && email == undefined && firstName == undefined && lastName == undefined){
            navigate('/Login',{state:{pageNumber: pageNumber}});    
        }
        else{
            alert("You've already Login")
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

    const handleSeeMore = (idTour,tourName,imgTour,tourPlace,tourType,tourTech,tourPrice,tourDescription) =>{
        //console.log('id',idTour);
        navigate('/TourInfo',{state:{idTour: idTour, tourName:tourName, imgTour: imgTour, tourPlace: tourPlace, tourType:tourType, tourTech:tourTech,
                                tourPrice:tourPrice, tourDescription: tourDescription, idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    }

    return (
        <Fragment>
            <div style={{minHeight: '100vh',  backgroundColor: '#D2D7DB', paddingBottom:'10%'}}>
                <div class='navbarTour'>
                    <img src={require('./hostia.png')} class = 'logo'/>
                        <ul>
                            <li><button onClick={handleHome}> Home </button></li>
                            <li><button> Tours </button></li>
                            <li><button onClick={handleAbout}> About </button></li>
                            <li><button onClick={handleContact}> Contact </button></li>
                            <li><button onClick={handleLogin}> LOGIN </button></li>
                            <li><button onClick={handleMyAccount}>MY ACCOUNT</button></li>
                        </ul>
                </div>
                <h1 class='tourHeader'>TOURS</h1>
                <div class='img-gallery'>
                    {tours.map((tours) => (
                        <div class='flip-card'>
                            <div class='flip-card-inner'>
                                <div class='flip-card-front'>
                                    <img src={tours.Image} />
                                </div>
                                <div class='flip-card-back'>
                                    <h1 tabIndex='0'>{tours.Name}</h1>
                                    <h2 tabIndex='0' style={{fontSize: '20px'}}>Type of Tour: {tours.Type}</h2>
                                    <h2 tabIndex='0' style={{fontSize: '20px'}}>Place: {tours.Place}</h2>
                                    <h2 tabIndex='0' style={{fontSize: '18px'}}>Techniques: {tours.Techniques && tours.Techniques.join(', ')}</h2>
                                    <h2 tabIndex='0' style={{fontSize: '20px'}}>Price: ${tours.Price}</h2>
                                    <button onClick={() => handleSeeMore(tours.id,tours.Name,tours.Image,tours.Place,tours.Type,
                                        tours.Techniques,tours.Price,tours.Desc)} class='btnT btnT1'>See More</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}