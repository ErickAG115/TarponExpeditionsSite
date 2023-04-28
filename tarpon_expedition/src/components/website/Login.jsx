import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPageStyle.css";
import { db } from "../../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";


export function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [psswrd, setPsswrd] = useState("");

    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "Users");

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
        };
        getUsers();
    }, []);

    const loginUser = async () => {
        let flag = false;
        
        for(let i in users){
            //console.log(usuarios[i]);
            if(users[i].Email == email && users[i].Password == psswrd && users[i].activo == true){
                flag = true;
                if(users[i].Type == 'admin'){
                    console.log("Inicio de sesión Administrador exitoso");
                    navigate('/AdminMenu',{});
                }
                else if(users[i].Type == 'employee'){
                    console.log("Inicio de sesión Empleado exitoso");
                    // FALTA VER CUAL ES LA RUTA PARA EL EMPLEADO
                    navigate('/',{});
                }
                else{
                    const id = users[i].id;
                    const name= users[i].FirstName;
                    const lastName = users[i].LastName;
                    console.log(name);
                    console.log(lastName);
                    console.log("Inicio de sesión Cliente exitoso");
                    navigate('/Tours',{state:{id: id, Email: email, Password: psswrd, FirstName: name, 
                                            LastName: lastName}});
                }
            }
        }
        if(flag === false){
            console.log("Inicio de sesión fallida. Intente de nuevo");
            alert("Login failed");
        }

    };

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

    return (
        <Fragment>
            <div className='banner'>
                <div class='navbar'>
                    <img src={require('./logoNegro.png')} class = 'logo'/>
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
                            
                            <label style={{fontFamily: 'lato', fontSize: '40px', fontWeight:'bold', marginBottom:'40px',color: '#fff'}}>Log In</label>

                            <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-80px',color: '#fff'}}>Email Address</label>
                            <input type="text" id="Email" style={{ borderRadius: '5px', width:'45%', marginBottom:'20px'}} 
                                onChange={(event) =>{
                                    setEmail(event.target.value);
                            }}/>

                            <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-100px',color: '#fff'}}>Password</label>
                            <input type="password" id="Password" style={{ borderRadius: '5px', width:'45%'}} 
                                onChange={(event) =>{
                                    setPsswrd(event.target.value);
                            }}/>
                            <button style={{color: '#24AFC1', fontFamily: 'lato', fontSize: '15px', position: 'relative', left: '-85px', marginBottom:'20px', border: 'none', background: 'transparent'}}>Forgot Password?</button>

                            <div style={{height:'20%', width:'70%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                                <button onClick={loginUser} style={{width:'30%', fontSize: '20px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}}>Log In</button>
                                <button onClick={handleSignUp} style={{width:'30%', fontSize: '20px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginLeft:'10px'}}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>

        </Fragment>
    )
}