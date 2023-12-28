let numberSelected = null;
let tileSelected = null;

let errors = 0;

let board = [
  "--74916-5",
  "2---6-3-9",
  "-----7-1-",
  "-586----4",
  "--3----9-",
  "--62--187",
  "9-4-7---2",
  "67-83----",
  "81--45---"
]

var solution = [
  "387491625",
  "241568379",
  "569327418",
  "758619234",
  "123784596",
  "496253187",
  "934176852",
  "675832941",
  "812945763"
]

window.onload = function() {
  setGame();
}

function setGame() {
  //make the digits 1-9 
  for(let i = 0; i<=9; i++) {
    let number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.addEventListener("click", selectNumber)
    number.classList.add("num");
    document.getElementById("numbers").appendChild(number);
  }
  //create the tiles and add them to the board
  for(let r = 0; r < 9; r++) {
    for(let c = 0; c < 9; c++){
      let tile = document.createElement("div");
      tile.id = r.toString()+"-"+c.toString();
      if(board[r][c] != "-") {
        tile.innerHTML = board[r][c];
        tile.classList.add("tile-start")
      }
      if(r == 2 || r == 5){
        tile.classList.add("horizental-line")
      }
      if(c == 2 || c == 5) {
        tile.classList.add("vertical-line")
      }
      tile.addEventListener("click", selectTile)
      tile.classList.add("tile");
      document.getElementById("board").append(tile);

    }
  }

}
function selectNumber(){
  if (numberSelected != null) {
      numberSelected.classList.remove("number-selected");
  }
  numberSelected = this;
  numberSelected.classList.add("number-selected");
}

function selectTile() {
  if(numberSelected) {
    if(this.innerText != "") {
      return;
    }

    //"0-0" "0-1" ... "3-3"
    let cords = this.id.split("-");//["0","0"]
    let r = parseInt(cords[0]);
    let c = parseInt(cords[1]);

    if(solution[r][c] == numberSelected.id){
      this.innerText = numberSelected.id;
    }else{
      errors += 1;
      document.getElementById("errors").innerText = errors;
    }

  }
}