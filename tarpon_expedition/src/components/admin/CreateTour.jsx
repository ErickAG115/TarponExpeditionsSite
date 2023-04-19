import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateTour() {
    return (
        <Fragment>
            <div style={{backgroundColor: '#D2D7DB', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',}}>
                <div style={{float: 'right', width: '85%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                    <div style={{backgroundColor: 'white', height:'80%', width:'80%', display: 'flex', flexDirection: 'column', overflow: 'auto', alignItems: 'center', justifyContent: 'center', borderRadius: '10px'}}>
                        <label style={{fontFamily: 'lato', fontSize: '30px', fontWeight:'bold', marginTop:'20px'}}>Tour Registration</label>
                        <div style={{width: '100%', height:'100%'}}>
                        <div style={{float: 'left', width: '50%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-79px'}}>Name</label>
                                <input type="text" id="First Name" style={{ borderRadius: '5px', marginRight:'10px'}} />
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-62px'}}>Tour Type</label>
                                <input type="text" id="Password" style={{ borderRadius: '5px', marginRight:'10px'}} />
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-82px'}}>Price</label>
                                <input type="number" id="Password" style={{ borderRadius: '5px', marginRight:'10px'}} />
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-57px'}}>Description</label>
                                <textarea id="Password" style={{ width: '50%', height:'40%', borderRadius: '5px', border: '2px solid #444', position: 'relative', left: '27px'}} />
                        </div>
                        <div style={{float: 'right', width: '50%', height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'relative', top: '-103px'}}>
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-37px'}}>Starting Time</label>
                                <input type="time" id="First Name" style={{ borderRadius: '5px', marginRight:'10px', position: 'relative', left: '-35px'}} />
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-30px'}}>Finishing Time</label>
                                <input type="time" id="First Name" style={{ borderRadius: '5px', marginRight:'10px', position: 'relative', left: '-35px'}} />
                                <label style={{fontFamily: 'lato', fontSize: '20px', position: 'relative', left: '-63px'}}>Picture</label>
                                <input type="file" id="Password" style={{ borderRadius: '5px', marginRight:'10px', position: 'relative', left: '50px'}} />
                        </div>
                        </div>
                        <div style={{height:'20%', width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto'}}>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginRight:'10px'}}>Create</button>
                           <button style={{width:'30%', height:'40%', fontSize: '25px', fontFamily: 'lato', backgroundColor:'#24AFC1',color: 'white', border: 'none', borderRadius: '10px', marginLeft:'10px'}}>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}