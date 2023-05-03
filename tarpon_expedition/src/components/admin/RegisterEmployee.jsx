import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection, getDocs, where, query  } from "firebase/firestore";

export function RegisterEmployee() {

    const navigate = useNavigate();

    // DATA FROM THE REGISTER PAGE
    const [newName, setName] = useState("");
    const [newLastName, setLastName] = useState("");
    const [newEmail, setEmail] = useState("");
    const [newDateBirth, setDateBirth] = useState("");
    const [newPsswrd, setPsswrd] = useState("");
    const [confirmPsswrd, setconfirmPsswrd] = useState("");
    const passwordRegex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$');

    const [usuarios, setUsuarios] = useState([]);
    const usersCollectionRef = collection(db, "Users");

    const SignUp = async () => {
        const typeFlag = 'employee';
        const activoFlag = true;

        if(!passwordRegex.test(newPsswrd)){
            alert('The password format is incorrect. It should be at least 8 characters, one capital letter, and an special character #?!@$%^&*-_');
        }
        else if(newPsswrd != confirmPsswrd){
            alert('The confirm password is incorrect')
        }
        else{
            const data = {
                FirstName: newName,
                LastName: newLastName,
                DateBirth: newDateBirth,
                Email: newEmail,
                Password: newPsswrd,
                Type: typeFlag,
                activo: activoFlag
            };
            await addDoc(usersCollectionRef, data);
            console.log('Successful Sign Up');
            navigate('/AdminMenu',{});
        }
        //console.log('Sign Up failed');
    }

    const handleBack = () =>{
        // VALIDAR QUE LA SESIÓN ESTÉ INICIADA PARA PODER ENTRAR
        // CASO CONTRARIO QUE LO MANDE A INICIAR SESIÓN
        navigate('/AdminMenu',{});
    }


    return (
        <Fragment>
            <div style={{background:'white'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh',}}>
                    <div style={{float: 'right', width: '50%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                        <div style={{backgroundColor: 'transparent', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px',backdropFilter: 'blur(15px)',border: '2px solid rgba(255,255,255,.5)',boxShadow: '0 0 30px rgba(0,0,0,.5)'}}>
                            <h1 tabIndex='0' style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', marginBottom:'20px', marginTop:'20px',color:'black'}}>Employee Registration</h1>
                            <div style={{height:'7%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                                <label for='First Name' style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-117px',color:'black'}}>First Name</label>
                                <label for='Last Name' style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '10px',color:'black'}}>Last Name</label>
                            </div>
                            <div style={{height:'7%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto',marginBottom:'20px'}}>
                                <input type="text" id="First Name" style={{ borderRadius: '5px', marginRight:'10px'}} 
                                    onChange={(event) =>{
                                        setName(event.target.value);
                                }}/>
                                <input type="text" id="Last Name" style={{ borderRadius: '5px', marginLeft:'10px'}} 
                                    onChange={(event) =>{
                                        setLastName(event.target.value);
                                }}/>
                            </div>
                            <label for='Email' style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-147px',color:'black'}}>Email Address</label>
                            <input type="text" id="Email" style={{height:'5%', borderRadius: '5px', width:'67.5%', marginBottom:'20px', position: 'relative'}}
                                onChange={(event) =>{
                                    setEmail(event.target.value);
                            }}/>
                            <label for='Date of Birth' style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-153px',color:'black'}}>Date of Birth</label>
                            <input type="date" id="Date of Birth" style={{height:'5%', borderRadius: '5px', width:'67.5%', marginBottom:'20px', position: 'relative'}} 
                                onChange={(event) =>{
                                    setDateBirth(event.target.value);
                            }}/>
                            <div style={{height:'7%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                                <label for='Password' style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-93px',color:'black'}}>Password</label>
                                <label for='Confirm Password' style={{fontFamily: 'lato', fontSize: '20px', position: 'relative',left: '49px',color:'black'}}>Confirm Password</label>
                            </div>
                            <div style={{height:'7%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                                <input type="password" id="Password" style={{ borderRadius: '5px', marginRight:'11.5px'}} 
                                    onChange={(event) =>{
                                        setPsswrd(event.target.value);
                                }}/>
                                <input type="password" id="Confirm Password" style={{ borderRadius: '5px', marginLeft:'11.5px'}}
                                    onChange={(event) =>{
                                        setconfirmPsswrd(event.target.value);
                                }}/>
                            </div>

                            <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                            <button onClick={handleBack} style={{width:'30%', fontSize: '20px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}}>Back</button>
                            <button onClick={SignUp} style={{width:'30%', fontSize: '20px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginLeft:'10px'}}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
           
        </Fragment>
    )
}