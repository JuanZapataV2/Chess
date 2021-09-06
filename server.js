const serverURL = "https://";
class Server{
    
    constructor(){
        this.key = undefined;
        this.onmove = undefined;
    }

    join(username){

        let joinPromise = new Promise(function(joinOk, joinError){
            //Realizar un XMLHttpRequest
            let joinReq = new XMLHttpRequest();

            joinReq.onload = (e) =>{
                console.log(e);
                if(e.currentTarget.status === 200){
                    let response = JSON.parse(e.currentTarget.responseText);
                    joinOk(response["color"]);
                } else {
                    joinError("Any player was found");
                }
                
            };
            joinReq.open("GET", serverURL +'/join?username='+username);
            joinReq.send();
        });
        
    }
    move(piece,position){
        
    }
    
}