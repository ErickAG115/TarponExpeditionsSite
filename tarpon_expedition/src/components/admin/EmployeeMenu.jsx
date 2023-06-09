import 'bootstrap/dist/css/bootstrap.min.css';
import "../website/MainPageStyle.css";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection, updateDoc, getDocs, getDoc, doc, Timestamp} from "firebase/firestore";

export function EmployeeMenu() {

    const [reservations, setReservations] = useState([]);
    const reservationsCollectionRef = collection(db, "Reservations");

    const getReservations = async () => {
        const data = await getDocs(reservationsCollectionRef);
        const reservationsDoc = data.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((reservationDoc) => !reservationDoc.deleted);
        setReservations(reservationsDoc);
        console.log(reservations);
        console.log(reservationsCollectionRef);
    };

  useEffect(() => {
    getReservations();;
  }, []);

    const navigate = useNavigate();

    const handleBack = () =>{
        navigate('/',{});
    }

    const goDetails = (reserv) =>{
        navigate('/ReservationInfoEmployee',{state:{Reservation: reserv}})
    }

    
    return (
        <Fragment>
                <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
                    <div style={{float: 'right', width: '90%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                        <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px',backdropFilter: 'blur(15px)',border: '2px solid rgba(255,255,255,.5)',boxShadow: '0 0 30px rgba(0,0,0,.5)'}}>
                            <h1 tabIndex='0' style={{fontFamily: 'lato', fontSize: '40px', fontWeight:'bold', marginBottom:'60px'}}>Active reservations</h1>
                            <table className="table" style={{ fontFamily: 'Lato', border: '1px solid black', fontSize: '20px'}}>
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Email</th>
                                        <th>Tour Name</th>
                                        <th>Date</th>
                                        <th>Start Time</th>
                                        <th>Finish Time</th>
                                        <th>Price</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {reservations.map((reservation) => (
                                <tr key={reservation.id}>
                                    <td>{reservation.User}</td>
                                    <td>{reservation.Email}</td>
                                    <td>{reservation.Tour}</td>
                                    <td>{(reservation.start).toDate().toLocaleDateString()}</td>
                                    <td>{(reservation.start).toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td>{(reservation.end).toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td>{reservation.Price}</td>
                                    <td><button aria-label={`View the details of the reservation made by ${reservation.User} for the tour ${reservation.Tour}`} style={{color:'white',width:'100%', fontFamily: 'lato', backgroundColor:'#24AFC1', border: 'none', borderRadius: '7px'}} onClick={()=>goDetails(reservation.id)}>Details
                                    </button></td>
                                </tr>
                                ))}
                                </tbody>
                            </table>
                            <button style={{fontSize: '20px', color:'white',width:'13%', height:'7%', fontFamily: 'lato', backgroundColor:'#24AFC1', border: 'none', borderRadius: '7px'}} onClick={()=>handleBack()}>Logout</button>
                        </div>
                    </div>
                </div>
        </Fragment>
    )
}