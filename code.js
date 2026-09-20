//variables===========================================================
var sum = 0;
var stop = true;
var aceCard = 0;
var count = 0;
var gamble1=0;
var gamble2=0;
var gamble3=0;
var gambleSum = 0;
var player1Stop=true;
var player2Stop=true;
var player3Stop=true;
var player1Sum;
var player2Sum;
var player3Sum;
var cardList = [];
var index;
var cardIndex = [];

for (var i=0; i<52; i++){
  appendItem(cardIndex, i+1);
}
for (var i = 1; i <= 7; i++) {
  hideElement("S2Card"+i);
}
//main program===================================================

//Screen changing Button Options

onEvent("S1ButtonPlay", "click", function( ) {
  setScreen("screen2Main");
}); // S1M -> S2
onEvent("S1ButtonRules", "click", function( ) {
  setScreen("screen1Rules");
}); // S1M -> S1I
onEvent("S1ButtonBack", "click", function( ) {
  setScreen("screen1Main");
}); // S1I -> S1M
onEvent("S2ButtonBack","click",function(){
  setScreen("screen1Main");
}); // S2 -> S1M
onEvent("S1ButtonInstructions", "click", function( ) {
  setScreen("screen1Instructions");
});
onEvent("S1ButtonInstructionsBack", "click", function( ) {
  setScreen("screen1Main");
});


// Player Text INPUTS
// used for gambling input
onEvent("S2ButtonGamble1", "click", function( ) {
    gamble1 = getText("S2TextInput1");
    if (gamble1>4 && gamble1<51){
      setProperty("S2TextInput1","text-color","green");
    }
    else{
      setProperty("S2TextInput1","text","ERROR");
    }
}); //used for gambling input
onEvent("S2ButtonGamble2", "click", function( ) {
    gamble2 = getText("S2TextInput2");
    if (gamble2>4 && gamble2<51){
      setProperty("S2TextInput2","text-color","green");
    }
    else{
      setProperty("S2TextInput2","text","ERROR");
    }
}); // used for gambling input
onEvent("S2ButtonGamble3", "click", function( ) { 
    gamble3 = getText("S2TextInput3");
    if (gamble3>4 && gamble3<51){
      
    }
    else{
      setProperty("S2TextInput3","text","ERROR");
    }
}); // used for gambling input

onEvent("S2ButtonSum1", "click", function( ) { 
    player1Sum = getText("S2SumInput1");
    if (player1Sum<=21){
    }
    else{
      setProperty("S2SumInput1","text","BUST!");
      player1Sum=0;
    }
});  //used for sum input
onEvent("S2ButtonSum2", "click", function( ) { 
    player2Sum = getText("S2SumInput2");
    if (player2Sum<=21){
    }
    else{
      setProperty("S2SumInput2","text","BUST!");
      player2Sum=0;
    }
}); //used for sum input
onEvent("S2ButtonSum3", "click", function( ) {
    player3Sum = getText("S2SumInput3");
    if (player3Sum<=21){
    }
    else{
      setProperty("S2SumInput3","text","BUST!!");
      player3Sum=0;
    }
}); //used for sum input
//DEALER==========================================================

