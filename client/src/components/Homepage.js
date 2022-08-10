import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import randomCodeGenerator from '../utils/randomCodeGenerator'
import { Button, TextField } from "@mui/material"

const Homepage = () => {
    
    const [roomCode, setRoomCode] = useState('')



    return (
        <div className='Homepage'>
            
            <div className='homepage-menu'>
                
                <div className='homepage-form'>
                    <h1 style={{fontSize: "50px"}}> <span className="TextGreen">WHAT DO</span>  <span className="TextPurple">YOU</span> </h1>
                    <h1 style={{fontSize: "60px"}}><span className='TextPink'>MEME</span><span className='TextPurple'>?</span></h1>
                    <div className='homepage-create'>
                        <Link to={`/play?roomCode=${randomCodeGenerator(7)}`} style = {{textDecoration: 'none'}}><Button variant = "contained" className="game-button orange" style = {{width: "200px", backgroundColor: "#00368E", color: "white"}}>CREATE GAME</Button></Link>
                    </div>
                    <h1>OR</h1>
                    <div className='homepage-join'>
                        <TextField style = {{backgroundColor: "rgba(0, 0, 0, 0.2)"}}variant='outlined' placeholder='Game Code' onChange={(event) => setRoomCode(event.target.value)} />
                    </div>
                    <p></p>
                    <Link to={`/play?roomCode=${roomCode}`} style = {{textDecoration: 'none'}}><Button variant = "contained" className="game-button green" style = {{width: "200px", backgroundColor: "#00368E", color: "white"}}>JOIN GAME</Button></Link>
                        <p></p>
                    <div className='homepage-join'>
                        <Link to ={'/rules'} style = {{textDecoration: 'none'}}><Button variant = "contained" className="game-button green" style = {{width: "200px", backgroundColor: "#00368E", color: "white"}}>Rules</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage
