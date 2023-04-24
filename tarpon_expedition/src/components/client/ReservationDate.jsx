import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection, updateDoc, getDocs, getDoc, doc, Timestamp} from "firebase/firestore";

export function ReservationDate() {
    const [datePicked, setDatePicked] = useState("");
    const [packagePicked, setPackagePicked] = useState("");
    const [schedulePicked, setSchedulePicked] = useState("");
    const [schedules, setSchedules] = useState([]);
    const [tours, setTours] = useState([]);
    const [schedulesFiltered, setSchedulesFiltered] = useState([]);
    const schedulesCollectionRef = collection(db, "Schedules");
    const toursCollectionRef = collection(db, "Tours");
    let navigate = useNavigate();
    const location = useLocation();
    //const tour = location.state.tour;
    const tour = '5BobrfcDwVxuyLiG7Gxf';

    const goToCompanions = () => {
         navigate('/ReservationCompanions',{state: {date: datePicked, pacakge: packagePicked, schedule: schedulePicked}});
    }

    const navigateTours = () => {
        navigate('/Tours',{});
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
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setSchedules(schedules);
        console.log('aaaa')
    };
    useEffect(() => {
        getSchedules(); 
      }, []);

    
        const filterSchedules = async () => {
            const dataArray = [];
            console.log(schedules);
            console.log(tours);
            for(let i in schedules){
                if(schedules[i].Tour == tour){
                    const dateStart = (schedules[i].Start).toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    const dateFinish = (schedules[i].Finish).toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                     dataArray.push({
                        text: `${dateStart} to ${dateFinish}`,
                        id: schedules[i].id
                    });
                }
            }
            setSchedulesFiltered(dataArray);
            console.log(dataArray);
        };
        
        useEffect(() => {
            filterSchedules();
            console.log('e');
        }, [schedules, tour]);


    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
                <div style={{float: 'right', width: '60%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                    <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                        <label style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', marginTop:'20px', marginBottom:'60px'}}>Choose a package and Schedule</label>
                        <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', position: 'relative', top: '-20px'}}>Date</label>
                        <input type="date" id="Date" style={{ borderRadius: '5px', position: 'relative', marginBottom:'20px', position: 'relative', top: '-20px'}} onChange={(event) =>{setDatePicked(event.target.value);}}/>
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
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}} onClick={() => {navigateTours()}}>Back</button>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginLeft:'10px'}}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}