//CARD GAME SYSTEM
onEvent("S2ButtonDraw", "click", function( ) {
  showElement("S2Card7");
  if (stop == false){
    setText("S2TextGoStop","STOP!");
    showElement("S2Card1");
    dealerScore();
    setText("S2TextTotalSum", "TOTAL SUM:"+sum);
  } // if computer stops drawing cards
  
  
  
  else{playSound("assets/category_board_games/card_dealing_single.mp3");
  var index = randomNumber(0,cardIndex.length-1); 
  count = count+1;
  var cardNumValue = drawNumber(index);
  var cardShapeValue = drawShape(index);
  setProperty("S2Card"+count, "image", cardNumValue+cardShapeValue+".JPG");
 
  if(count!=1){
    showElement("S2Card"+count);
  }
  appendItem(cardList, cardNumValue);
  cardList.sort();
  
  for (var i = 0; i < cardList.length; i++) {
    if (cardList[i]>10){
      cardNumValue = 10;
    }
  }
  

  removeItem(cardIndex,index);
  
  if (cardNumValue!=1){
    sum = sum + cardNumValue;
  }
  if (cardList[0]==1){
    if (sum - aceCard <11){
      sum = sum - aceCard;
      aceCard = 11;
      sum = sum + aceCard;
    }
    else{
      sum = sum - aceCard;
      aceCard = 1;
      sum = sum + aceCard;
    }
  }
  
  if (player1Sum<sum&&player1Stop==true&&gamble1>0&&sum<=21){
    gamble1 = (-1)*gamble1;
    player1Stop = false;
  }
  
  
    if (player2Sum<sum&&player2Stop==true&&gamble2>0&&sum<=21){
    gamble2 = (-1)*gamble2;
    player2Stop = false;
  }

  
    if (player3Sum<sum&&player3Stop==true&&gamble3>0&&sum<=21){
    gamble3 = (-1)*gamble3;
    player3Stop = false;
  }

  if (sum<player1Sum && sum<player2Sum && sum<player3Sum){
    stop = true;
  }
  else{

    if (sum>player1Sum && sum>player2Sum && sum>player3Sum){
      stop = false;
        if (count>2 && stop == false){
          showElement("S2Card1");
          dealerScore();
          setText("S2TextTotalSum", "TOTAL SUM:"+sum);
        }
    }
    else{if(parseInt(gamble1)+parseInt(gamble2)+parseInt(gamble3)<0){
      var GoStop1 = randomNumber(5,15);
      if ( sum > GoStop1){
      stop = false;
      if (count>2 && stop == false){
        showElement("S2Card1");
        dealerScore();
        setText("S2TextTotalSum", "TOTAL SUM:"+sum);
      }
    }
  }
    
    
  else{  if (sum <= 11){
        setText("S2TextGoStop","GO!");
        }
    if (sum > 11){
      var GoStop2 = randomNumber(11,19);
      if (GoStop2<sum){
      // setText("S2TextGoStop","Stop");
        stop = false;
    
    
      if (count>2 && stop == false){
        showElement("S2Card1");
        dealerScore();
        setText("S2TextTotalSum", "TOTAL SUM:"+sum);
        setText("S2TextGoStop","STOP!");
      }
    
    
      }
      else {
        setText("S2TextGoStop", "Go");
      }
    }}}
  
  if (sum>21){
    setText("S2TextTotalSum","BUSTED!!");
    setText("S2TextGoStop","STOP!");
  }}
  }
});
// upon clicking 'draw'...

onEvent("S2ButtonReset", "click", function( ) {
  setText("S2TextGoStop","");
  setText("S2TextTotalSum", "TOTAL SUM: ??");
  hideElement("S2Card7");
 for (var i = 1; i <= count; i++) {
    hideElement("S2Card"+i);
    setProperty("S2Card"+i,"image","assets/back.JPG");
  } 
  variableReset();
  for (var k=0; k<52; k++){
    appendItem(cardIndex, k+1);
}
  
}); //for the reset button


//function============================================================
  
function drawShape(x){
  if (cardIndex[x] >= 1 && cardIndex[x] <= 13) return "s";
  if (cardIndex[x] >= 14 && cardIndex[x] <= 26) return "h";
  if (cardIndex[x] >= 27 && cardIndex[x] <= 39) return "d";
  if (cardIndex[x] >= 40 && cardIndex[x] <= 52) return "c";
}

function drawNumber(x){
  if (cardIndex[x]%13 == 0) return 13;
  if (cardIndex[x]%13>0&&cardIndex[x]%13<14) return cardIndex[x]%13;
}

function variableReset(){
  index =[];
  cardIndex = [];
  sum = 0;
  stop = true;
  aceCard = 0;
  count = 0;
  gamble1=0;
  gamble2=0;
  gamble3=0;
  player1Stop=true;
  player2Stop=true;
  player3Stop=true;
  player1Sum;
  player2Sum;
  player3Sum;
  cardList = [];
}

function dealerScore(){
  if (parseInt(player1Sum) == sum){
    gamble1 = 0;
    console.log("equal");
  }
  if (parseInt(player2Sum) == sum){
    gamble2 = 0;
    console.log("equal");
  }
  if (parseInt(player3Sum) == sum){
    console.log("equal");
    gamble3 = 0;
  }
  gambleSum = gambleSum - parseInt(gamble1) - parseInt(gamble2) - parseInt(gamble3);
  setText("S2DealerSum", "DEALER SCORE: "+ gambleSum);
}

function blackjack(){
  for (var p = 0; p < cardList.length(); p++) {
    if (cardList[p] == 1){
      
    }
  }
}
