import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection, updateDoc, getDocs, getDoc, doc, Timestamp} from "firebase/firestore";

export function Card() {
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [CVV, setCVV] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const location = useLocation();
    const datePicked = location.state.date;
    const packagePicked = location.state.package;
    const schedule = location.state.schedule;
    const totalPrice = location.state.totalPrice;
    const adults = location.state.adults;
    const seniors = location.state.seniors;
    const children = location.state.children;
    const tour = location.state.tour;
    const CreditNumber = location.state.CreditCardNumber;
    const CVVCode = location.state.CVV;
    const price = location.state.price;
    console.log(CVVCode);
    const Month = location.state.ExpDate;
    const Year = location.state.ExpDate;

    // Data from login
    const idUser = location?.state?.idUser;
    const email = location?.state?.email;
    const firstName = location?.state?.firstName;
    const lastName = location?.state?.lastName;
    console.log('Card, userData', idUser,email,firstName,lastName);

    const navigate = useNavigate();

    const goCheckout = () => {
      if(creditCardNumber !='' || CVV != '' || month !='' || year !=''){
        navigate('/checkout',{state: { PPassword: '', PMethod: 'card', PEmail: '', CreditCardNumber: creditCardNumber, CVV: CVV, ExpDate: `${month}/${year}`,date: datePicked, package: packagePicked, schedule: schedule, tour: tour, totalPrice: totalPrice, adults: adults, seniors: seniors, children: children,
                                      idUser: idUser, email: email, firstName: firstName, lastName: lastName}})
      }
      else{
        alert("Error: you must fill all the information requested");
      }
    }

    useEffect(() => {
      console.log('a');
      setCVV(CVVCode);
      setMonth(Month.slice(0, 2));
      setYear(Year.slice(-2));
      setCreditCardNumber(CreditNumber);
      console.log(CVV);
    },[]);

    useEffect(() => {
        const formattedValue = creditCardNumber
          .replace(/\D/g, '')
          .replace(/(.{4})/g, '$1 ')
          .trim();
    
        setCreditCardNumber(formattedValue);
      }, [creditCardNumber]);

    function handleCreditCardNumberChange(e) {
        setCreditCardNumber(e.target.value);
    }

    useEffect(() => {
        const formattedValue = CVV
        .replace(/\D/g, '')
        .trim(); // remove any leading or trailing spaces
    
        setCVV(formattedValue);
      }, [CVV]);

    function handleCVV(e) {
        setCVV(e.target.value);
    }

    useEffect(() => {
        const formattedValue = month
          .replace(/\D/g, '')
          .trim();
    
        setMonth(formattedValue);
      }, [month]);

    function handleMonth(e) {
        setMonth(e.target.value);
    }

    useEffect(() => {
        const formattedValue = year
          .replace(/\D/g, '')
          .trim();
    
        setYear(formattedValue);
      }, [year]);

    function handleYear(e) {
        setYear(e.target.value);
    }

    const goBack = () =>{
      navigate('/ReservationPayment', {state: {date: datePicked, package: packagePicked, schedule: schedule, tour: tour, totalPrice: totalPrice, adults: adults, seniors: seniors, children: children, price: price}})
    }

    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
                <div style={{float: 'right', width: '60%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                    <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                        <label style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', marginTop:'20px', marginBottom:'60px'}}>Enter Credit/Debit card information</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', position: 'relative', top: '-20px'}}>Credit card number</label>
                        <input value={creditCardNumber} type="text" id="credit-card-number" style={{ alignItems: 'center', textAlign: 'center', borderRadius: '5px', marginBottom:'20px', position: 'relative', top: '-20px', padding: '6px 12px'}} maxLength="19" onChange={handleCreditCardNumberChange}/>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', position: 'relative', top:'-5px'}}>Expiration Date (mm/yy)</label>
                        <div style={{height:'15%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', position: 'relative', top:'-15px'}}>
                            <input value={month} type="text" id="credit-card-month" style={{ width:'14.3%', alignItems: 'center', textAlign: 'center', borderRadius: '5px', marginBottom:'20px', marginRight:'5px', position: 'relative', top: '-2px', padding: '6px 12px'}} maxLength="2" onChange={handleMonth}/>                        
                            <input value={year} type="text" id="credit-card-year" style={{ width:'14.3%', alignItems: 'center', textAlign: 'center', borderRadius: '5px', marginBottom:'20px', marginLeft:'5px', position: 'relative', top: '-2px', padding: '6px 12px'}} maxLength="2" onChange={handleYear}/>
                        </div>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', position: 'relative', top: '-20px'}}>CVV</label>
                        <input value={CVV} type="text" id="Date" style={{ borderRadius: '5px', position: 'relative', marginBottom:'20px', textAlign: 'center', position: 'relative', top: '-20px', padding: '6px 12px'}} maxLength="4" onChange={handleCVV}/>
                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}} onClick={() => goBack()}>Back</button>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginLeft:'10px'}} onClick={() => goCheckout()}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}