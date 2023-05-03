import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, useResolvedPath} from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection, updateDoc, getDocs, getDoc, doc, Timestamp} from "firebase/firestore";
import { isDuration } from 'moment';

export function ReservationInfoEmployee() {
    const reservationsCollectionRef = collection(db, "Reservations");
    const location = useLocation();
    const [datePicked, setDatePicked] = useState('');
    const [packagePicked, setPackagePicked] = useState('');
    const [schedule, setSchedule] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [tour, setTour] = useState('');
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [companions, setCompanions] = useState('');
    const reservationID = location.state.Reservation;
    const reservation = doc(db, 'Reservations', reservationID);

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/EmployeeMenu',{})        
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
        setUser(gotReservation.get('User'));
        setEmail(gotReservation.get('Email'));
    }

    useEffect(() => {
        setValues();
      }, []);  
      
    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
                <div style={{float: 'right', width: '60%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                    <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                        <label style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', marginTop:'20px', marginBottom:'60px'}}>Reservation Info</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>{user}</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>{email}</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>{tour}</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>{datePicked}</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>{schedule}</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>{companions}</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>{packagePicked}</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>${totalPrice}</label>
                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}} onClick={() => goBack()}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}