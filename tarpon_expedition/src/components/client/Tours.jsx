import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TourPageStyle.css";

export function Tours() {
    const navigate = useNavigate();
    const handleHome = () =>{
        navigate('/',{});
    }

    const handleTour = () =>{
        navigate('/Tours',{});
    }

    const handleSignIn = () =>{
        navigate('/Register',{});
    }

    const handleMyAccount = () =>{
        // VALIDAR QUE LA SESIÓN ESTÉ INICIADA PARA PODER ENTRAR
        // CASO CONTRARIO QUE LO MANDE A INICIAR SESIÓN
        navigate('/ClientMenu',{});
    }

    const [tourImages, setTourImages] = useState([]);

    const handleAddTourImage = (e) => {
        e.preventDefault();
        const url = e.target.elements.url.value;
        setTourImages([...tourImages, url]);
        e.target.elements.url.value = "";

        {tourImages.map((image, index) => (console.log("aqui",image)))};
    }

    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', height: '100vh',}}>
                <div class='navbarTour'>
                    <img src={require('./hostia.png')} class = 'logo'/>
                        <ul>
                            <li><a onClick={handleHome}> Home </a></li>
                            <li><a onClick={handleTour}> Tours </a></li>
                            <li><a onClick={handleTour}> About </a></li>
                            <li><a onClick={handleTour}> Contact </a></li>
                            <li><a onClick={handleSignIn}> SIGN IN </a></li>
                            <li><a onClick={handleMyAccount}>MY ACCOUNT</a></li>
                        </ul>
                </div>
                <h1 class='tourHeader'>TOURS</h1>
                <form onSubmit={handleAddTourImage}>
                    <input type="text" name="url" placeholder="Enter image URL" />
                    <button type="submit">Add Image</button>
                </form>
                <div class='img-gallery'>
                    {tourImages.map((image, index) => (
                        <div class='flip-card' key={index}>
                            <div class='flip-card-inner'>
                                <div class='flip-card-front'>
                                    <img src={require('./imagesTours/' + image)} />
                                </div>
                                <div class='flip-card-back'>
                                    <h1>Tour De la Hostia</h1>
                                    <p>Este tour es de pesca deportiva, aqui va toda la descripicion general del tour</p>
                                    <p>Price: 200$</p>
                                    <button class='btnT btnT1' onClick={handleHome}>BOOK NOW</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}