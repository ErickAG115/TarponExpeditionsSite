import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection, updateDoc, getDocs, getDoc, doc, Timestamp} from "firebase/firestore";

export function Paypal() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const location = useLocation();
    const datePicked = location.state.date;
    const packagePicked = location.state.package;
    const schedule = location.state.schedule;
    const totalPrice = location.state.totalPrice;
    const adults = location.state.adults;
    const seniors = location.state.seniors;
    const children = location.state.children;
    const tour = location.state.tour;

    const navigate = useNavigate();
    const emailRegex = new RegExp('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')

    const goCheckout = () => {
      console.log(password);
      if(email!='' && password != '' && emailRegex.test(email)){
        navigate('/checkout',{state: { PPassword: password, PMethod: 'paypal', PEmail: email, CreditCardNumber: '', CVV: '', ExpDate: '',date: datePicked, package: packagePicked, schedule: schedule, tour: tour, totalPrice: totalPrice, adults: adults, seniors: seniors, children: children}})
      }
    }

    const handleEmail = (e) =>{
      setEmail(e);
    }

    const handlePassword = (e) =>{
      setPassword(e);
    }

    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
                <div style={{float: 'right', width: '60%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                    <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                        <label style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', marginTop:'20px', marginBottom:'60px'}}>Enter PayPal information</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', position: 'relative', top: '-20px'}}>Email</label>
                        <input type="text" id="credit-card-number" style={{ alignItems: 'center', textAlign: 'center', borderRadius: '5px', marginBottom:'20px', position: 'relative', top: '-20px', padding: '6px 12px'}} onChange={(event) =>{handleEmail(event.target.value);}}/>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', position: 'relative', top: '-20px'}}>Password</label>
                        <input type="password" id="Date" style={{ borderRadius: '5px', position: 'relative', marginBottom:'20px', textAlign: 'center', position: 'relative', top: '-20px', padding: '6px 12px'}} onChange={(event) =>{handlePassword(event.target.value);}}/>
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