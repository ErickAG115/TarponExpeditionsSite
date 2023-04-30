import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection, updateDoc, getDocs, getDoc, doc, Timestamp} from "firebase/firestore";
import { isDuration } from 'moment';

export function Checkout() {
    const [methodMessage, setMethodMessage] = useState("");
    const reservationsCollectionRef = collection(db, "Reservations");
    const location = useLocation();
    const datePicked = location.state.date;
    const packagePicked = location.state.package;
    const schedule = location.state.schedule;
    const totalPrice = location.state.totalPrice;
    const adults = location.state.adults;
    const seniors = location.state.seniors;
    const children = location.state.children;
    const password = location.state.PPassword;
    const email = location.state.PEmail;
    const paymentMethod = location.state.PMethod;
    const cardNumber = location.state.CreditCardNumber;
    const CVVC = location.state.CVV;
    const ExpDate = location.state.ExpDate
    const tour = location.state.tour;
    const schedulePicked = location.state.schedule;
    const schedulesDocRef = doc(db, 'Schedules', schedule);

    const navigate = useNavigate();

    const goBack = () => {
        if(paymentMethod=="card"){
            console.log(CVVC);
            navigate('/card',{state: { PPassword: password, PMethod: 'card', PEmail: email, CreditCardNumber: cardNumber, CVV: CVVC, ExpDate: ExpDate,date: datePicked, package: packagePicked, schedule: schedule, tour: tour, totalPrice: totalPrice, adults: adults, seniors: seniors, children: children}})
        }
        else{
            navigate('/paypal',{state: { PPassword: password, PMethod: 'paypal', PEmail: email, CreditCardNumber: cardNumber, CVV: CVVC, ExpDate: ExpDate,date: datePicked, package: packagePicked, schedule: schedule, tour: tour, totalPrice: totalPrice, adults: adults, seniors: seniors, children: children}})
        }
        
    }

    const checkOut = async () => {
        const gotSchedule = await getDoc(schedulesDocRef);
        const docDataStart = gotSchedule.get('Start');
        const docDataFin = gotSchedule.get('Finish');
        const Start = docDataStart.toDate().toLocaleTimeString('en-US', { hour12: false });
        const Fin = docDataFin.toDate().toLocaleTimeString('en-US', { hour12: false });;
        const localDate = new Date(datePicked);
        const timezoneOffset = localDate.getTimezoneOffset();
        localDate.setMinutes(localDate.getMinutes() + timezoneOffset);
        const formattedDate = localDate.toLocaleDateString(undefined, { timeZone: 'UTC' });
        const [month, day, year] = formattedDate.split('/');
        const isoDateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        const dateStartStr = `${isoDateString}T${Start}.000`;
        const dateFinStr = `${isoDateString}T${Fin}.000`;
        console.log(dateFinStr);
        const TStampStart = new Date(dateStartStr);
        const TStampEnd = new Date(dateFinStr);
        const dateStart = Timestamp.fromMillis(TStampStart);
        const dateEnd = Timestamp.fromMillis(TStampEnd);
        console.log(dateStart);
        const data ={
            Package: packagePicked,
            Price: totalPrice,
            Tour: tour,
            User: 'testing',
            adults: adults,
            seniors: seniors,
            children: children,
            deleted: false,
            end: dateEnd,
            start: dateStart

        };
        console.log(data);
        addDoc(reservationsCollectionRef, data);
    }

    useEffect(() => {
        if(paymentMethod=="card"){
            const lastCardNumbers = cardNumber.slice(-4);
            setMethodMessage(`Credit/Debit card ending in ${lastCardNumbers}`);
        }
        else{
            setMethodMessage(`Paypal account with the email ${email}`);
        }
      }, []);

    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
                <div style={{float: 'right', width: '60%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                    <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                        <label style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', marginTop:'20px', marginBottom:'60px'}}>Summary and Checkout</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', position: 'relative', top: '-20px'}}>{datePicked}</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', position: 'relative', top: '-20px'}}>{methodMessage}</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', position: 'relative', top: '-20px'}}>{totalPrice}</label>
                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}} onClick={() => goBack()}>Back</button>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginLeft:'10px'}} onClick={() => checkOut()}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}