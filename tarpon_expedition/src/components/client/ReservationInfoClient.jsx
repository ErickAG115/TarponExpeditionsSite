import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useResolvedPath} from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection, updateDoc, getDocs, getDoc, doc, Timestamp} from "firebase/firestore";
import { isDuration } from 'moment';

export function ReservationInfoClient() {
    const location = useLocation();
    const [datePicked, setDatePicked] = useState('');
    const [packagePicked, setPackagePicked] = useState('');
    const [schedule, setSchedule] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [tour, setTour] = useState('');
    const [companions, setCompanions] = useState('');
    const reservationID = location.state.Reservation;
    const reservation = doc(db, 'Reservations', reservationID);

    const navigate = useNavigate();

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

    const goBack = () => {
        navigate('/ClientReservations',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName,
            idTour: idTour, tourName: tourName, imgTour: imgTour, tourPlace: tourPlace,
            tourType: tourType, tourTech: tourTech, tourPrice: tourPrice, tourDescription: tourDescription, pageNumber: pageNumber}})        
    }

    

    const setValues = async () =>{
        const gotReservation = await getDoc(reservation);
        const docDataStart = gotReservation.get('start');
        const docDataFin = gotReservation.get('end');
        const Start = docDataStart.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const Fin = docDataFin.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const date = docDataStart.toDate().toLocaleDateString();
        setSchedule(`${Start} to ${Fin}`);
        setCompanions(gotReservation.get('Companions'));
        setDatePicked(date);
        setTotalPrice(gotReservation.get('Price'));
        setTour(gotReservation.get('Tour'));
        setPackagePicked(gotReservation.get('Package'));
    }

    useEffect(() => {
        setValues();
      }, []); 
      
      const handleHome = () =>{
        navigate('/',{});
    };

    const handleTour = () =>{
        navigate('/Login',{});
    };

    const handleAbout = () =>{
        navigate('/AboutUs',{});
    };

    const handleContact = () =>{
        navigate('/Contact',{});
    };

    const handleLogin = () =>{
        navigate('/Login',{});
    };

    const handleMyAccount = () =>{
        // VALIDAR QUE LA SESIÓN ESTÉ INICIADA PARA PODER ENTRAR
        // CASO CONTRARIO QUE LO MANDE A INICIAR SESIÓN
        navigate('/ClientMenu',{});
    };

    const handleSignUp = () =>{
       
        navigate('/Register',{});
    };
      
    return (
        <Fragment>
            <div className='banner'>
                <div class='navbar'>
                    <img src={require('../website/logoNegro.png')} class = 'logo'/>
                        <ul>
                            <li><button onClick={handleHome} style= {{color: '#fff'}}> HOME </button></li>
                            <li><button onClick={handleTour} style= {{color: '#fff'}}> TOURS </button></li>
                            <li><button onClick={handleAbout} style= {{color: '#fff'}}> ABOUT </button></li>
                            <li><button onClick={handleContact} style= {{color: '#fff'}}> CONTACT </button></li>
                            <li><button onClick={handleLogin} style= {{color: '#fff'}}> LOGIN </button></li>
                            <li><button onClick={handleMyAccount} style= {{color: '#fff'}}>MY ACCOUNT</button></li>
                        </ul>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh', width: '60%', margin:'auto'}}>
                    <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                    <label tabIndex='0' style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', marginTop:'20px', marginBottom:'60px'}}>Reservation Info</label>
                        <label tabIndex='0' style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>Tour: {tour}</label>
                        <label tabIndex='0' style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>Date: {datePicked}</label>
                        <label tabIndex='0' style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>Schedule: {schedule}</label>
                        <label tabIndex='0' style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>{companions}</label>
                        <label tabIndex='0' style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>Package: {packagePicked}</label>
                        <label tabIndex='0' style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>Total price: ${totalPrice}</label>
                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}} onClick={() => goBack()}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}