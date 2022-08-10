import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useSearchParams } from 'react-router-dom';
import PACK_OF_CARDS from '../utils/PackOfSituationsFamily'
import PACK_OF_CARDS1 from '../utils/PackOfSituationsFamily2'
// import PACK_OF_MEMES from '../utils/PackOfMemes'
import shuffleArray from '../utils/shuffleArray'
// import Cookies from 'universal-cookie';
import { Button, TextField } from "@mui/material"
import { Fireworks } from 'fireworks/lib/react'
import { useNavigate } from 'react-router-dom';




// const cookies = new Cookies();

let socket
// const ENDPOINT = 'http://localhost:5000'
const ENDPOINT = 'https://what-do-you-meme-online.herokuapp.com/'


const Game = (props) => {
    const navigate = useNavigate();

    
    // PACK_OF_CARDS();
    const [username, setUsername] = useState('')

    const [searchParams] = useSearchParams();
    // console.log(searchParams.get("play   ")); // ▶ URLSearchParams {}
    const data = searchParams.get("roomCode");
    const [room, setRoom] = useState(data)
    const [roomFull, setRoomFull] = useState(false)
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [gamestarted, setGameStarted] = useState(false);
    const [host, setHost] = useState(1);
      let cnt = 0;
      useEffect(() => {
        const connectionOptions =  {
            "forceNew" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        }
        socket = io.connect(ENDPOINT, connectionOptions)

        socket.emit('join', {room: room}, (error) => {
            if(error)
                setRoomFull(true)
        })
        //cleanup on component unmount
        return function cleanup() {
            socket.disconnect();
            //shut down connnection instance
            socket.off()
        }
        
    }, []);
  
    
    const [gameOver, setGameOver] = useState(false)
    const [winner, setWinner] = useState('')
    const [turn, setTurn] = useState(3)
    const [player1Deck, setPlayer1Deck] = useState([])
    const [player2Deck, setPlayer2Deck] = useState([])
    const [player3Deck, setPlayer3Deck] = useState([])
    const [player4Deck, setPlayer4Deck] = useState([])
    const [player5Deck, setPlayer5Deck] = useState([])
    const [player6Deck, setPlayer6Deck] = useState([])
    const [player7Deck, setPlayer7Deck] = useState([])
    const [player8Deck, setPlayer8Deck] = useState([])
    const [played1Card, setPlayed1Card] = useState()
    const [played2Card, setPlayed2Card] = useState()
    const [played3Card, setPlayed3Card] = useState()
    const [played4Card, setPlayed4Card] = useState()
    const [played5Card, setPlayed5Card] = useState()
    const [played6Card, setPlayed6Card] = useState()
    const [played7Card, setPlayed7Card] = useState()
    const [played8Card, setPlayed8Card] = useState()
    const [currentMeme, setCurrentMeme] = useState('')
    const [playedCardsPile, setPlayedCardsPile] = useState([])
    const [playedMemesPile, setPlayedMemesPile] = useState([])
    const [drawCardPile, setDrawCardPile] = useState([])
    // const [timer, setTimer] = useState(30);
    const [seconds, setSeconds] = useState(30);
    const [firstStage, setFirstStage] = useState(true);
    const [ok, setOk] = useState(true);
    const [Max, setMax] = useState(10000);
    const [Cardwon, setCardwon] = useState();
    var timer;
    // setOk(false)
    const startgame = () => {
        // let cnt = 1;
        // while(cnt > 0) cnt --;
        //shuffle PACK_OF_CARDS array
        // console.log(users.length)

        // console.log(ok)
        let shuffledCards = shuffleArray(PACK_OF_CARDS)
        const turn = currentUser + users.length - 1 - Math.floor(Math.random() * users.length)
        // console.log(turn)
        //extract first 7 elements to player1Deck
        var player1Deck = []
        if(users.length >= 1){
            player1Deck = shuffledCards.splice(0, 7)
        }
        //extract first 7 elements to player2Deck
        var player2Deck = []
        if(users.length >= 2){
            player2Deck = shuffledCards.splice(0, 7)
        }

        var player3Deck = []
        if(users.length >= 3){
            player3Deck = shuffledCards.splice(0, 7)
        }

        var player4Deck = []
        if(users.length >= 4){
            player4Deck = shuffledCards.splice(0, 7)
        }

        var player5Deck = []
        if(users.length >= 5){
            player5Deck = shuffledCards.splice(0, 7)
        }

        var player6Deck = []
        if(users.length >= 6){
            player6Deck = shuffledCards.splice(0, 7)
        }

        var player7Deck = []
        if( users.length >= 7){
            player7Deck = shuffledCards.splice(0, 7)
        }

        var player8Deck = []
        if(users.length >= 8){
            player8Deck = shuffledCards.splice(0, 7)
        }

        let played1Card = null
        if(turn !== currentUser + users.length -  1 && users.length >= 1){
            played1Card = player1Deck[Math.floor(Math.random() * 7)]
        }
        let played2Card = null
        if(turn !== currentUser + users.length -  1  - 1 && users.length >= 2){
            played2Card = player2Deck[Math.floor(Math.random() * 7)]
        }
        let played3Card = null
        if(turn !== currentUser + users.length -  1  - 2 && users.length >= 3){
            played3Card = player3Deck[Math.floor(Math.random() * 7)]
        }
        let played4Card = null
        if(turn !== currentUser + users.length -  1  - 3 && users.length >= 4){
            played4Card = player4Deck[Math.floor(Math.random() * 7)]
        }
        let played5Card = null
        if(turn !== currentUser + users.length -  1  - 4 && users.length >= 5){
            played5Card = player5Deck[Math.floor(Math.random() * 7)]
        }
        let played6Card = null
        if(turn !== currentUser + users.length -  1  - 5 && users.length >= 6){
            played6Card = player6Deck[Math.floor(Math.random() * 7)]
        }
        let played7Card = null
        if(turn !== currentUser + users.length -  1  - 6 && users.length >= 7){
            played7Card = player7Deck[Math.floor(Math.random() * 7)]
        }
        let played8Card = null
        if(turn !== currentUser + users.length -  1  - 7 && users.length >= 8){
            played8Card = player8Deck[Math.floor(Math.random() * 7)]
        }
        const playedCardsPile = [];
            if(played1Card){
                playedCardsPile.push(played1Card)
                
            }
            if(played2Card){
                playedCardsPile.push(played2Card)
            }
            if(played3Card){
                playedCardsPile.push(played3Card)
            }
            if(played4Card){
                playedCardsPile.push(played4Card)
            }
            if(played5Card){
                playedCardsPile.push(played5Card)
            }
            if(played6Card){
                playedCardsPile.push(played6Card)
            }
            if(played7Card){
                playedCardsPile.push(played7Card)
            }
            if(played8Card){
                playedCardsPile.push(played8Card)
            }
        // console.log(played1Card);
        //extract random card from shuffledCards and check if its not an action card
        let startingCardIndex
        //make starting card index random number between 0 and 199
        startingCardIndex = Math.floor(Math.random() * 100)
        //store all remaining cards into drawCardPile
        const drawCardPile = shuffledCards
        //send initial state to server
        
        socket.emit('initGameState', {
            
            gameOver: false,
            turn: turn,
            played1Card: played1Card,
            played2Card: played2Card,
            played3Card: played3Card,
            played4Card: played4Card,
            played5Card: played5Card,
            played6Card: played6Card,
            played7Card: played7Card,
            played8Card: played8Card,
            player1Deck: [...player1Deck],
            player2Deck: [...player2Deck],
            player3Deck: [...player3Deck],
            player4Deck: [...player4Deck],
            player5Deck: [...player5Deck],
            player6Deck: [...player6Deck],
            player7Deck: [...player7Deck],
            player8Deck: [...player8Deck],
            currentMeme: startingCardIndex,
            playedCardsPile: [...playedCardsPile],
            playedMemesPile: [...playedMemesPile],
            drawCardPile: [...drawCardPile],
            seconds: 30,
            Cardwon: (played1Card ? played1Card : played2Card),
            firstStage: true,
            gamestarted: true,
            Max: currentUser + users.length - 1,
            host:  host,
            ok: true
            // timer: setTimer(timer)
        })
        // console.log(Max)
        // console.log(users.length)
    }
    useEffect(() => {
        if(users.length >= 1){
        // console.log(firstStage)
        timer = setInterval(() =>{
            let seconds1 = seconds;
            if(gamestarted === true){
                seconds1--;
            }
            //  console.log(seconds);
            if(seconds1 === 0 && firstStage === true && gamestarted === true){
                
                setFirstStage(false)
                socket.emit('updateGameState', {
                    seconds: 30,
                    firstStage: false,
                    gamestarted: gamestarted,
                    winner: winner,
                    gameOver: gameOver
                })
                
            }
            else if (seconds1 === 0 && firstStage === false && gamestarted === true){ 
                
                setFirstStage(true)
                socket.emit('updateGameState', {
                    seconds: 30,
                    firstStage: true,
                    gamestarted: gamestarted,
                    gameOver: gameOver
                })
            }  
            else{
                socket.emit('updateGameState', {
                    seconds: seconds1,
                    firstStage: firstStage,
                    gamestarted: gamestarted,
                    gameOver: gameOver
                })
            }
         
    }, 1000)
        return () => clearInterval(timer);
        }
    })

    // console.log(playedCardsPile)
    // useEffect(() => {   
    // if(player1Deck.length > 0 || player2Deck.length > 0 || player3Deck.length > 0 || player4Deck.length > 0 || player5Deck.length > 0 || player6Deck.length > 0 || player7Deck.length > 0 || player8Deck.length > 0){
        
    //     // console.log(firstStage)
    //     socket.emit('updateGameState', {
    //     gameOver: gameOver,
    //     turn: turn,
    //     player1Deck: [...player1Deck],
    //     player2Deck: [...player2Deck],
    //     player3Deck: [...player3Deck],
    //     player4Deck: [...player4Deck],
    //     player5Deck: [...player5Deck],
    //     player6Deck: [...player6Deck],
    //     player7Deck: [...player7Deck],
    //     player8Deck: [...player8Deck],
    //     played1Card: played1Card,
    //     played2Card: played2Card,
    //     played3Card: played3Card,
    //     played4Card: played4Card,
    //     played5Card: played5Card,
    //     played6Card: played6Card,
    //     played7Card: played7Card,
    //     played8Card: played8Card,
    //     currentMeme: currentMeme,
    //     Cardwon: Cardwon,
    //     playedCardsPile: [...playedCardsPile],
    //     playedMemesPile: [...playedMemesPile],
    //     drawCardPile: [...drawCardPile],
    //     seconds: seconds,
    //     firstStage: firstStage,
    //     gamestarted: gamestarted,
    //     Max: Max,
    //     host: host,
    //     ok: ok
    // })

    // }   

    // }, [seconds])

    console.log(PACK_OF_CARDS1[0])
    useEffect(() => {
    if(users.length >= 1){
        socket.emit('AllReady')
        if(currentUser === users[0].name){
        if(firstStage === true && ok !== true){

        let turn1 = turn;
        while(turn1 === turn){
        for(let i = 0; i < users.length; i++){
            if(turn1 === users[0].name){
                turn1 = users[users.length-1].name
                break;
            }
            else if(turn1 === users[i].name){
                    turn1 = users[i-1].name;
                    break;
            }
        }
        if(turn1 === turn){
            if(turn1 === 1){
                turn1 = users.length
            }
            else{
                turn1--;
            }
        }
        }
        console.log('turn ' + turn1)
        if(PACK_OF_CARDS.length < 50){
            for(let i = 0; i < PACK_OF_CARDS1. length; i++){
                if(PACK_OF_CARDS.indexOf(PACK_OF_CARDS1[i]) === -1){
                    PACK_OF_CARDS.push(PACK_OF_CARDS1[i])
                    console.log('Pack of CARDS 1 `' + PACK_OF_CARDS1[i])  
                }
            }
        }
        let shuffledCards = shuffleArray(PACK_OF_CARDS)
        var player1Deckk = []
        if(users.length >= 1){
            player1Deckk = shuffledCards.splice(0, 7)
        }
        console.log('Pack ' + PACK_OF_CARDS)
        //extract first 7 elements to player2Deck
        var player2Deckk = []
        if(users.length >= 2){
            player2Deckk = shuffledCards.splice(0, 7)
        }

        var player3Deckk = []
        if(users.length >= 3){
            player3Deckk = shuffledCards.splice(0, 7)
        }

        var player4Deckk = []
        if(users.length >= 4){
            player4Deckk = shuffledCards.splice(0, 7)
        }

        var player5Deckk = []
        if(users.length >= 5){
            player5Deckk = shuffledCards.splice(0, 7)
        }

        var player6Deckk = []
        if(users.length >= 6){
            player6Deckk = shuffledCards.splice(0, 7)
        }

        var player7Deckk = []
        if( users.length >= 7){
            player7Deckk = shuffledCards.splice(0, 7)
        }

        var player8Deckk = []
        if(users.length >= 8){
            player8Deckk = shuffledCards.splice(0, 7)
        }
        let played1Card = null
        if(users.length >= 1 && turn1 !== Max){
            played1Card = player1Deckk[Math.floor(Math.random() * 7)]
        }
        console.log('player 1 Deck ' + player1Deck + ' ' + played1Card)
        let played2Card = null
        if(users.length >= 2 && turn1 !== Max - 1){
            played2Card = player2Deckk[Math.floor(Math.random() * 7)]
        }
        let played3Card = null
        if(users.length >= 3 && turn1 !== Max - 2){
            played3Card = player3Deckk[Math.floor(Math.random() * 7)]
        }
        let played4Card = null
        if(users.length >= 4 && turn1 !== Max - 3){
            played4Card = player4Deckk[Math.floor(Math.random() * 7)]
        }
        let played5Card = null
        if(users.length >= 5 && turn1 !== Max - 4 ){
            played5Card = player5Deckk[Math.floor(Math.random() * 7)]
        }
        let played6Card = null
        if(users.length >= 6 && turn1 !== Max - 5 ){
            played6Card = player6Deckk[Math.floor(Math.random() * 7)]
        }
        let played7Card = null
        if(users.length >= 7 && turn1 !== Max - 6){
            played7Card = player7Deckk[Math.floor(Math.random() * 7)]
        }
        let played8Card = null
        if(users.length >= 8 && turn1 !== Max - 7 ){
            played8Card = player8Deckk[Math.floor(Math.random() * 7)]
        }
        if(player1Deck.indexOf(Cardwon) !== -1 && played1Card){
            users[users.length - 1].points += 1
            if(currentUser === users[0].name) socket.emit('setPoints', (users[users.length-1].id))
            if(users[users.length-1].points === 5){
                setWinner(users[users.length-1].username)
                setGameOver(true)
            }
        }
        else if(player2Deck.indexOf(Cardwon) !== -1&& played2Card ){
            users[users.length - 2].points += 1
            if(currentUser === users[0].name)socket.emit('setPoints', (users[users.length-2].id))
            if(users[users.length-2].points === 5){
                setWinner(users[users.length-2].username)
                setGameOver(true)
            }

        }
        else if(player3Deck.indexOf(Cardwon) !== -1 && played3Card){
            users[users.length - 3].points += 1
            if(currentUser === users[0].name)socket.emit('setPoints', (users[users.length-3].id))
            if(users[users.length-3].points === 5){
                setWinner(users[users.length-3].username)
                setGameOver(true)
            }

        }
        else if(player4Deck.indexOf(Cardwon) !== -1&& played4Card){
            users[users.length - 4].points += 1
            if(currentUser === users[0].name)socket.emit('setPoints', (users[users.length-4].id))
            if(users[users.length-4].points === 5){
                setWinner(users[users.length-4].username)
                setGameOver(true)
            }
        }
        else if(player5Deck.indexOf(Cardwon) !== -1&& played5Card){
            users[users.length - 5].points += 1
            if(currentUser === users[0].name)socket.emit('setPoints', (users[users.length-5].id))
            if(users[users.length-5].points === 5){
                setWinner(users[users.length-5].username)
                setGameOver(true)
            }
        }
        else if(player6Deck.indexOf(Cardwon) !== -1&& played6Card){
            users[users.length - 6].points += 1
            if(currentUser === users[0].name)socket.emit('setPoints', (users[users.length-6].id))
            if(users[users.length-6].points === 5){
                setWinner(users[users.length-6].username)
                setGameOver(true)
            }

        }
        else if(player7Deck.indexOf(Cardwon) !== -1&& played7Card){
            users[users.length - 7].points += 1
            if(currentUser === users[0].name)socket.emit('setPoints', (users[users.length-7].id))
            if(users[users.length-7].points === 5){
                setWinner(users[users.length-7].username)
                setGameOver(true)
            }

        }
        else if(player8Deck.indexOf(Cardwon) !== -1&& played8Card){
            users[users.length - 8].points += 1
            if(currentUser === users[0].name)socket.emit('setPoints', (users[users.length-8].id))
            if(users[users.length-8].points === 5){
                setWinner(users[users.length-8].username)
                setGameOver(true)
            }

        }

        const playedCardsPile = [];
            if(played1Card && turn === Max){
                playedCardsPile.push(played1Card)
                
            }

            if(played2Card && turn === Max - 1){
                playedCardsPile.push(played2Card)
            }
            if(played3Card &&  turn === Max - 2){
                playedCardsPile.push(played3Card)
            }
            if(played4Card && turn === Max - 3){
                playedCardsPile.push(played4Card)
            }
            if(played5Card && turn === Max - 4){
                playedCardsPile.push(played5Card)
            }
            if(played6Card && turn === Max - 5){
                playedCardsPile.push(played6Card)
            }
            if(played7Card  && turn === Max - 6){
                playedCardsPile.push(played7Card)
            }
            if(played8Card && turn === Max - 7){    
                playedCardsPile.push(played8Card)
            }

        // console.log(played1Card);
        //extract random card from shuffledCards and check if its not an action card
        let startingCardIndex
        //make starting card index random number between 0 and 199
        startingCardIndex = Math.floor(Math.random() * 100)
        //store all remaining cards into drawCardPile
        const drawCardPile = shuffledCards
        //send initial state to server
        socket.emit('updateGameState', {
            
            gameOver: gameOver,
            turn: turn1,
            played1Card: played1Card,
            played2Card: played2Card,
            played3Card: played3Card,
            played4Card: played4Card,
            played5Card: played5Card,
            played6Card: played6Card,
            played7Card: played7Card,
            played8Card: played8Card,
            player1Deck: [...player1Deckk],
            player2Deck: [...player2Deckk],
            player3Deck: [...player3Deckk],
            player4Deck: [...player4Deckk],
            player5Deck: [...player5Deckk],
            player6Deck: [...player6Deckk],
            player7Deck: [...player7Deckk],
            player8Deck: [...player8Deckk],
            currentMeme: startingCardIndex,
            playedCardsPile: [...playedCardsPile],
            playedMemesPile: [...playedMemesPile],
            drawCardPile: [...drawCardPile],
            seconds: 30,
            Cardwon: playedCardsPile[Math.random() * playedCardsPile.length],
            firstStage: true,
            gamestarted: gamestarted,
            ok: true
            // timer: setTimer(timer)
        })
        }
        if(firstStage === false){    
            
            //make p1 to be equal to played1Card
            var p1 = played1Card
            //make p2 to be equal to played2Card
            var p2 = played2Card
            //make p3 to be equal to played3Card
            var p3 = played3Card
            //make p4 to be equal to played4Card
            var p4 = played4Card
            //make p5 to be equal to played5Card
            var p5 = played5Card
            //make p6 to be equal to played6Card
            var p6 = played6Card
            //make p7 to be equal to played7Card
            var p7 = played7Card
            //make p8 to be equal to played8Card
            var p8 = played8Card
            setPlayed1Card(null)
            setPlayed2Card(null)
            setPlayed3Card(null)
            setPlayed4Card(null)
            setPlayed5Card(null)
            setPlayed6Card(null)
            setPlayed7Card(null)
            setPlayed8Card(null)
            for(let i = 0; i < users.length; i++){
                if(users[i].name === Max){
                    setPlayed1Card(p1)
                    // console.log('lol ' + p1)
                    // console.log('lol2 ' + played1Card)
                }
                else if(users[i].name === Max - 1){
                   setPlayed2Card(p2) 

                //    console.log(played2Card)
                }
                else if(users[i].name === Max - 2){
                    setPlayed3Card(p3) 
                }
                else if(users[i].name === Max - 3){
                    setPlayed4Card(p4) 
                }    
                else if(users[i].name === Max - 4){
                    setPlayed5Card(p5) 
                }    
                else if(users[i].name === Max - 5){
                    setPlayed6Card(p6) 
                }    
                else if(users[i].name === Max - 6){
                    setPlayed7Card(p7) 
                }    
                else if(users[i].name === Max - 7){
                    setPlayed8Card(p8) 
                }  
            }
            // socket.emit('updateGameState', {
            //     played1Card: played1Card,
            //     played2Card: played2Card,
            //     played3Card: played3Card,
            //     played4Card: played4Card,
            //     played5Card: played5Card,
            //     played6Card: played6Card,
            //     played7Card: played7Card,
            //     played8Card: played8Card,
            //     firstStage: firstStage,
            //     gamestarted: gamestarted
            // })
            var playedCardsPile = [];
            if(played1Card && turn !== Max){
                playedCardsPile.push(played1Card)
                
            }
            if(played2Card && turn !== Max - 1){
                playedCardsPile.push(played2Card)
            }
            if(played3Card && turn !== Max - 2){
                playedCardsPile.push(played3Card)
            }

            //repeat this

            if(played4Card && turn !== Max - 3){
                playedCardsPile.push(played4Card)
            }
            if(played5Card && turn !== Max - 4){
                playedCardsPile.push(played5Card)
            }
            if(played6Card  && turn !== Max - 5){
                playedCardsPile.push(played6Card)
            }
            if(Max < currentUser){
                socket.disconnect()
            }
            if(played7Card && turn !== Max - 6){
                playedCardsPile.push(played7Card)
            }
            if(played8Card && turn !== Max - 7){
                playedCardsPile.push(played8Card)
            }
            shuffleArray(playedCardsPile)
            console.log('playercardspile' + playedCardsPile)
            const Cardwon = playedCardsPile[Math.floor(Math.random() * playedCardsPile.length)];
            console.log('Cardwon ' + Cardwon)
            socket.emit('updateGameState', {
                Cardwon: Cardwon,
                playedCardsPile: [...playedCardsPile],
                gamestarted: gamestarted,
                firstStage: firstStage
            })
        }

    }
    }
    }, [firstStage]);
    const ReadyHandler = () => {
        socket.emit('Ready')
        let ok1 = 0;
        let cnt1 = 0;
        for(let i = 0; i < users.length; i++){
            if(users[i].ready === true){
                cnt1++;
            }
            if(users[i].name === currentUser && users[i].ready === true){
                ok1 = 1;
            }
        }
        if(ok1){

        }
        else if(cnt1 === users.length-2 && firstStage === true){
            socket.emit('updateGameState', {
                seconds: 30,
                firstStage: (firstStage === true ? false : true),
                gamestarted: gamestarted,
                gameOver: gameOver
            })
        }
        else if(cnt1 === 0 && firstStage === false){
            socket.emit('updateGameState', {
                seconds: 30,
                firstStage: (firstStage === true ? false : true),
                gamestarted: gamestarted,
                gameOver: gameOver
            })
        }
    }
    // window.location.reload()
    // console.log(gamestarted)
    useEffect(() => {
        // if(gamestarted !== true){

        // }
        
        socket.on('initGameState', ({ gameOver, turn,  played1Card, played2Card, played3Card, played4Card, played5Card, played6Card, played7Card, played8Card, player1Deck, player2Deck, player3Deck, player4Deck, player5Deck, player6Deck, player7Deck, player8Deck, currentMeme, Cardwon, playedCardsPile, playedMemesPile,drawCardPile, seconds, firstStage, gamestarted, Max, ok }) => {
            setGameOver(gameOver)
            setTurn(turn)
            setPlayed1Card(played1Card)
            setPlayed2Card(played2Card)
            setPlayed3Card(played3Card)
            setPlayed4Card(played4Card)
            setPlayed5Card(played5Card)
            setPlayed6Card(played6Card)
            setPlayed7Card(played7Card)
            setPlayed8Card(played8Card)
            setPlayer1Deck(player1Deck)
            setPlayer2Deck(player2Deck)
            setPlayer3Deck(player3Deck)
            setPlayer4Deck(player4Deck)
            setPlayer5Deck(player5Deck)
            setPlayer6Deck(player6Deck)
            setPlayer7Deck(player7Deck)
            setPlayer8Deck(player8Deck)
            setCurrentMeme(currentMeme)
            setCardwon(Cardwon)
            setPlayedCardsPile(playedCardsPile)
            setPlayedMemesPile(playedMemesPile)
            setDrawCardPile(drawCardPile)
            setSeconds(seconds)
            setFirstStage(firstStage)
            setGameStarted(gamestarted)
            setMax(Max)
            setOk(ok)
        })
        socket.on('updateGameState', ({ gameOver, winner, turn, played1Card, played2Card, played3Card, played4Card, played5Card, played6Card, played7Card, played8Card, player1Deck, player2Deck, player3Deck, player4Deck, player5Deck, player6Deck, player7Deck, player8Deck, currentMeme, Cardwon, playedCardsPile, drawCardPile, gamestarted, firstStage, seconds, Max, users, ok }) => {
            
            gameOver && setGameOver(gameOver)
            winner && setWinner(winner)
            turn && setTurn(turn)
            played1Card && setPlayed1Card(played1Card)
            played2Card && setPlayed2Card(played2Card)
            played3Card && setPlayed3Card(played3Card)
            played4Card && setPlayed4Card(played4Card)
            played5Card && setPlayed5Card(played5Card)
            played6Card && setPlayed6Card(played6Card)
            played7Card && setPlayed7Card(played7Card)
            played8Card && setPlayed8Card(played8Card)
            player1Deck && setPlayer1Deck(player1Deck)
            player2Deck && setPlayer2Deck(player2Deck)
            player3Deck && setPlayer3Deck(player3Deck)
            player4Deck && setPlayer4Deck(player4Deck)
            player5Deck && setPlayer5Deck(player5Deck)
            player6Deck && setPlayer6Deck(player6Deck)
            player7Deck && setPlayer7Deck(player7Deck)
            player8Deck && setPlayer8Deck(player8Deck)
            currentMeme && setCurrentMeme(currentMeme)
            Cardwon && setCardwon(Cardwon)
            turn && setTurn(turn)
            playedCardsPile && setPlayedCardsPile(playedCardsPile)
            drawCardPile && setDrawCardPile(drawCardPile)
            seconds && setSeconds(seconds)
            setFirstStage(firstStage)
            setGameStarted(gamestarted)
            Max && setMax(Max);
            setOk(ok)
            // timer && setTimer(timer);
        })
        
        
        
        socket.on("roomData", ({ users }) => {
            setUsers(users)
        })

        socket.on('currentUserData', ({ name }) => {
            // console.log(name)    
            setCurrentUser(name)
        })
        console.log('Max ' + Max)
        if(Max < currentUser){
            socket.disconnect()
        }
    }, [])
    console.log(users)
    //  console.log(Cardwon)
    const onCardPlayedHandler = (played_card) => {
        // console.log(users[0].name);
        if(currentUser === Max )  {
            // setPlayed1Card(played_card)

            // console.log(played1Card)
            socket.emit('updateGameState', {
                played1Card: played_card,
                gamestarted: gamestarted,
                firstStage: firstStage
            })
            // return;
        }
        if(currentUser === Max - 1 )  {
            // setPlayed2Card(played_card)
            socket.emit('updateGameState', {
                played2Card: played_card,
                gamestarted: gamestarted,
                firstStage: firstStage
            })
            // return;
        }
        if(currentUser === Max - 2 )  {
            // setPlayed3Card(played_card)        
            socket.emit('updateGameState', {
                played3Card: played_card,
                gamestarted: gamestarted,
                firstStage: firstStage
            })
            // return;
        }
        if(currentUser === Max - 3 )  {
            
            // setPlayed4Card(played_card)       
            socket.emit('updateGameState', {
                played4Card: played_card,
                gamestarted: gamestarted,
                firstStage: firstStage
            })
            // return;tUser
        }
        if(currentUser === Max - 4)  {
            // setPlayed5Card(played_card)       
            socket.emit('updateGameState', {
                played5Card: played_card,
                gamestarted: gamestarted,
                firstStage: firstStage
            })
            // return;
        }
        if(currentUser === Max - 5 )  {
            // setPlayed6Card(played_card)        
            socket.emit('updateGameState', {
                played6Card: played_card,
                gamestarted: gamestarted,
                firstStage: firstStage
            })
            // return;
        }
        if(users.length >= 7 && currentUser === Max - 6 )  {
            socket.emit('updateGameState', {
                played7Card: played_card,
                gamestarted: gamestarted,
                firstStage: firstStage
            })
            // return;
        }
        if(users.length >= 8 && currentUser === Max - 7)  {
            socket.emit('updateGameState', {
                played8Card: played_card,
                gamestarted: gamestarted,
                firstStage: firstStage
            })

        }
        
        // socket.emit('updateGameState', {
        //     gameOver: gameOver,
        //     turn: turn,
        //     player1Deck: [...player1Deck],
        //     player2Deck: [...player2Deck],
        //     player3Deck: [...player3Deck],
        //     player4Deck: [...player4Deck],
        //     player5Deck: [...player5Deck],
        //     player6Deck: [...player6Deck],
        //     player7Deck: [...player7Deck],
        //     player8Deck: [...player8Deck],
        //     played1Card: played1Card,
        //     played2Card: played2Card,
        //     played3Card: played3Card,
        //     played4Card: played4Card,
        //     played5Card: played5Card,
        //     played6Card: played6Card,
        //     played7Card: played7Card,
        //     played8Card: played8Card,
        //     currentMeme: currentMeme,
        //     playedCardsPile: [...playedCardsPile],
        //     playedMemesPile: [...playedMemesPile],
        //     drawCardPile: [...drawCardPile],
        //     seconds: seconds,
        //     firstStage: firstStage,
        //     gamestarted: gamestarted,
        //     Max: Max,
        //     host: host
        // })
    }
    const onCardPlayedHandlerJudge = (played_card) => {
        if(currentUser === turn){
            socket.emit('updateGameState', {
                Cardwon: played_card,
                gamestarted: gamestarted,
                firstStage: firstStage
            })
        }
    }
    // username = cookies.get('Name');
    // useEffect(() => {
    //     if(username !== ''){
    //         cookies.set('Name', username)
    //     }
    // }, [username])
    // currentUser = cookies.get('Name')

    

    useEffect(() => {
        
        if(gamestarted === true && ok === true){
            
            let username1 = username;
            if(username1 === ""){
            
                // setUsername('Player ' + currentUser)
                username1 = 'Player ' + currentUser
                setUsername(username1)
            }
            socket.emit('setUsername', (username1))
        }
            
    }, [gamestarted])
    if(gamestarted !== true){
        for(let i = 0; i < users.length; i++){
            users[i].username = "Player " + users[i].name
        }
    }
    // console.log(played1Card)
    if(users.length <= 2 && gamestarted === true){
        setTimeout(() => {
            navigate('/')
        }, 5000);
        
        return(
            <div className="container">
                <h1 style = {{"color": "white"} }>Not enough users in room</h1>
            </div>
        )
    }
    if(gameOver === true ){
        let fxProps = {
            count: 3,
            interval: 2000,
            colors: ['#cc3333', '#4CAF50', '#81C784', '#cc3333', '#4CAF50', '#81C784'],
            calc: (props, i) => ({
              ...props,
              x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
              y: 200 + Math.random() * 100 - 50 + (i == 2 ? -80 : 0)
            })
          }
          let fxProps1 = {
            count: 3,
            interval: 2000,
            colors: ['#cc3333', '#4CAF50', '#81C784', '#cc3333', '#4CAF50', '#81C784'],
            calc: (props, i) => ({
              ...props,
              x: 400 + i * 600,
              y: 800 + Math.random() * 100 - 50 + (i == 2 ? -80 : 0) 
            })
          }

        setTimeout(() => {
            navigate('/')
        }, 10000);
        return (
        <div>
        {gameOver === true && <>
            <Fireworks {...fxProps} />
            <Fireworks {...fxProps1} />

            <h1 className='winnerStyle'>{winner} won the game</h1>
        </>}
        </div>
        )
    }
    return (
    <div>
        
        {users.length > 0 && gamestarted === false && currentUser !== users[0].name  &&

         <div className='homepage-name'> 
                         <Button  variant = 'outlined' onClick={() =>  navigator.clipboard.writeText(`${ENDPOINT} + play?roomCode=${data}`)}>Share invitation code with others</Button>
            <p></p>
             <div className='Start-name'>                  
                <h1 style={{fontSize: "50px"}}> <span className="TextGreen">WHAT DO</span>  <span className="TextPurple">YOU</span> </h1>
                    <h1 style={{fontSize: "60px"}}><span className='TextPink'>MEME</span><span className='TextPurple'>?</span></h1>
                <TextField type='text' placeholder='Username' onChange={(event) => setUsername(event.target.value)} /><p /> Wait host... 
            </div>

            <div className='Start-Status'>
                        <p>{users.map((item, i) => (
                                    <div key ={i}>{`${item.username} ${item.name === currentUser ? " This is you" : ""}`}</div>

                                ))}
                        </p>
                    </div>
        </div>
        }
        {users.length > 0 && currentUser === users[0].name  && gamestarted === false && <>
                <div className='homepage-name'> 
                <Button  variant = 'outlined' onClick={() =>  navigator.clipboard.writeText(`${ENDPOINT}play?roomCode=${data}`)}>Share invitation code with others</Button>
                <p></p>

                    <div className='Start-name'>
                             <h1 style={{fontSize: "50px"}}> <span className="TextGreen">WHAT DO</span>  <span className="TextPurple">YOU</span> </h1>
                            <h1 style={{fontSize: "60px"}}><span className='TextPink'>MEME</span><span className='TextPurple'>?</span></h1>

                        <TextField type='text' placeholder='Username' onChange={(event) => setUsername(event.target.value)} />
                        <p></p>
                        <Button variant='outlined' style = {{width: "200px", backgroundColor: "#00368E", color: "white"}} onClick={startgame}>
                            Start Game
                        </Button>
                    </div>
                    <div className='Start-Status'>
                        <p>{users.map((item, i) => (

                                    <div key ={i}>{`${item.username} ${item.name === currentUser ? " This is you" : ""} `}
                                    </div>
                                ))}
                        </p>
                    </div>
                </div>
        </>}
        {users.length > 0 && gamestarted === true && <>
            <div className='UpSide'>
                <div className='Seconds'>&nbsp; 00:{seconds >= 10 ? seconds : '0' + seconds}</div>
                {/* <p></p> */}
            </div>
        {/* <p className='playerDeckText'>{username}</p> */}
            {firstStage === true && <>
            {currentUser === turn && <>

                <h1 style = {{"color": "white"}}>Wait until all players is done... </h1>
            </>}
            
        {/* <div className='Seconds'>{seconds}</div> */}
        <div className='middleInfo'>
        
        <div className= 'Status'>
        <p>{users.map((item, i) => (<>
                    {i == 0 &&  <span className = 'WhoYou'>You are {currentUser !== turn ? 'Player' : 'Judge '}</span>}                
                    <div key ={i}>{`${item.username}: ${item.name !== turn ? 'Player' : 'Judge'} Points: ${item.points}  ${item.name !== turn ? (item.ready === false ? 'not ready' : 'ready') : ''} ${item.name === currentUser ? " - You" : ""}`}</div>
                
                    </>))}
        </p>
        </div>
        <img className='MemeCard' src={require(`../assets/Memes/${currentMeme}.png`)} />
        { currentUser !== turn && currentUser === Max  && <div className='ChoosenCard' style = {{"backgroundColor": `${player1Deck.indexOf(played1Card) % 2 == 0 ? '#272950' : '#A83DA7'}`}}>{played1Card}</div>}
        { currentUser !== turn && currentUser === Max - 1 && <div className='ChoosenCard' style = {{"backgroundColor": `${player2Deck.indexOf(played2Card) % 2 == 0 ? '#272950' : '#A83DA7'}`}}>{played2Card}</div>}
        { currentUser !== turn && currentUser === Max - 2  && <div className='ChoosenCard' style = {{"backgroundColor": `${player3Deck.indexOf(played3Card) % 2 == 0 ? '#272950' : '#A83DA7'}`}}>{played3Card}</div>}
        { currentUser !== turn && currentUser === Max - 3  && <div className='ChoosenCard' style = {{"backgroundColor": `${player4Deck.indexOf(played4Card) % 2 == 0 ? '#272950' : '#A83DA7'}`}}>{played4Card}</div>}
        { currentUser !== turn && currentUser === Max - 4  && <div className='ChoosenCard' style = {{"backgroundColor": `${player5Deck.indexOf(played5Card) % 2 == 0 ? '#272950' : '#A83DA7'}`}}>{played5Card}</div>}
        { currentUser !== turn && currentUser === Max - 5  && <div className='ChoosenCard' style = {{"backgroundColor": `${player6Deck.indexOf(played6Card) % 2 == 0 ? '#272950' : '#A83DA7'}`}}>{played6Card}</div>}
        { currentUser !== turn && currentUser === Max - 6  && <div className='ChoosenCard' style = {{"backgroundColor": `${player7Deck.indexOf(played7Card) % 2 == 0 ? '#272950' : '#A83DA7'}`}}>{played7Card}</div>}
        { currentUser !== turn && currentUser === Max - 7  && <div className='ChoosenCard' style = {{"backgroundColor": `${player8Deck.indexOf(played8Card) % 2 == 0 ? '#272950' : '#A83DA7'}`}}>{played8Card}</div>}
        
        </div>
        {currentUser !== turn && <>
                <h1 className= 'choice'>Choose Card</h1>
            </>}
            
        {currentUser !== turn && <> <Button variant = 'outlined' onClick={() => ReadyHandler()}>Ready</Button> </>}
        { currentUser !== turn && currentUser === Max && <>
             
            {/* <p className='playerDeckText'>{username}</p> */}
                        <div className='Deck'>
                            {player1Deck.map((item, i) => (
                                    <div
                                    key={i}
                                    className='Card'
                                    alt = "lol"
                                    onClick={() => onCardPlayedHandler(item)}
                                    style = {{backgroundColor: (i % 2 === 0 ? '#272950' : '#A83DA7')}}

                                    >
                                        {item}
                                    </div>
                                    
                            ))}
                        </div>
            </>}
            {currentUser !== turn && currentUser === Max - 1 && <>   
            {/* <p className='playerDeckText'>{username}</p> */}
            <div className='Deck'>
                            {player2Deck.map((item, i) => (
                                <div
                                key={i}
                                className='Card'
                                alt = "lol"
                                onClick={() => onCardPlayedHandler(item)}
                                style = {{backgroundColor: (i % 2 === 0 ? '#272950' : '#A83DA7')}}

                                >
                                    {item}
                                </div>
                                
                            ))}
                            </div>
            </>}
            
            {currentUser !== turn && currentUser === Max - 2  && <>   
            {/* <p className='playerDeckText'>{username}</p> */}
            <div className='Deck'>
                            {player3Deck.map((item, i) => (
                                <div
                                key={i}
                                className='Card'
                                alt = "lol"
                                onClick={() => onCardPlayedHandler(item)}
                                style = {{backgroundColor: (i % 2 === 0 ? '#272950' : '#A83DA7')}}
                                >
                                    {item}
                                </div>
                                
                            ))}
                            </div>
            </>}
            { currentUser !== turn && currentUser === Max - 3 && <>   
            {/* <p className='playerDeckText'>{username}</p> */}
            <div className='Deck'>
                            {player4Deck.map((item, i) => (
                                <div
                                key={i}
                                className='Card'
                                alt = "lol"
                                onClick={() => onCardPlayedHandler(item)}
                                style = {{backgroundColor: (i % 2 === 0 ? '#272950' : '#A83DA7')}}

                                >
                                    {item}
                                </div>
                                
                            ))}
                            </div>
            
            </>}
            { currentUser !== turn && currentUser === Max - 4  && <>   
            {/* <p className='playerDeckText'>{username}</p> */}
            <div className='Deck'>
                            {player5Deck.map((item, i) => (
                                <div
                                key={i}
                                className='Card'
                                alt = "lol"
                                onClick={() => onCardPlayedHandler(item)}
                                style = {{backgroundColor: (i % 2 === 0 ? '#272950' : '#A83DA7')}}
                                >
                                    {item}
                                </div>
                                
                            ))}
                            </div>
            </>}
            { currentUser !== turn && currentUser === Max - 5  && <>   
            {/* <p className='playerDeckText'>{username}</p> */}
            <div className='Deck'>
                            {player6Deck.map((item, i) => (
                                <div
                                key={i}
                                className='Card'
                                alt = "lol"
                                onClick={() => onCardPlayedHandler(item)}
                                style = {{backgroundColor: (i % 2 === 0 ? '#272950' : '#A83DA7')}}
                                >
                                    {item}
                                </div>
                                
                            ))}
            </div>
            </>}
            { currentUser !== turn && currentUser === Max - 6  && <>   
            {/* <p className='playerDeckText'>{username}</p> */}
            <div className='Deck'>
                            {player7Deck.map((item, i) => (
                                <div
                                key={i}
                                className='Card'
                                alt = "lol"
                                onClick={() => onCardPlayedHandler(item)}
                                style = {{backgroundColor: (i % 2 === 0 ? '#272950' : '#A83DA7')}}
                                >
                                    {item}
                                </div>
                                
                            ))}
            </div>
            </>}
            { currentUser !== turn && currentUser === Max - 7  && <>   
            {/* <p className='playerDeckText'>{username}</p> */}
            <div className='Deck'>
                            {player8Deck.map((item, i) => (
                                <div
                                key={i}
                                className='Card'
                                alt = "lol"
                                onClick={() => onCardPlayedHandler(item)}
                                style = {{backgroundColor: (i % 2 === 0 ? '#272950' : '#A83DA7')}}

                                >
                                    {item}
                                </div>
                                
                            ))}
            </div>
            </>}
        </>}
        {firstStage === false && <>
            
            {/* <div className='Seconds'>{seconds}</div> */}

            <div className = 'middleInfo'>
            <div className= 'Status'>

             <p>{users.map((item, i) => (
                    <div key ={i}>{`${item.username}: ${item.name !== turn ? 'Player' : 'Judge'} Points: ${item.points}  ${item.name === turn ? (item.ready === false ? 'not ready' : 'ready') : ''} ${item.name === currentUser ? " - You" : ""}`}</div>

                     ))}
             </p>
            </div>
                <div className='JudgeCard' style = {{"backgroundColor": `${playedCardsPile.indexOf(Cardwon) % 2  == 0? '#272950' : '#A83DA7'}`}}>{Cardwon}</div>
                <img className='MemeCard' src={require(`../assets/Memes/${currentMeme}.png`)} />
            </div>
            {currentUser === turn && <> 
            
            {currentUser != turn && <h3 className='choice'> Wait until Judge choose</h3>}
            {currentUser === turn && <h3 className='choice'> Your turn to choose best situation</h3>}
            <Button variant = 'outlined' onClick={() => ReadyHandler()}>Ready</Button> </>}

                 <p />
                 <div className='Deck'>
                {playedCardsPile.map((item, i) => (
                                // <p className='playerDeckText'>{username}</p>

                                <div
                                key={i}
                                className='Card'
                                onClick={() => onCardPlayedHandlerJudge(item)}
                                style = {{backgroundColor: (i % 2 === 0 ? '#272950' : '#A83DA7')}}

                                >
                                    {item}
                                </div>
                                
                 ))}
            </div>

        </>}
        </>
        }
    </div>
  )
}

export default Game