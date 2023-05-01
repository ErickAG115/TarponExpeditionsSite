import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db, uploadFile } from "../../firebase";
import { addDoc, collection, updateDoc, getDocs, getDoc, doc, Timestamp} from "firebase/firestore";

export function AddSchedule() {

    const schedulesCollectionRef = collection(db, "Schedules");
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [schedules, setSchedules] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const TourName = location.state.Tour;

    const goBack = () =>{
        alert('Esto es una alerta');
        navigate('/TourManagement',{});
    };

      const getSchedules = async () => {
        const data = await getDocs(schedulesCollectionRef);
        const schedules = data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter(
            (schedule) =>
              schedule.Tour == TourName
          );
        setSchedules(schedules);
    };
    useEffect(() => {
        getSchedules();
      }, []);

    const uploadSchedule = async () => {
        if(start=='' || end==''){
            console.log('a');
        }
        else{
            if(start>=end){
                console.log('b');
            }
            else{
                const dateStart = new Date(`1970-01-01T${start}`);
                const dateEnd = new Date(`1970-01-01T${end}`);
                const unixTimestampStart = dateStart.getTime();
                const unixTimestampEnd = dateEnd.getTime();
                const TimeStampStart = Timestamp.fromMillis(unixTimestampStart);
                const TimeStampEnd = Timestamp.fromMillis(unixTimestampEnd);
                let found = false;
                console.log(schedules);
                for(let i in schedules){
                    const startStamp = (schedules[i].Start).toDate().toLocaleTimeString('en-US', { hour12: false });
                    const endStamp = (schedules[i].Finish).toDate().toLocaleTimeString('en-US', { hour12: false });
                    console.log(startStamp);
                    const scheduleStart = new Date (`1970-01-01T${startStamp.trim()}`);
                    const scheduleEnd = new Date (`1970-01-01T${endStamp.trim()}`);
                    console.log(scheduleStart);
                    console.log(dateStart);
                    const schedulesDateS = scheduleStart.getTime();
                    const schedulesDateF = scheduleEnd.getTime();
                    if((unixTimestampStart >= schedulesDateS && unixTimestampStart <= schedulesDateF) ||
                    (unixTimestampEnd >= schedulesDateS && unixTimestampEnd <= schedulesDateF) ||
                    (unixTimestampStart <= schedulesDateS && unixTimestampEnd >= schedulesDateF )){
                        found = true;
                    }
                }
                if(found==true){
                    console.log('no');
                }
                else{
                    const data={
                        Start: TimeStampStart,
                        Finish: TimeStampEnd,
                        Tour: TourName
                    }
                    await addDoc(schedulesCollectionRef, data);
                }
            }
        }
    };
    

    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
                <div style={{float: 'right', width: '85%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                    <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                        <label style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', marginTop:'20px'}}>Add Schedule</label>
                        <div style={{float: 'right', width: '50%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'relative', top: '-52px'}}>
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-37px'}}>Starting Time</label>
                                <input type="time" id="First Name" style={{ borderRadius: '5px', marginRight:'10px', position: 'relative', left: '-35px'}} onChange={(event)=>setStart(event.target.value)}/>
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-30px'}}>Finishing Time</label>
                                <input type="time" id="First Name" style={{ borderRadius: '5px', marginRight:'10px', position: 'relative', left: '-35px'}} onChange={(event)=>setEnd(event.target.value)}/>
                        </div>
                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}} onClick={() => uploadSchedule()}>Modify</button>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginLeft:'10px'}} onClick={() => goBack()}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}