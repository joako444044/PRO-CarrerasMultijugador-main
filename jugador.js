class Player{
    constructor(){
       this.x = 0;
       this.y = 0;
       this.name = "";
       this.id  = 1;
       this.score = 0;
       this.rank = 0;
       this.tank_fuel = 100;
       this.live = 100;
    }

    add_player(){
        if (this.id == 1){
            this.x = width * 0.5 - 100;

        }else{
            this.x = width * 0.5 + 100;
        }
        Database.ref("jugadores/" + this.id).set({playerinfo:this.name, x:this.x,y:this.y, rank:this.rank,score:this.score,life:this.live});
    }
    change(number){
       Database.ref("/").update({players:players});
    }
    obtain(){
        Database.ref("/players").on("value", (data)=> {
            players = data.val();
        })
    }
    update_position(){
        Database.ref("jugadores/" + this.id).update({x:this.x,y:this.y, rank:this.rank,score:this.score,life:this.live});
    }
    get_position(){
        Database.ref("jugadores/" + this.id).on("value", (value)=>{
            this.x = value.val().x;
            this.y = value.val().y; 
        })
    }
    static get_all_data(){
        Database.ref("jugadores/").on("value",(value)=>{
            all_data = value.val();
        })
    }

    static finished_race(rank){
        Database.ref("/").update({cars_finish:rank});
    }
    get_ranking(){
        Database.ref("jugadores/" + this.id).on("value", (value)=>{
            this.rank = value.val().rank;
            
        })
    }   
}