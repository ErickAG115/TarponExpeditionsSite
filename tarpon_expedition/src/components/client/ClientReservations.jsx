import 'bootstrap/dist/css/bootstrap.min.css';
import "../website/MainPageStyle.css";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection, updateDoc, getDocs, getDoc, doc, Timestamp} from "firebase/firestore";

export function ClientReservations() {

    const [reservations, setReservations] = useState([]);
    const reservationsCollectionRef = collection(db, "Reservations");
    const user='testing';


    const getReservations = async () => {
        const data = await getDocs(reservationsCollectionRef);
        const reservationsDoc = data.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((reservationDoc) => !reservationDoc.deleted && reservationDoc.User==user);
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
    return (
        <Fragment>
            <div className='banner'>
                <button style={{background:'transparent',border:'none'}}>
                    <img onClick={handleBack} src={require('../website/icons8-go-back-64.png')} style={{padding:'5px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft:'20px'}}/>
                </button>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh',}}>
                    <div style={{float: 'right', width: '90%', height:'110%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                        <div style={{backgroundColor: '#D2D7DB', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px',backdropFilter: 'blur(15px)',border: '2px solid rgba(255,255,255,.5)',boxShadow: '0 0 30px rgba(0,0,0,.5)'}}>
                            <label style={{fontFamily: 'lato', fontSize: '40px', fontWeight:'bold', marginBottom:'60px'}}>My reservations</label>
                            <table className="table" style={{ fontFamily: 'Lato', border: '1px solid black', fontSize: '20px'}}>
                                <thead>
                                    <tr>
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
                                    <td>{reservation.Tour}</td>
                                    <td>{(reservation.start).toDate().toLocaleDateString()}</td>
                                    <td>{(reservation.start).toDate().toLocaleTimeString()}</td>
                                    <td>{(reservation.end).toDate().toLocaleTimeString()}</td>
                                    <td>{reservation.Price}</td>
                                    <td><button style={{color:'white',width:'80%', fontFamily: 'lato', backgroundColor:'#24AFC1', border: 'none', borderRadius: '7px'}}>Details
                                    </button></td>
                                    <td><button style={{color:'white',width:'80%', fontFamily: 'lato', backgroundColor:'#F73910', border: 'none', borderRadius: '7px'}}>Cancel
                                    </button></td>
                                </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}