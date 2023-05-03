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
    const totalPriceVar = location.state.totalPrice;
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
    const [totalPrice, setTotalPrice] = useState('');
    const [schedulePicked, setSchedulePicked] = useState('');
    const [companions, setCompanions] = useState('');
    const schedulesDocRef = doc(db, 'Schedules', schedule);

    // Data from login
    const idUser = location?.state?.idUser;
    const emailUser = location?.state?.email;
    const firstName = location?.state?.firstName;
    const lastName = location?.state?.lastName;
    console.log('Checkout, userData', idUser,emailUser,firstName,lastName);

    const navigate = useNavigate();

    const getTotalPrice = () =>{
        if(packagePicked=='Premium'){
            setTotalPrice(totalPriceVar+20);
        }
        else{
            setTotalPrice(totalPriceVar);
        }
    }

    useEffect(() => {
        getTotalPrice();
      }, []); 

    const goBack = () => {
        if(paymentMethod=="card"){
            navigate('/card',{state: { PPassword: password, PMethod: 'card', PEmail: email, CreditCardNumber: cardNumber, CVV: CVVC, ExpDate: ExpDate,date: datePicked, package: packagePicked, schedule: schedule, tour: tour, totalPrice: totalPrice, adults: adults, seniors: seniors, children: children,
                                        idUser: idUser, email: emailUser, firstName: firstName, lastName: lastName}})
        }
        else{
            navigate('/paypal',{state: { PPassword: password, PMethod: 'paypal', PEmail: email, CreditCardNumber: cardNumber, CVV: CVVC, ExpDate: ExpDate,date: datePicked, package: packagePicked, schedule: schedule, tour: tour, totalPrice: totalPrice, adults: adults, seniors: seniors, children: children,
                                        idUser: idUser, email: emailUser, firstName: firstName, lastName: lastName}})
        }
    }

    const scheduleString = async () =>{
        const gotSchedule = await getDoc(schedulesDocRef);
        const docDataStart = gotSchedule.get('Start');
        const docDataFin = gotSchedule.get('Finish');
        const Start = docDataStart.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const Fin = docDataFin.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        setSchedulePicked(`${Start} to ${Fin}`);
    }

    useEffect(() => {
        scheduleString();
      }, []);   

    const companionString = async () =>{
        if(adults == 0 && seniors == 0 && children == 0){
            setCompanions('No extra companions');
        }
        if(adults != 0 && seniors == 0 && children == 0){
            setCompanions(`Adults: ${adults}`);
        }
        if(adults == 0 && seniors != 0 && children == 0){
            setCompanions(`Seniors: ${seniors}`);
        }
        if(adults == 0 && seniors == 0 && children != 0){
            setCompanions(`Children: ${children}`);
        }
        if(adults != 0 && seniors != 0 && children == 0){
            setCompanions(`Adults: ${adults} - Seniors: ${seniors}`);
        }
        if(adults != 0 && seniors == 0 && children != 0){
            setCompanions(`Adults: ${adults} - Children: ${children}`);
        }
        if(adults == 0 && seniors != 0 && children != 0){
            setCompanions(`Seniors: ${seniors} - Children: ${children}`);
        }
        if(adults != 0 && seniors != 0 && children != 0){
            setCompanions(`Adults: ${adults} - Seniors: ${seniors} - Children: ${children}`);
        }
    }

    useEffect(() => {
        companionString();
      }, []);   

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
        //const isoDateString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        const dateStartStr = `${datePicked}T${Start}.000`;
        const dateFinStr = `${datePicked}T${Fin}.000`;
        const TStampStart = new Date(dateStartStr);
        const TStampEnd = (new Date(dateFinStr)).getTime();
        const dateStart = Timestamp.fromMillis(TStampStart);
        const dateEnd = Timestamp.fromMillis(TStampEnd);
        const fullName = `${firstName} ${lastName}`
        const data ={
            Package: packagePicked,
            Price: totalPrice,
            Tour: tour,
            User: fullName,
            Email: emailUser,
            Companions: companions,
            deleted: false,
            end: dateEnd,
            start: dateStart

        };
        alert('Your reservation was registered successfully, you will now be redirected to the tour catalogue window');
        addDoc(reservationsCollectionRef, data);
        navigate('/Tours', {state:{idUser: idUser, email: emailUser, firstName: firstName, lastName: lastName}});
    }

    useEffect(() => {
        if(paymentMethod=="card"){
            const lastCardNumbers = cardNumber.slice(-4);
            setMethodMessage(`Paid with Credit/Debit\ncard ending in ${lastCardNumbers}`);
        }
        else{
            setMethodMessage(`Paid with Paypal account\nwith the email ${email}`);
        }
      }, []);

    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
                <div style={{float: 'right', width: '60%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                    <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                        <label style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', marginTop:'20px', marginBottom:'60px'}}>Summary and Checkout</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>{tour}</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>{datePicked}</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>{schedulePicked}</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>{companions}</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>{packagePicked} package</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>{methodMessage}</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', top: '-20px'}}>Final price: ${totalPrice}</label>
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