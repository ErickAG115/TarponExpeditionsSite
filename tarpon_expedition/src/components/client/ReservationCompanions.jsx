import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function ReservationCompanions() {
    const [adults, setAdults] = useState(0);
    const [seniors, setSeniors] = useState(0);
    const [children, setChildren] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const location = useLocation();
    const datePicked = location.state.date;
    const packagePicked = location.state.package;
    const schedule = location.state.schedule;
    const totalPriceLocation = location.state.totalPrice;
    const adultsLocation = location.state.adults;
    const seniorsLocation = location.state.seniors;
    const childrenLocation = location.state.children;
    const price = location.state.price;
    const childPrice = price*(75/100);
    const seniorPrice = price*(50/100);
    const tour = location.state.tour;
    const navigate = useNavigate();
    console.log(datePicked);

    // Data from login
    const idUser = location?.state?.idUser;
    const email = location?.state?.email;
    const firstName = location?.state?.firstName;
    const lastName = location?.state?.lastName;
    console.log('Reserv.Companions, userData', idUser,email,firstName,lastName);

      useEffect(() => {
        setAdults(adultsLocation);
        setChildren(childrenLocation);
        setSeniors(seniorsLocation);
        setTotalPrice(totalPriceLocation);
      }, []);

    const goToPayments = () => {
        navigate('/ReservationPayment',{state: {date: datePicked, package: packagePicked, schedule: schedule, tour: tour, totalPrice: totalPrice, adults: adults, seniors: seniors, children: children, price: price,
                                                idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    }

    const goBack = () => {
        navigate('/ReservationDate',{state: {date: datePicked, package: packagePicked, schedule: schedule, tourName: tour, tourPrice: price,
                                    idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    }

    const addAdult  = async () => {
        const newAdults = adults+1;
        const newPrice = totalPrice+price;
        setTotalPrice(newPrice)
        setAdults(newAdults);
    }

    const addSenior  = async () => {
        const newSeniors = seniors+1;
        const newPrice = totalPrice+seniorPrice;
        setTotalPrice(newPrice)
        setSeniors(newSeniors);
    }

    const addChildren  = async () => {
        const newChildren = children+1;
        const newPrice = totalPrice+childPrice;
        setTotalPrice(newPrice)
        setChildren(newChildren);
    }

    const subtractAdult  = async () => {
        if (adults==0){
            setAdults(0);
        }
        else{
            const newAdults = adults-1;
            const newPrice = totalPrice-price;
            setTotalPrice(newPrice)
            setAdults(newAdults);
        }
    }

    const subtractSenior  = async () => {
        if (seniors==0){
            setSeniors(0);
        }
        else{
            const newSeniors = seniors-1;
            const newPrice = totalPrice-seniorPrice;
            setTotalPrice(newPrice)
            setSeniors(newSeniors);
        }
    }

    const subtractChildren  = async () => {
        if (children==0){
            setChildren(0);
        }
        else{
            const newChildren = children-1;
            const newPrice = totalPrice-childPrice;
            setTotalPrice(newPrice)
            setChildren(newChildren);
        }
    }

    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
                <div style={{float: 'right', width: '60%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                    <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                        <h1 tabIndex='0' style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', marginTop:'20px', marginBottom:'30px', position:'relative', top:'10px'}}>Adding Extra Companions</h1>
                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', position: 'relative'}}>
                            <button aria-label="subtract 1 adult" tabIndex="2" style={{width:'6.5%', height:'40%', fontSize: '30px', fontFamily: 'lato', backgroundColor:'white', color: '#FF5B15', borderRadius: '100%', marginRight:'10px', position: 'relative', fontWeight:'bold'}} onClick={() => subtractAdult()}>-</button>
                            <h1 aria-label={`${adults} total adults added`} tabIndex="3" style={{width:'2.5%', height:'40%', fontFamily: 'lato', fontSize: '20px', position: 'relative', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>{adults}</h1>
                            <button aria-label="add 1 adult" name='add one adult' tabIndex="1" style={{width:'6.5%', height:'40%', fontSize: '30px', fontFamily: 'lato', backgroundColor:'white', color: '#24AFC1', borderRadius: '100%', marginLeft:'10px', position: 'relative', fontWeight:'bold'}} onClick={() => addAdult()}>+</button>
                            <div style={{height:'100%', width:'20%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', position: 'relative', flexDirection: 'column'}}>
                                <label tabIndex="4" style={{fontFamily: 'lato', fontSize: '25px'}}>Adult</label>
                                <label tabIndex="5" style={{fontFamily: 'lato', fontSize: '20px'}}>${price} each</label>                            
                            </div>
                        </div>
                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', position: 'relative'}}>
                            <button tabIndex="7" aria-label="subtract 1 child" style={{width:'6.5%', height:'40%', fontSize: '30px', fontFamily: 'lato', backgroundColor:'white', color: '#FF5B15', borderRadius: '100%', marginRight:'10px', position: 'relative', fontWeight:'bold'}} onClick={() => subtractChildren()}>-</button>
                            <h1 aria-label={`${children} total children added`} tabIndex="8" style={{width:'2.5%', height:'40%', fontFamily: 'lato', fontSize: '20px', position: 'relative', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>{children}</h1>
                            <button tabIndex="6" aria-label="add 1 child" style={{width:'6.5%', height:'40%', fontSize: '30px', fontFamily: 'lato', backgroundColor:'white', color: '#24AFC1', borderRadius: '100%', marginLeft:'10px', position: 'relative', fontWeight:'bold'}} onClick={() => addChildren()}>+</button>
                            <div style={{height:'100%', width:'20%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', position: 'relative', flexDirection: 'column'}}>
                                <label tabIndex="9" style={{fontFamily: 'lato', fontSize: '25px'}}>Child</label>
                                <label tabIndex="10" style={{fontFamily: 'lato', fontSize: '20px'}}>${childPrice} each</label>                            
                            </div>
                        </div>
                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', position: 'relative'}}>
                            <button tabIndex="12" aria-label="subtract 1 senior" style={{width:'6.5%', height:'40%', fontSize: '30px', fontFamily: 'L', backgroundColor:'white', color: '#FF5B15', borderRadius: '100%', marginRight:'10px', position: 'relative', fontWeight:'bold'}} onClick={() => subtractSenior()}>-</button>
                            <h1 aria-label={`${seniors} total seniors added`} tabIndex="13" style={{width:'2.5%', height:'40%', fontFamily: 'lato', fontSize: '20px', position: 'relative', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>{seniors}</h1>
                            <button tabIndex="11" aria-label="add 1 senior" style={{width:'6.5%', height:'40%', fontSize: '30px', fontFamily: 'lato', backgroundColor:'white', color: '#24AFC1', borderRadius: '100%', marginLeft:'10px', position: 'relative', fontWeight:'bold'}} onClick={() => addSenior()}>+</button>
                            <div style={{height:'100%', width:'20%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', position: 'relative', flexDirection: 'column'}}>
                                <label tabIndex="14" style={{fontFamily: 'lato', fontSize: '25px'}}>Senior</label>
                                <label tabIndex="15"style={{fontFamily: 'lato', fontSize: '20px'}}>${seniorPrice} each</label>                            
                            </div>
                        </div>
                        <label tabIndex="16" style={{fontFamily: 'lato', fontSize: '20px', fontWeight:'bold'}}>Total price: ${totalPrice}</label> 
                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}} onClick={() => goBack()}>Back</button>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginLeft:'10px'}} onClick={() => goToPayments()}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}