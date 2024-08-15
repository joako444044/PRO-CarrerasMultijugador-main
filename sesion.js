class Sesion{
    constructor(){
        this.title = createImg("./assets/title.png");
        this.input = createInput().attribute("placeholder","ingresa tu usuario");
        this.button = createButton("iniciar");
        this.message = createElement("h2");


    }

    show(){
        this.title.position(50,50);
        this.title.class("title");
        
        this.input.position(width/2 - 100,height/ 2);
        this.input.class("input");

        this.button.position(width/2 - 55,height/2 + 50);
        this.button.class("button");

        this.message.position(width / 2 - 300, height * 0.6);
        this.message.class("message");

        this.button.mousePressed(()=>{
            this.esconder();
            players++;
            obj_jugador.name = this.input.value();
            obj_jugador.id = players;
            obj_jugador.add_player();
            obj_jugador.change(players);
            obj_jugador.get_position();
        });
    }

    esconder(){
        //this.title.hide();
        this.input.hide();
        this.button.hide();
        //this.message.hide();
        this.message.html("Esperando al otro jugador...");
        

    }
    cargado(){
        this.input.hide();
        this.button.hide();
        //this.message.hide();
        this.message.hide();
        this.title.position(50,50);
        this.title.class("small");
        
    }

}