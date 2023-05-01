import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, uploadFile } from "../../firebase";
import { addDoc, collection, getDocs, where, query, Timestamp  } from "firebase/firestore";

export function CreateTour() {

    const navigate = useNavigate();

    const [newNameTour, setNameTour] = useState("");
    const [newTourType, setTourType] = useState("");
    const [newPlace, setPlace] = useState("");
    const [newPrice, setPrice] = useState("");
    const [newDescription, setDescription] = useState("");
    const [startingTime, setStartingTime] = useState("");
    const [finishingTime, setFinishingTime] = useState("");
    const [techniques, setTechniques] = useState([]);

    const [file, setFile] = useState(null);

    const [tours, setTours] = useState([]);
    const toursCollectionRef = collection(db, "Tours");
    const schedulesCollectionRef = collection(db, "Schedules");

    const checkTours = async (tour) => {
        const querySnapshot = await getDocs(query(collection(db, "Tours"), where("Name", "==", tour), where("Deleted", "==", false)));
        return !querySnapshot.empty;
    };

    const handleTourTypeSelect = (event) => {
        const typeValue = event.target.value;
        setTourType(typeValue);
      };

    const CreateTour = async (e) => {
        e.preventDefault();
        try{
            const deletedFlag = false;
            const repeatedTour = await checkTours(newNameTour);
            //const URL = await uploadFile(file);
            console.log('URL', URL);
            console.log('name', newNameTour);
            console.log('type', newTourType.typeValue);
            console.log('place', newPlace);
            console.log('price', newPrice);
            console.log('descrip', newDescription);

            if(repeatedTour){
                alert('Ya existe un TOUR con este nombre');
            }
            else if(newNameTour == "" || newPlace == "" || newPrice=="" || newDescription=="" || URL=="" || startingTime=="" || finishingTime==""){
                console.log('HOLA')
                alert('No puede ingresar datos vacios');
            }
            else if(!newTourType){
                alert('No puede ingresar datos vacios');
            }
            else if(techniques.length == 0){
                alert('No puede ingresar datos vacios');
            }
            else if(startingTime>=finishingTime){
                alert("The starting time has to be earlier than the finishing time");
            }
            else{
                const dateStart = new Date(`1970-01-01T${startingTime}`);
                const dateEnd = new Date(`1970-01-01T${finishingTime}`);
                const unixTimestampStart = dateStart.getTime();
                const unixTimestampEnd = dateEnd.getTime();
                const TimeStampStart = Timestamp.fromMillis(unixTimestampStart);
                const TimeStampEnd = Timestamp.fromMillis(unixTimestampEnd);
                const URL = await uploadFile(file);
                const dataTour = {
                    Name: newNameTour,
                    Type: newTourType,
                    Place: newPlace,
                    Price: newPrice,
                    Desc: newDescription,
                    Image: URL,
                    Techniques: techniques,
                    Deleted: deletedFlag
                };
                const dataSchedules ={
                    Tour: newNameTour,
                    Start: TimeStampStart,
                    Finish: TimeStampEnd
                }
                await addDoc(toursCollectionRef, dataTour);
                await addDoc(schedulesCollectionRef, dataSchedules);
                alert('Creación de Tour exitosa');
                /* REALIZAR CAMBIO, DEBE DIRIRGIRLO A MANAGE TOURS -------------------------------- IMPORTANTE ---------------------------------*/
                navigate('/TourManagemet',{});
            }

        } catch(error){
            console.log(error);
        }
    };


    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
                <div style={{float: 'right', width: '85%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                    <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                        <label style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', marginTop:'20px'}}>Tour Registration</label>
                        <div style={{width: '100%', height:'100%'}}>
                        <div style={{float: 'left', width: '50%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                                
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-59px'}}>Tour Name</label>
                                <input type="text" id="Name" style={{ borderRadius: '5px', marginRight:'10px'}} 
                                    onChange={(event) =>{
                                        setNameTour(event.target.value);}}
                                />

                                <label style={{fontFamily: 'lato', fontSize: '20px',position: 'relative', left: '-62px'}}>Tour Type</label>
                                <select type="text" id="TourType" value={newTourType} onChange={handleTourTypeSelect} style={{ borderRadius: '5px', marginRight:'10px', marginLeft:'-135px'}}>
                                    <option value="" disabled selected>Select</option>
                                    <option value="Sea">Sea</option>
                                    <option value="River">River</option>
                                </select>
                            
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-79px'}}>Place</label>
                                <input type="text" id="Place" style={{ borderRadius: '5px', marginRight:'10px'}}
                                    onChange={(event) =>{
                                        setPlace(event.target.value);}}
                                />
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-82px'}}>Price</label>
                                <input type="number" id="Price" style={{ borderRadius: '5px', marginRight:'10px'}} 
                                    onChange={(event) =>{
                                        setPrice(event.target.value);}}
                                />
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-57px'}}>Description</label>
                                <textarea id="Description" style={{ width: '50%', height:'40%', borderRadius: '5px', border: '2px solid #444', position: 'relative', left: '27px'}} 
                                    onChange={(event) =>{
                                        setDescription(event.target.value);}}
                                />
                        </div>
                        <div style={{float: 'right', width: '50%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'relative', top: '-103px'}}>
                                
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-37px', marginTop:'80px'}}>Starting Time</label>
                                <input type="time" id="StartTime" style={{ borderRadius: '5px', marginRight:'10px', position: 'relative', left: '-50px'}} 
                                    onChange={(event) =>{
                                        setStartingTime(event.target.value);}}
                                />
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-30px'}}>Finishing Time</label>
                                <input type="time" id="FinishTime" style={{ borderRadius: '5px', marginRight:'10px', position: 'relative', left: '-50px'}} 
                                    onChange={(event) =>{
                                        setFinishingTime(event.target.value);}}
                                />
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-63px',marginTop:'20px'}}>Picture</label>
                                <input type="file" id="Picture" style={{ borderRadius: '5px', marginRight:'10px', position: 'relative', left: '58px'}} 
                                    onChange={(event) => setFile(event.target.files[0])}
                                />

                                <div>  
                                <label style={{fontFamily: 'lato', fontSize: '20px', marginTop:'20px', marginRight:'30px'}}>Fishing Techniques</label>
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <label htmlFor="Fly Fishing">
                                    <input type="checkbox" id="Fly Fishing" name="Fly Fishing" value="FlyFishing"
                                        onChange={(event) =>{
                                            const selectedItem = event.target.value;
                                            const isSelected = event.target.checked;
                                            if(isSelected){
                                                setTechniques([...techniques,selectedItem]);
                                            }
                                            else{
                                                setTechniques(techniques.filter(technique => technique !== selectedItem));
                                            }
                                        }}
                                    />
                                    Fly Fishing
                                    </label>
                                    <label htmlFor="Jigging Fast">
                                    <input type="checkbox" id="Jigging Fast" name="Jigging Fast" value="JiggingFast"
                                        onChange={(event) =>{
                                            const selectedItem = event.target.value;
                                            const isSelected = event.target.checked;
                                            if(isSelected){
                                                setTechniques([...techniques,selectedItem]);
                                            }
                                            else{
                                                setTechniques(techniques.filter(technique => technique !== selectedItem));
                                            }
                                        }}
                                            

                                    />
                                    Jigging Fast
                                    </label>
                                    <label htmlFor="Troling">
                                    <input type="checkbox" id="Troling" name="Troling" value="Troling" 
                                        onChange={(event) =>{
                                            const selectedItem = event.target.value;
                                            const isSelected = event.target.checked;
                                            if(isSelected){
                                                setTechniques([...techniques,selectedItem]);
                                            }
                                            else{
                                                setTechniques(techniques.filter(technique => technique !== selectedItem));
                                            }
                                        }}
                                    />
                                    Troling
                                    </label>
                                    <label htmlFor="Live Bait">
                                    <input type="checkbox" id="Live Bait" name="Live Bait" value="LiveBait" 
                                        onChange={(event) =>{
                                            const selectedItem = event.target.value;
                                            const isSelected = event.target.checked;
                                            if(isSelected){
                                                setTechniques([...techniques,selectedItem]);
                                            }
                                            else{
                                                setTechniques(techniques.filter(technique => technique !== selectedItem));
                                            }
                                        }}
                                    />
                                    Live Bait
                                    </label>
                                </div>
                                </div>
                        </div>
                        </div>
                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                           <button onClick={CreateTour} style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}}>Create</button>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginLeft:'10px'}}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}