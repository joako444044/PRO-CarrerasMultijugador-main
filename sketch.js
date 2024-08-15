
var  obj_jugador;
var gamestate = 0;
var players = 0;
var Database;
var player_lis = [];
var track, car1, car2;
var car1_im, car2_im;
var obj_sesion;
var all_data;
var group_coin;
var group_fuel;
var group_obstacle;
var race_is_done = true;
function preload(){
    bg = loadImage("./assets/background.png");
    track = loadImage("./assets/track.jpg");
    car1_im = loadImage("./assets/car1.png");
    car2_im = loadImage("./assets/car2.png");
    obstacle2Image  = loadImage("./assets/obstacle2.png")
    obstacle1Image  = loadImage("./assets/obstacle1.png")
    fuel = loadImage("./assets/fuel.png");
    im_life = loadImage("./assets/life.png")
    coin = loadImage("./assets/goldCoin.png");
    explosion = loadImage("./assets/blast.png")
    direction = "";
}

function setup(){
    createCanvas(windowWidth,windowHeight);
    Database = firebase.database();
    obj_juego = new Juego();
    obj_juego.iniciar();
    obj_juego.obtain();
    
  
}

function draw(){
    
    image(bg,0,0,width, height);
    if (players == 2){
        obj_juego.change(1);
      
    }
    if (gamestate === 1){
        obj_juego.play();
    }
    if (gamestate == 2){
        obj_juego.show_liderboard();
    }
}



