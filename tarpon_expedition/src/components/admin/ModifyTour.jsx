import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db, uploadFile } from "../../firebase";
import { addDoc, collection, updateDoc, getDocs, getDoc, doc, Timestamp, where, query} from "firebase/firestore";

export function ModifyTour() {

    const toursCollectionRef = collection(db, "Tours");
    const schedulesCollectionRef = collection(db, "Schedules");
    const [schedules, setSchedules] = useState([]);
    const [originalTourName, setoriginalTourName] = useState('');
    const [tourName, setTourName] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [place, setPlace] = useState('');
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [tours, setTours] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [file, setFile] = useState(null);
    const Tour = location.state.Tour;
    const tour = doc(db, "Tours", Tour);

    

    const goBack = () =>{
        navigate('/TourManagement',{});
    };

    const getTours = async () => {
        const data = await getDocs(toursCollectionRef);
        const tours = data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter(
            (tour) =>
              !tour.Deleted
          );
        setTours(tours);
    };

    const updateInputs = async () =>{
        const TourDOC = await getDoc(doc(db, "Tours", Tour));
        setDescription(TourDOC.data().Desc);
        setType(TourDOC.data().Type);
        setPlace(TourDOC.data().Place);
        setPrice(TourDOC.data().Price);
        setSelectedCheckboxes(TourDOC.data().Techniques);
        setTourName(TourDOC.data().Name);
        setoriginalTourName(TourDOC.data().Name);
        const checkBoxesChecked = TourDOC.data().Techniques;
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');

        checkBoxesChecked.forEach((name) => {
            const checkbox = Array.from(checkboxes).find((el) => el.name === name);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    }

    useEffect(() => {
        updateInputs();
      }, []);

    const getSchedules = async () => {
        const data = await getDocs(schedulesCollectionRef);
        const schedules = data.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter(
            (schedule) =>
              schedule.Tour == originalTourName
          );
        console.log(originalTourName);
        setSchedules(schedules);
    };
    useEffect(() => {
        getSchedules();
      }, [originalTourName]);

    const handleCheckboxChange = (e) => {
        const checkboxValue = e.target.value;
        const isChecked = e.target.checked;
    
        if (isChecked) {
          setSelectedCheckboxes([...selectedCheckboxes, checkboxValue]);
        } else {
          setSelectedCheckboxes(selectedCheckboxes.filter((value) => value !== checkboxValue));
        }
        console.log(selectedCheckboxes);
      };

    const uploadTour = async () => {
        console.log(schedules);
        if(tourName=='' || type=='' || price=='' || description=='' || selectedCheckboxes==[] || place==''){
            console.log('a');
        }
        else{
            let found = false;
            for(let i in tours){
                if(tours[i].Name == tourName && originalTourName != tourName){
                    found=true;
                }
            }
            if(found==true){

            }

            else{
                if(file==null || file==""){
                    const dataTour = {
                        Name: tourName,
                        Type: type,
                        Price: price,
                        Desc: description,
                        Deleted: false,
                        Place: place,
                        Techniques: selectedCheckboxes
                    };
                    await updateDoc(tour, dataTour);
                }
                else{
                    const URL = await uploadFile(file);
                    const dataTour = {
                        Name: tourName,
                        Type: type,
                        Price: price,
                        Desc: description,
                        Deleted: false,
                        Place: place,
                        Image: URL,
                        Techniques: selectedCheckboxes
                    };
                    await updateDoc(tour, dataTour);
                }
                const q = query(schedulesCollectionRef, where('Tour', '==', `${originalTourName}`));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach(async (doc) => {
                    const data = { Tour: tourName };
                    await updateDoc(doc.ref, data);
                });
                alert('The tour was modified succesfully');
                goBack();
            }
        }
    }
    

    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
                <div style={{float: 'right', width: '85%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                    <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                        <label style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', marginTop:'20px'}}>Tour Registration</label>
                        <div style={{width: '100%', height:'100%'}}>
                        <div style={{float: 'left', width: '50%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-79px'}}>Name</label>
                                <input type="text" id="Tour Name" value={tourName} style={{ borderRadius: '5px', marginRight:'10px'}} onChange={(event)=>setTourName(event.target.value)}/>
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-62px'}}>Tour Type</label>
                                <input type="text" id="Tour Type" value={type} style={{ borderRadius: '5px', marginRight:'10px'}} onChange={(event)=>setType(event.target.value)}/>
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-62px'}}>Place</label>
                                <input type="text" id="Place" value={place} style={{ borderRadius: '5px', marginRight:'10px'}} onChange={(event)=>setPlace(event.target.value)}/>
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-82px'}}>Price</label>
                                <input type="number" id="Price" value={price} style={{ borderRadius: '5px', marginRight:'10px'}} onChange={(event)=>setPrice(event.target.value)}/>
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-57px'}}>Description</label>
                                <textarea id="Password" value={description} style={{ width: '50%', height:'40%', borderRadius: '5px', border: '2px solid #444', position: 'relative', left: '27px'}} onChange={(event)=>setDescription(event.target.value)}/>
                        </div>
                        <div style={{float: 'right', width: '50%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'relative', top: '-52px'}}>
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-63px'}}>Picture</label>
                                <input type="file" id="Password" style={{ borderRadius: '5px', marginRight:'10px', position: 'relative', left: '50px'}} onChange={(event) => setFile(event.target.files[0])}/>
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-46px', marginTop:'10px'}}>Techniques</label>
                                <div style={{display:'flex', flexDirection:'column'}}>
                                <div style={{position: 'relative', left:'-40px'}}>
                                <input type='checkbox' id="FlyFishing" name='FlyFishing' value='FlyFishing' style={{ borderRadius: '5px', position: 'relative'}} onChange={handleCheckboxChange}/>
                                <label for="FlyFishing" style={{fontFamily: 'lato', fontSize: '20px'}}>FlyFishing</label>
                                </div>
                                <div style={{position: 'relative', left:'-40px'}}>
                                <input type='checkbox' id="JiggingFast" name='JiggingFast' value='JiggingFast' style={{ borderRadius: '5px', position: 'relative'}} onChange={handleCheckboxChange}/>
                                <label for="JiggingFast" style={{fontFamily: 'lato', fontSize: '20px'}}>JiggingFast</label>
                                </div>
                                <div style={{position: 'relative', left:'-40px'}}>
                                <input type='checkbox' id="Troling" name='Troling' value='Troling' style={{ borderRadius: '5px', position: 'relative'}} onChange={handleCheckboxChange}/>
                                <label for="Troling" style={{fontFamily: 'lato', fontSize: '20px'}}>Troling</label>
                                </div>
                                <div style={{position: 'relative', left:'-40px'}}>
                                <input type='checkbox' id="LiveBait" name='LiveBait' value='LiveBait' style={{ borderRadius: '5px', position: 'relative'}} onChange={handleCheckboxChange}/>
                                <label for="LiveBait" style={{fontFamily: 'lato', fontSize: '20px'}}>LiveBait</label>
                                </div>
                                </div>
                        </div>
                        </div>
                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}} onClick={() => uploadTour()}>Modify</button>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginLeft:'10px'}} onClick={() => goBack()}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}