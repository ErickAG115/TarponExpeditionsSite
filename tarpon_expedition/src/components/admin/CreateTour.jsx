import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, uploadFile } from "../../firebase";
import { addDoc, collection, getDocs, where, query  } from "firebase/firestore";

export function CreateTour() {

    const navigate = useNavigate();

    const [newNameTour, setNameTour] = useState("");
    const [newTourType, setTourType] = useState("");
    const [newPlace, setPlace] = useState("");
    const [newPrice, setPrice] = useState("");
    const [newDescription, setDescription] = useState("");
    const [startingTime, setStartingTime] = useState("");
    const [finishingTime, setFinishingTime] = useState("");

    const [file, setFile] = useState(null);

    const [tours, setTours] = useState([]);
    const toursCollectionRef = collection(db, "Tours");
    const schedulesCollectionRef = collection(db, "Schedules");

    const checkTours = async (tour) => {
        const querySnapshot = await getDocs(query(collection(db, "Tours"), where("Name", "==", tour)));
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
            else if(newNameTour == "" || newPlace == "" || newPrice=="" || newDescription=="" || URL=="" || startingTime=="", finishingTime==""){
                console.log('HOLA')
                alert('No puede ingresar datos vacios');
            }
            else if(!newTourType){
                alert('No puede ingresar datos vacios');
            }
            else{
                const URL = await uploadFile(file);
                const dataTour = {
                    Name: newNameTour,
                    Type: newTourType,
                    Place: newPlace,
                    Price: newPrice,
                    Desc: newDescription,
                    Image: URL,
                    Deleted: deletedFlag
                };
                const dataSchedules ={
                    Tour: newNameTour,
                    Start: startingTime,
                    Finish: finishingTime
                }
                await addDoc(toursCollectionRef, dataTour);
                await addDoc(schedulesCollectionRef, dataSchedules);
                alert('Creación de Tour exitosa');
                /* REALIZAR CAMBIO, DEBE DIRIRGIRLO A MANAGE TOURS -------------------------------- IMPORTANTE ---------------------------------*/
                navigate('/AdminMenu',{});
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
                                
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-37px'}}>Starting Time</label>
                                <input type="time" id="StartTime" style={{ borderRadius: '5px', marginRight:'10px', position: 'relative', left: '-50px'}} 
                                    onChange={(event) =>{
                                        setStartingTime(event.target.value);}}
                                />
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-30px'}}>Finishing Time</label>
                                <input type="time" id="FinishTime" style={{ borderRadius: '5px', marginRight:'10px', position: 'relative', left: '-50px'}} 
                                    onChange={(event) =>{
                                        setFinishingTime(event.target.value);}}
                                />
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-63px'}}>Picture</label>
                                <input type="file" id="Picture" style={{ borderRadius: '5px', marginRight:'10px', position: 'relative', left: '58px'}} 
                                    onChange={(event) => setFile(event.target.files[0])}
                                />
                        </div>
                        </div>
                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                           <button class='btnT'>Back</button>
                           <button onClick={CreateTour} class='btnT'>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}