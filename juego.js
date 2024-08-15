
class Juego {
    constructor() {


        this.btn_reiniciar = createImg("./assets/reset.png");
        this.btn_reiniciar.class("reiniciar");
        this.btn_reiniciar.position(width * 0.8, height * 0.1);
        this.btn_reiniciar.hide();

        this.h4_score_title = createElement("h2");
        this.h4_score_title.class("sc_title");
        this.h4_score_title.position(width * 0.1, height * 0.2);
        this.h4_score_title.html("Score Board")
        this.h4_score_title.hide();

        this.h2_score_p1 = createElement("h2");
        this.h2_score_p1.class("scs");
        this.h2_score_p1.position(width * 0.1, height * 0.3);
        this.h2_score_p1.html("12");
        this.h2_score_p1.hide();

        this.h2_score_p2 = createElement("h2");
        this.h2_score_p2.class("scs");
        this.h2_score_p2.position(width * 0.1, height * 0.4);
        this.h2_score_p2.html("12");
        this.h2_score_p2.hide();

    }

    iniciar() {
        if (gamestate == 0) {
            obj_sesion = new Sesion();
            obj_sesion.show();
            obj_jugador = new Player();
            obj_jugador.obtain();
            car1 = createSprite(width * 0.5 - 100, height - 100);
            car1.addImage("car",car1_im);
            car1.addImage("died",explosion);
            car2 = createSprite(width * 0.5 + 50, height - 100);
            car2.addImage("car",car2_im);
            car2.addImage("died",explosion);
            car1.scale = 0.1;
            car2.scale = 0.1;
            player_lis = [car1, car2];
            group_obstacle = new Group();
            var obstaclesPositions = [
                { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
                { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
                { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
                { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
                { x: width / 2, y: height - 2800, image: obstacle2Image },
                { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
                { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
                { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
                { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
                { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
                { x: width / 2, y: height - 5300, image: obstacle1Image },
                { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
            ];

            this.add_sprytes(group_obstacle, obstaclesPositions.length, obstacle1Image, 0.05, obstaclesPositions);
            group_fuel = new Group();
            group_coin = new Group();

            this.add_sprytes(group_fuel, 7, fuel, 0.02);
            this.add_sprytes(group_coin, 15, coin, 0.1);
        }
    }
    obtain() {
        Database.ref("/gamestate").on("value", (data) => {
            gamestate = data.val();

        })
    }
    change(number) {
        Database.ref("/").update({ gamestate: number });

    }
    play() {
        obj_sesion.cargado();
        this.btn_reiniciar.show();
        this.h4_score_title.show();
        this.h2_score_p2.show();
        this.h2_score_p1.show();
        Player.get_all_data();
        image(track, 0, -height * 6, width, height * 7);
        if (all_data !== undefined) {
            for (var jugador in all_data) {

                player_lis[jugador - 1].position.x = all_data[jugador].x
                player_lis[jugador - 1].position.y = all_data[jugador].y
                if (player_lis[jugador - 1].position.y < -height * 5.95 && obj_jugador.rank == 0) {
                    if (obj_jugador.id == 1) {
                        Database.ref("jugadores/2").update({ rank: 1 });
                        Database.ref("jugadores/1").update({ rank: 2 });
                    } else {
                        Database.ref("jugadores/1").update({ rank: 1 });
                        Database.ref("jugadores/2").update({ rank: 2 });
                        
                    }
                    this.show_liderboard();
                    obj_jugador.get_ranking();
                    this.trofy_alert();
                    
                    gamestate = 2;
                    this.change(gamestate);
                    obj_jugador.update_position();


                }
                if (obj_jugador.id == jugador) {
                    camera.position.y = player_lis[jugador - 1].position.y;
                    player_lis[jugador - 1].overlap(group_coin, (player, coin) => {
                        obj_jugador.score += 10;
                        coin.remove();
                    });

                }

                player_lis[jugador - 1].collide(group_obstacle,(car,obstacle)=>{
                    if (obj_jugador.live > 0){
                        obj_jugador.live -= 25;
                        if (direction == "right"){
                            obj_jugador.x -= 100
                        }else if(direction == "left"){
                            obj_jugador.x += 100
                        }else{
                            obj_jugador.y += 100
                        }
                        obj_jugador.update_position();
                    }else{
                        player_lis[jugador - 1].changeImage("died");
                        player_lis[jugador - 1].scale = 0.2;
                        obj_jugador.tank_fuel = 0;
                        
                    }
                })
                car1.collide(car2,(car,obstacle)=>{
                    if (obj_jugador.live > 0){
                        obj_jugador.live -= 25;
                        if (direction == "right"){
                            obj_jugador.x -= 100
                        }else if(direction == "left"){
                            obj_jugador.x += 100
                        }else{
                            obj_jugador.y += 100
                        }
                        obj_jugador.update_position();
                    }else{
                        player_lis[jugador - 1].changeImage("died");
                        player_lis[jugador - 1].scale = 0.2;
                        obj_jugador.tank_fuel = 0;
                        
                    }
                })
                player_lis[jugador - 1].overlap(group_fuel, (player, fuel) => {
                    obj_jugador.tank_fuel = 100;
                    fuel.remove();
                })
                
                
            }
        }
        this.btn_reiniciar.mousePressed(() => {
            Database.ref("/").update({ players: null, gamestate: null, jugadores: null });
            window.location.reload();
        })
        this.show_bars();
        
        
        drawSprites();
        this.move();
        
    }
    
    move() {
        if (obj_jugador.tank_fuel > 0) {
            if (keyDown(RIGHT_ARROW) && obj_jugador.x < width * 0.68) {
                obj_jugador.x += 10;
                direction = "right"

            } else if (keyDown(LEFT_ARROW) && obj_jugador.x > width * 0.3) {
                obj_jugador.x -= 10;
                direction = "left"
            } else if (keyDown(UP_ARROW) && obj_jugador.y > -height * 6) {
                obj_jugador.y -= 10;

            } else if (keyDown(DOWN_ARROW) && obj_jugador.y < height) {
                obj_jugador.y += 10;
            }
            obj_jugador.update_position();
            obj_jugador.tank_fuel -= 0.2;

        }
    }
    show_liderboard() {
        if (obj_jugador.rank > 0) {
            this.h2_score_p1.html(all_data[1].rank + " " + all_data[1].playerinfo + " " + all_data[1].score);
            this.h2_score_p2.html(all_data[2].rank + " " + all_data[2].playerinfo + " " + all_data[2].score);
        }
    }

    add_sprytes(group, len, img, scale, lis = []) {
        for (var i = 0; i < len; i++) {
            var x, y;
            if (lis.length > 0) {
                x = lis[i].x - 50;
                y = lis[i].y;
                img = lis[i].image;
            } else {
                x = random(width * 0.68, width * 0.3);
                y = random(-height * 6, height);
            }

            var spryte = createSprite(x, y);
            spryte.addImage(img);
            spryte.scale = scale;
            group.add(spryte)
        }
    }

    trofy_alert() {
        
        Swal.fire({
            title: "Good job!",
            text: "You got to rank" + all_data[1].rank,
            imageUrl: "./assets/cup.png",
            imageWidth:200,
            imageHeight:200
        }).then((result) => {
            if (result.isConfirmed){
            Database.ref("/").update({ players: null, gamestate: null, jugadores: null });
            window.location.reload();
            }

        });
console.log(all_data)
}
show_bars(){
    push();
    image(im_life,width*0.4,obj_jugador.y - height * 0.45,50,50);
    image(fuel,width*0.4,obj_jugador.y - height * 0.45 + 70,50,50)
    fill("white")
    rect(width*0.5,obj_jugador.y - height * 0.45,100,50);
    rect(width*0.5,obj_jugador.y - height * 0.45 + 70,100,50);
    fill("red")
    rect(width*0.5,obj_jugador.y - height * 0.45,obj_jugador.live,50);
    fill("brown");
    rect(width*0.5,obj_jugador.y - height * 0.45 + 70,obj_jugador.tank_fuel,50);
    pop();
    console.log("yes")
}
}

