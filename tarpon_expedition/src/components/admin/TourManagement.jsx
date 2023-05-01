import 'bootstrap/dist/css/bootstrap.min.css';
import "../website/MainPageStyle.css";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection, updateDoc, getDocs, getDoc, doc, Timestamp} from "firebase/firestore";

export function TourManagement() {

    const [tours, setTours] = useState([]);
    const tourCollectionRef = collection(db, "Tours");

    const getTours = async () => {
        const data = await getDocs(tourCollectionRef);
        const toursDoc = data.docs
            .map((doc) => ({ ...doc.data(), id: doc.id }))
            .filter((tourDoc) => !tourDoc.Deleted);
        setTours(toursDoc);
        console.log(tours);
    };

    const goModify=(tour)=>{
        console.log(tour);
        navigate('/ModifyTour',{state:{Tour: tour}});
    }

    const eliminateTour = async (tour) =>{
        const TourDOC = await doc(db, "Tours", tour);
        const dataTour = {
            Deleted: true
        }
        await updateDoc(TourDOC, dataTour);
        getTours();
    }

  useEffect(() => {
    getTours();;
  }, []);

    const navigate = useNavigate();

    const goCreate = () =>{
        navigate('/CreateTour',{});
    }

    const goSchedule = (tour) =>{
        navigate('/AddSchedule',{state:{Tour: tour}});
    }
    
    const goBack = () =>{
        navigate('/AdminMenu',{});
    }

    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex',alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
                    <div style={{float: 'right', width: '90%', height:'90%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                        <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px',backdropFilter: 'blur(15px)',border: '2px solid rgba(255,255,255,.5)',boxShadow: '0 0 30px rgba(0,0,0,.5)'}}>
                            <label style={{fontFamily: 'lato', fontSize: '40px', fontWeight:'bold', marginBottom:'60px'}}>Tour Management</label>
                            <table className="table" style={{fontFamily: 'Lato', border: '1px solid black', fontSize: '20px'}}>
                                <thead>
                                    <tr>
                                        <th>Tour Name</th>
                                        <th>Price</th>
                                        <th>Techniques</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {tours.map((tour) => (
                                <tr key={tour.id}>
                                    <td>{tour.Name}</td>
                                    <td>{tour.Price}</td>
                                    <td>{(tour.Techniques).join(', ')}</td>
                                    <td><button style={{color:'white',width:'100%', fontFamily: 'lato', backgroundColor:'#24AFC1', border: 'none', borderRadius: '7px'}} onClick={()=>goModify(tour.id)}>Modify
                                    </button></td>
                                    <td><button style={{color:'white',width:'100%', fontFamily: 'lato', backgroundColor:'#24AFC1', border: 'none', borderRadius: '7px'}} onClick={()=>goSchedule(tour.Name)}>Add Schedule
                                    </button></td>
                                    <td><button style={{color:'white',width:'100%', fontFamily: 'lato', backgroundColor:'#F73910', border: 'none', borderRadius: '7px'}} onClick={()=>eliminateTour(tour.id)}>Eliminate
                                    </button></td>
                                </tr>
                                ))}
                                </tbody>
                            </table>
                            <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                            <button style={{fontSize: '25px', color:'white',width:'20%', fontFamily: 'lato', backgroundColor:'#24AFC1', border: 'none', borderRadius: '10px', marginRight:'10px'}} onClick={()=>goCreate()}>Create Tour</button>
                            <button style={{fontSize: '25px', color:'white',width:'20%', fontFamily: 'lato', backgroundColor:'#24AFC1', border: 'none', borderRadius: '10px', marginLeft:'10px'}} onClick={()=>goBack()}>Back</button>
                            </div>
                        </div>
                    </div>
            </div>
        </Fragment>
    )
}