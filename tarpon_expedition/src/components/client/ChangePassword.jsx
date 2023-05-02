import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../website/MainPageStyle.css";
import { db } from "../../firebase";
import { addDoc, collection, updateDoc, getDocs, getDoc, doc, Timestamp} from "firebase/firestore";


export function ChangePassword() { 

    const navigate = useNavigate();
    const location = useLocation();

    const [currentPsswrd, setCurrentPsswrd] = useState("");
    const [newPsswrd, setNewPsswrd] = useState("");
    const [confirmPsswrd, setConfirmPsswrd] = useState("");

    const pageNumber = location?.state?.pageNumber;

    // Data from login
    const idUser = location?.state?.idUser;
    const email = location?.state?.email;
    const firstName = location?.state?.firstName;
    const lastName = location?.state?.lastName;
    console.log('Tours userData', idUser,email,firstName,lastName);

    // Data from the tour that have been selected
    const idTour = location?.state?.idTour;
    const tourName = location?.state?.tourName;
    const imgTour = location?.state?.imgTour;
    const tourPlace = location?.state?.tourPlace;
    const tourType = location?.state?.tourType;
    const tourTech = location?.state?.tourTech;
    const tourPrice = location?.state?.tourPrice;
    const tourDescription = location?.state?.tourDescription;
    const user = doc(db, "Users", idUser);

    const handleHome = () =>{
        navigate('/',{});
    };

    const handleTour = () =>{
        navigate('/Login',{});
    };

    const handleAbout = () =>{
        navigate('/AboutUs',{});
    };

    const handleContact = () =>{
        navigate('/Contact',{});
    };

    const handleLogin = () =>{
        navigate('/Login',{});
    };

    const handleMyAccount = () =>{
        // VALIDAR QUE LA SESIÓN ESTÉ INICIADA PARA PODER ENTRAR
        // CASO CONTRARIO QUE LO MANDE A INICIAR SESIÓN
        navigate('/ClientMenu',{});
    };

    const handleSignUp = () =>{
       
        navigate('/Register',{});
    };

    const handleBack = () =>{
        navigate('/ClientMenu',{state:{idUser: idUser, email: email, firstName: firstName, lastName: lastName,
            idTour: idTour, tourName: tourName, imgTour: imgTour, tourPlace: tourPlace,
            tourType: tourType, tourTech: tourTech, tourPrice: tourPrice, tourDescription: tourDescription, pageNumber: pageNumber}})
    }

    const changePassword = async () =>{
        const UserDOC = await getDoc(doc(db, "Users", idUser));
        if(currentPsswrd == "" || newPsswrd == "" || confirmPsswrd == ""){
            alert("You can't leave any empty areas");
        }
        else{
            if((UserDOC.data().Password) != currentPsswrd){
                alert("The current password must match your actual current password");
            }
            else{
                if(newPsswrd != currentPsswrd){
                    alert("You can't use the same password");
                }
                else{
                    if(newPsswrd != confirmPsswrd){
                        alert("Your new password doesn't match your password confirmation");
                    }
                    else{
                        const data={
                            Password: newPsswrd
                        }
                        await updateDoc(user, data);
                        alert('Your password was changed succesfully');
                        handleBack();
                    }
                }
            }
        }
    }


    return (
        <Fragment>
            <div className='banner'>
                <div class='navbar'>
                    <img src={require('../website/logoNegro.png')} class = 'logo'/>
                        <ul>
                            <li><button onClick={handleHome} style= {{color: '#fff'}}> HOME </button></li>
                            <li><button onClick={handleTour} style= {{color: '#fff'}}> TOURS </button></li>
                            <li><button onClick={handleAbout} style= {{color: '#fff'}}> ABOUT </button></li>
                            <li><button onClick={handleContact} style= {{color: '#fff'}}> CONTACT </button></li>
                            <li><button onClick={handleLogin} style= {{color: '#fff'}}> LOGIN </button></li>
                            <li><button onClick={handleMyAccount} style= {{color: '#fff'}}>MY ACCOUNT</button></li>
                        </ul>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh',}}>
                    <div style={{float: 'right', width: '50%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                        <div style={{background:'transparent',height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px', backdropFilter: 'blur(15px)',border: '2px solid rgba(255,255,255,.5)',boxShadow: '0 0 30px rgba(0,0,0,.5)'}}>
                            
                            <label style={{fontFamily: 'lato', fontSize: '40px', fontWeight:'bold', marginBottom:'40px',color: '#fff'}}>Change Password</label>

                            <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-80px',color: '#fff'}}>Current Password</label>
                            <input type="password" id="old password" style={{ borderRadius: '5px', width:'45%', marginBottom:'20px'}} 
                                onChange={(event) =>{
                                    setCurrentPsswrd(event.target.value);
                            }}/>

                            <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-100px',color: '#fff'}}>New Password</label>
                            <input type="password" id="new Password" style={{ borderRadius: '5px', width:'45%'}} 
                                onChange={(event) =>{
                                    setNewPsswrd(event.target.value);
                            }}/>

                            <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-100px',color: '#fff'}}>Confirm Password</label>
                            <input type="password" id="confirm Password" style={{ borderRadius: '5px', width:'45%'}} 
                                onChange={(event) =>{
                                    setConfirmPsswrd(event.target.value);
                            }}/>

                            <div style={{height:'20%', width:'70%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                                <button onClick={changePassword} style={{width:'30%', fontSize: '20px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}}>Confirm</button>
                                <button onClick={handleBack} style={{width:'30%', fontSize: '20px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginLeft:'10px'}}>Back</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

        </Fragment>
    )
}