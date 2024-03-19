import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from '../constants/Game';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Container, Row, Col } from 'react-native-flex-grid';
import Header from './Header';
import Footer from './Footer';
import styles from '../style/style';

let board = ['dice-multiple'];

export default Gameboard = ({ navigation, route}) => {

  // const [playerName, setPlayerName] = useState('');
  const { playerName } = route.params;
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('Throw dices');
  const [bonusStatus, setBonusStatus] = useState('You are ' + BONUS_POINTS_LIMIT + ' away from the bonus');
  const [gameEndStatus, setGameEndStatus] = useState(false);
  // Are dices selected or not ?
  const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));

  //Dice spots (1, 2, 3, 4, 5, 6) for each dice
  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));

  //Are dice points selected or not?
  const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));

  const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));

  const [score, setScore] = useState(0);

  useEffect(() => {
    setBonusStatus(checkBonus());
    setScore(getScore());
  })
  

  const dicesRow = [];
  for (let dice = 0; dice < NBR_OF_DICES; dice++) {
    dicesRow.push(
      <Col key={"dice" + dice}>
      <Pressable key={"dice"+dice} 
      onPress={() => selectDice(dice)}
      >
        <MaterialCommunityIcons name={board[dice]} key={"dice" + dice} size={50} 
        color={(getDiceColor(dice))}
        ></MaterialCommunityIcons>
      </Pressable>
      </Col>
    );
  }

  const pointsRow = [];
  for (let spot = 0; spot < MAX_SPOT; spot++) {
    pointsRow.push(
      <Col key={"pointsRow" + spot}>
      <Text key={"pointsRow" + spot} style={styles.score}>
        {getSpotTotal(spot)}
      </Text>
      </Col>
    )
  }

  const pointsToSelectRow = [];
  for(let diceButton = 0; diceButton< MAX_SPOT; diceButton++){
    pointsToSelectRow.push(
      <Col key={"buttonsRow" + diceButton}>
        <Pressable key={"buttonsRow" + diceButton}
        onPress={() => selectDicePoints(diceButton)}
        >
          <MaterialCommunityIcons name={"numeric-" + (diceButton+1) + "-circle"} key={"buttonsRow" + diceButton} size={35} color={(getDicePointsColor(diceButton))}>

          </MaterialCommunityIcons>
        </Pressable>
      </Col>
    )
  }

  function getSpotTotal(i) {
    return dicePointsTotal[i];
  }

  function getDiceColor(i) {
    return selectedDices[i] ? "#eddf1c" : "#ab1a1a";
  }

  function getDicePointsColor(i) {
    return (selectedDicePoints[i] && !gameEndStatus) ? "#eddf1c" : "#ab1a1a";
  }

  function checkBonus() {
    if(+score<+BONUS_POINTS_LIMIT) {
      return('You are ' + (+BONUS_POINTS_LIMIT - +score) + ' points away from the bonus');
    } else {
      return('Bonus reached ! (' + BONUS_POINTS + ') points added');
    }
  }

  function getScore() {
    let points = [...dicePointsTotal];
    let temp = points.reduce((sum,x) => (sum+x),0);
    if(temp>=BONUS_POINTS_LIMIT) {
      temp += BONUS_POINTS;
    }
    return temp;
  }

  const selectDice = (i) => {
    if (nbrOfThrowsLeft < NBR_OF_THROWS && !gameEndStatus) {
      let dices = [...selectedDices];
      dices[i] = selectedDices[i] ? false : true;
      setSelectedDices(dices);
    } else {
      setStatus("You have to throw dices first");
    }
  }

  const throwDices = () => {
    
    if(nbrOfThrowsLeft === 0 && !gameEndStatus){
      setStatus('Select your points before next throw');
      return 1;
    } else if (gameEndStatus) {
      newGame();
    } 
    
    if(!gameEndStatus) {
      let spots = [...diceSpots];
      for (let i = 0; i < NBR_OF_DICES; i++){
        if (!selectedDices[i]) {
          let randomNumber = Math.floor(Math.random()*6+1);
          board[i] = 'dice-' + randomNumber;
          spots[i] = randomNumber;
          
        }
      }
      setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
      setDiceSpots(spots);
      setStatus('Select and throw dices again');
    }

  }

  const selectDicePoints = (i) => {
    if (nbrOfThrowsLeft === 0) {
      // let selected = [...selectedDices];
      let selectedPoints = [...selectedDicePoints];
      let points = [...dicePointsTotal];
      if (!selectedPoints[i]) {
        selectedPoints[i] = true; 
        let nbrOfDices = diceSpots.reduce((total, x) => (x === (i+1) ? total + 1 : total), 0);
        points[i] = nbrOfDices * [i+1];
        setDicePointsTotal(points);
        setSelectedDicePoints(selectedPoints);
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setSelectedDices(selectedDices.fill(false));
        if(selectedPoints.every(x => x===true)) {
          setGameEndStatus(true);
        } else {
          return points[i];
        }
      } else {
        setStatus('You already selected points for ' + (i+1));
      }
    } else {
      setStatus("Throw " + NBR_OF_THROWS + " times before setting points.");
    }
  }

  function newGame() {
    setGameEndStatus(false);
    setNbrOfThrowsLeft(NBR_OF_THROWS);
    let finalScore = getScore();
    alert("Congratulation, your score is : " + finalScore + " ! You are registered in the scoreboard");
    board=['dice-multiple'];
    setScore(0);
    setStatus("New game");
    setBonusStatus('You are ' + BONUS_POINTS_LIMIT + ' away from the bonus');
    setSelectedDicePoints(selectedDicePoints.fill(false));
    diceSpots.fill(0);
    dicePointsTotal.fill(0);
    
  }
  
  return (
    <>
    <Header />
    <View style={styles.gameboard}>
      <Container style={styles.container} fluid>
        { board[0] === 'dice-multiple' ? <MaterialCommunityIcons name='dice-multiple' size={90} color='#ab1a1a' />: <Row>{dicesRow}</Row>}
      </Container>
      <Text style={styles.gameinfo}>Throws left : {nbrOfThrowsLeft}</Text>
      <Text style={styles.gameinfo}>{status}</Text>
      <Pressable onPress={() => throwDices()} style={styles.button}>
        <Text style={styles.buttonText}>THROW DICES</Text>
      </Pressable>
      <Container fluid>
        <Row>{pointsRow}</Row>
      </Container>
      <Container fluid>
        <Row>{pointsToSelectRow}</Row>
      </Container>
      <Text style={styles.gameinfo}>Score : {score}</Text>
      <Text style={styles.gameinfo}>{bonusStatus}</Text>
      <Text style={styles.gameinfo}>Player : {playerName}</Text>
    </View>
    <Footer />
    </>
  )
}