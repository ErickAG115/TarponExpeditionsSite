import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, forwardRef, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection, updateDoc, getDocs, getDoc, doc, Timestamp} from "firebase/firestore";
import moment from 'moment';

export function ReservationDate() {
    const [datePicked, setDatePicked] = useState("");
    const [packagePicked, setPackagePicked] = useState("");
    const [schedulePicked, setSchedulePicked] = useState("");
    const [schedules, setSchedules] = useState([]);
    const [reservations, setReservations] = useState([]); 
    const [tours, setTours] = useState([]);
    const [schedulesFiltered, setSchedulesFiltered] = useState([]);
    const schedulesCollectionRef = collection(db, "Schedules");
    const reservationsCollectionRef = collection(db, "Reservations");
    const toursCollectionRef = collection(db, "Tours");
    let navigate = useNavigate();

    const location = useLocation();
    const dateChosen = location.state.date;
    const packageChosen = location.state.package;
    const schedule = location.state.schedule;
    const tour = location.state.tour;
    const price = location.state.price;
    const tourName = location.state.tourName;

    // Data from login
    const idUser = location?.state?.idUser;
    const email = location?.state?.email;
    const firstName = location?.state?.firstName;
    const lastName = location?.state?.lastName;
    console.log('userData', idUser,email,firstName,lastName);


    useEffect(() => {
        setPackagePicked(packageChosen);
        setSchedules(schedule);
        if(dateChosen!=''){
            console.log('adentro');
            handleDate(dateChosen);
        }
        else{
            handleDate('01/01/2023');
        }
      }, [dateChosen]);

    //const tour = location.state.tour;
    //const tour = 'tour name';

    const goToCompanions = () => {
         navigate('/ReservationCompanions',{state: {date: datePicked, package: packagePicked, schedule: schedulePicked, tour: tour, totalPrice: parseInt(price), adults: 0, seniors: 0, children: 0, price:parseInt(price)}});
    }

    const navigateTours = () => {
        navigate('/Tours',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName}});
    };
    

    const getTours = async () => {
        const data = await getDocs(toursCollectionRef);
        const tours = data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter(
            (tour) =>
              !tour.deleted
          );
        setTours(tours);
    };
    useEffect(() => {
        getTours();
      }, []);

    const getSchedules = async () => {
        const data = await getDocs(schedulesCollectionRef);
        const schedules = data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter(
            (schedule) =>
              schedule.Tour == tourName
          );
        setSchedules(schedules);
    };
    useEffect(() => {
        getSchedules(); 
      }, []);

      const getReservations = async () => {
        const data = await getDocs(reservationsCollectionRef);
        const reservation = data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setReservations(reservation);
    };
    useEffect(() => {
        getReservations(); 
      }, []);

    
    const filterSchedules = () => {
        console.log(datePicked);
        console.log(schedules);
        const dataArray = [];
        var found = false;
        const localDate = new Date(datePicked);
        const timezoneOffset = localDate.getTimezoneOffset();
        localDate.setMinutes(localDate.getMinutes() + timezoneOffset);
        const formattedDate = localDate.toLocaleDateString(undefined, { timeZone: 'UTC' });
        for(let i in schedules){
            found = false;
            if(schedules[i].Tour == tour){
                const dateStart = (schedules[i].Start).toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const dateFinish = (schedules[i].Finish).toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                for(let k in reservations){
                    const resStart = (reservations[k].start).toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const resEnd = (reservations[k].end).toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const resDate = (reservations[k].start).toDate().toLocaleDateString();
                    if(dateStart==resStart && dateFinish==resEnd && resDate==formattedDate && tour == reservations[k].Tour){
                        console.log('found');
                        found = true;
                    }
                }
                if(found==false){
                    dataArray.push({
                        text: `${dateStart} to ${dateFinish}`,
                        id: schedules[i].id
                    });
                }
            }
        }
        setSchedulesFiltered(dataArray);
        console.log(dataArray);
    };

    useEffect(() => {
        console.log(datePicked);
        filterSchedules();
      }, [datePicked]);
      
      const handleDate = (e) => {
        console.log(e);
        setDatePicked(e);
      }

    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
                <div style={{float: 'right', width: '60%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                    <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                        <label style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', marginTop:'20px', marginBottom:'60px'}}>Choose a package and Schedule</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', position: 'relative', top: '-20px'}}>Pick a date to display available schedules</label>
                        <input value={datePicked} type="date" id="Date" style={{ borderRadius: '5px', position: 'relative', marginBottom:'20px', position: 'relative', top: '-20px'}} onChange={(event) =>{handleDate(event.target.value);}}/>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', position: 'relative', top: '10px'}}>Schedules</label>
                        <div style={{height:'20%', width:'100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>
                            {schedulesFiltered.map((filteredSchedules) => (
                                <button key={filteredSchedules.id} value={filteredSchedules.id} style={{ fontSize: '20px', height:'30%',width:'30%', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', margin: '4px'}} onClick={() => setSchedulePicked(filteredSchedules.id)}>{filteredSchedules.text}</button>
                            ))}
                        </div>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', position: 'relative', top: '10px'}}>Choose a package</label>
                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto', position: 'relative', top: '-20px'}}>
                            <button style={{width:'15%', height:'30%', fontSize: '20px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px', position: 'relative', top: '10px'}} onClick={() => setPackagePicked('Standard')} >Standard</button>
                            <button style={{width:'15%', height:'30%', fontSize: '20px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginLeft:'10px', position: 'relative', top: '10px'}} onClick={() => setPackagePicked('Premium')}>Premium</button>
                        </div>
                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}} onClick={() => {navigateTours()}}>Cancel</button>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginLeft:'10px'}} onClick={() => {goToCompanions()}}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}