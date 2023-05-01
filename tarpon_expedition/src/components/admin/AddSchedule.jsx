import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db, uploadFile } from "../../firebase";
import { addDoc, collection, updateDoc, getDocs, getDoc, doc, Timestamp} from "firebase/firestore";

export function AddSchedule() {

    const schedulesCollectionRef = collection(db, "Schedules");
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [schedules, setSchedules] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const TourName = location.state.Tour;
    console.log(TourName);

    const goBack = () =>{
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
        console.log(schedules);
      }, []);

    const uploadSchedule = async () => {
        if(start=='' || end==''){
            alert("You can't enter empty times");
        }
        else{
            if(start>=end){
                alert("The starting time has to be earlier than the finishing time");
            }
            else{
                const dateStart = new Date(`1970-01-01T${start}`);
                const dateEnd = new Date(`1970-01-01T${end}`);
                const unixTimestampStart = dateStart.getTime();
                const unixTimestampEnd = dateEnd.getTime();
                const TimeStampStart = Timestamp.fromMillis(unixTimestampStart);
                const TimeStampEnd = Timestamp.fromMillis(unixTimestampEnd);
                let found = false;
                if (schedules.length==5){
                    alert("Each tour is only permitted to have 5 schedules");
                }
                else{
                    for(let i in schedules){
                        const startStamp = (schedules[i].Start).toDate().toLocaleTimeString('en-US', { hour12: false });
                        const endStamp = (schedules[i].Finish).toDate().toLocaleTimeString('en-US', { hour12: false });
                        const scheduleStart = new Date (`1970-01-01T${startStamp.trim()}`);
                        const scheduleEnd = new Date (`1970-01-01T${endStamp.trim()}`);
                        const schedulesDateS = scheduleStart.getTime();
                        const schedulesDateF = scheduleEnd.getTime();
                        if((unixTimestampStart >= schedulesDateS && unixTimestampStart <= schedulesDateF) ||
                        (unixTimestampEnd >= schedulesDateS && unixTimestampEnd <= schedulesDateF) ||
                        (unixTimestampStart <= schedulesDateS && unixTimestampEnd >= schedulesDateF )){
                            found = true;
                        }
                    }
                    if(found==true){
                        alert('The times you entered conflict with already existing schedules');
                    }
                    else{
                        const data={
                            Start: TimeStampStart,
                            Finish: TimeStampEnd,
                            Tour: TourName
                        }
                        await addDoc(schedulesCollectionRef, data);
                        getSchedules();
                    }
                }
            }
        }
    };
    

    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
                <div style={{float: 'right', width: '70%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                    <div style={{backgroundColor: 'white', height:'90%', width:'60%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                        <label style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', marginTop:'20px', position: 'relative', top: '10px'}}>Add Schedule</label>
                        <label style={{fontFamily: 'lato', fontSize: '25px', fontWeight:'bold', position: 'relative', top: '40px'}}>Registered Schedules</label>
                        <div style={{float: 'right', width: '70%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'relative'}}>
                        <table className="table" style={{ fontFamily: 'Lato', border: '2px solid black', fontSize: '20px', borderRadius: '10px'}}>
                            <thead>
                                <tr>
                                    <th>Starting time</th>
                                    <th>Finishing time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedules.map((schedule) => (
                                <tr key={schedule.id}>
                                    <td>{(schedule.Start).toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td>{(schedule.Start).toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                            <div style={{display: 'flex', flexDirection: 'horizontal'}}>
                                <label style={{fontFamily: 'lato', fontSize: '22px', position: 'relative', left: '-25px'}}>Starting Time</label>
                                <label style={{fontFamily: 'lato', fontSize: '22px', position: 'relative', left: '8px'}}>Finishing Time</label>
                            </div>
                            <div style={{display: 'flex', flexDirection: 'horizontal'}}>
                                <input type="time" id="First Name" style={{ borderRadius: '5px', fontSize: '20px', position: 'relative'}} onChange={(event)=>setStart(event.target.value)}/>
                                <input type="time" id="First Name" style={{ borderRadius: '5px', fontSize: '20px', position: 'relative'}} onChange={(event)=>setEnd(event.target.value)}/>
                            </div>
                        </div>
                           <button style={{width:'30%', height:'10%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginBottom: '20px'}} onClick={() => uploadSchedule()}>Add</button>
                           <button style={{width:'30%', height:'10%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginBottom: '20px'}} onClick={() => goBack()}>Back</button>
                        
                    </div>
                </div>
            </div>
        </Fragment>
    )
}