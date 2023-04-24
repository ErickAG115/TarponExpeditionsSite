import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection, updateDoc, getDocs, getDoc, doc, Timestamp} from "firebase/firestore";

export function Checkout() {
    const [methodMessage, setMethodMessage] = useState("");

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
    const CVV = location.state.CVV;
    const ExpDate = location.state.ExpDate
    const tour = location.state.tour;

    const navigate = useNavigate();

    const goCheckout = () => {
      if(email=='' || password == ''){
        navigate('/checkout',{state: { PPassword: password, PMethod: 'paypal', PEmail: email, CreditCardNumber: '', CVV: '', ExpDate: '',date: datePicked, pacakge: packagePicked, schedule: schedule, tour: tour, totalPrice: totalPrice, adults: adults, seniors: seniors, children: children}})
      }
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
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}} >Back</button>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginLeft:'10px'}} onClick={() => goCheckout()}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}