
class Piece{
    constructor(id, initialLocation, color, type){
        this.id=id;
        this.initialLocation = initialLocation;
        this.currentLocation = initialLocation;
        this.color = color;
        this.type = type;
        this.status=1;
        this.onPieceDragged = undefined;
    }

}

class Board{
    constructor(pieces,container){
        this.pieces = pieces;
        this.container = container;
        this.createTable(this.container);
        this.setPiecePositions(this.pieces);
    }

    createTable(container){
        let col = document.createElement('th');
        container.appendChild(col);
        for (let i=65;i<73;i++){
            let col = document.createElement('th');
            col.innerHTML=String.fromCharCode(i);
            container.appendChild(col);
        }



        for (let r=8;r>0;r--){
            let tr = document.createElement('tr');
            let number = document.createElement('td');
            number.innerHTML=r;
            number.classList.add("number");
            tr.appendChild(number);
            for(let c = 'A'.charCodeAt(0);c<='A'.charCodeAt(0)+7;c++){
                let td = document.createElement('td');
                td.id = String.fromCharCode(c)+r;
                tr.appendChild(td);
            }
            container.appendChild(tr);
        }
    }

    setPiecePositions(pieces){
        for(let i=0;i<pieces.length;i++){
            let cell = document.getElementById(pieces[i].initialLocation);
            let newPiece = document.createElement('i');
            newPiece.id = pieces[i].id;
            var type = "fa-chess-"+pieces[i].type;
            newPiece.classList.add("fas");
            newPiece.classList.add(pieces[i].color);
            newPiece.classList.add(type);
            newPiece.draggable=true;
            newPiece.ondragstart = function () {
                drag(event);};
            cell.appendChild(newPiece);
        }
    }

    movePiece(piece, pos) {
        let cell = document.getElementById(pos);
        var newPiece= document.getElementById(piece);
        cell.appendChild(newPiece);
        this.showMovement(this.idetifyPiece(newPiece.id));
    }

    showMovement(piece){
        var name1 = document.getElementById('alias-placeholder').innerHTML;
        var name2= document.getElementById('alias2-placeholder').innerHTML;
        var msg;
        if(piece.color == "black"){
            msg = '<p> - <b>' +name1+ '</b> ha movido <i class="fas fa-chess-'
                                        +piece.type+'"></i> a ' +piece.currentLocation+ '</p> ';
        } else {
            msg = '<p> - <b>' +name2+ '</b> ha movido <i class="fas fa-chess-'
                                        +piece.type+'"></i> a ' +piece.currentLocation+ '</p> ';
        }
        document.getElementById('movements').innerHTML+=msg;
    }

    showElimination(target){
        var name1 = document.getElementById('alias-placeholder').innerHTML;
        var name2= document.getElementById('alias2-placeholder').innerHTML;
        var msg;
        if(target.color == "black"){
            msg = '<p> - <b>' +name2+ '</b> ha eliminado <i class="fas fa-chess-'
                                        +target.type+'"></i> en ' +target.currentLocation+ '</p> ';
        } else {
            msg = '<p> - <b>' +name1+ '</b> ha eliminado <i class="fas fa-chess-'
                                        +target.type+'"></i> en ' +target.currentLocation+ '</p> ';
        }
        document.getElementById('movements').innerHTML+=msg;
    }
    
    sendToGraveyard(piece){
        var icon;
        if(piece.color == "white"){icon = '<i class="fas fa-chess-'+piece.type+' white"></i>    '; }
        else {icon = '<i class="fas fa-chess-'+piece.type+'"></i>   ';}
        document.getElementById("graveyard").innerHTML += icon;
        var a = document.getElementById(piece.id);
        a.parentNode.removeChild(a);
    }

    idetifyPiece(piece){
        for(let i=0;i<this.pieces.length;i++){
            if(piece == this.pieces[i].id){
                return this.pieces[i];
            } 
        }
        return null;
    }

    onPieceDragged(piece,pos){}

    removePiece(piece){
        var target = this.idetifyPiece(piece);
        this.sendToGraveyard(target);
        this.showElimination(target);
        alert("Ficha ["+target.type+"] eliminada");
        
    }

    clearMoves() {
        let parent = document.getElementById("movements");
        while (parent.firstChild) {
          parent.removeChild(parent.firstChild);
        }
    }

    clearBoard() {
        for(let i=0;i<this.pieces.length;i++){
            if(this.pieces[i].currentLocation){
                let cell = document.getElementById(this.pieces[i].currentLocation);
                cell.innerHTML='';
            }
            
        }
    }

    clearGraveyard(){
        document.getElementById("graveyard").innerHTML ='';
    }

    reset(){
        this.clearMoves();
        this.clearBoard();
        this.clearGraveyard();
        this.setPiecePositions(this.pieces);
    }
}


class Move {
    constructor(piece, position,type) {
        this.piece = piece;
        this.position = position;
        this.type = type;
    }
}


function getAlias(){
    var urlParams = new URLSearchParams(window.location.search);
    var alias = urlParams.get('alias');
    var placeHolder = document.getElementById("alias-placeholder");
    placeHolder.innerHTML=alias;
}

function generateName(){
    var names = ["Peranito", "Menganito", "Luisito","Juanito",
                "ChessMaster","King of this game","GOAT",
                "María","Give up","I'm the best","U lose",
                "Nicolás","Isabel","Juan Manuel","Profe"];
    var num =Math.round (Math.random()*(names.length-1));
    document.getElementById('alias2-placeholder').innerHTML = names[num];
}



