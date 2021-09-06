const BLACK = 'black';
const WHITE = 'white';

class Game{
    constructor(){
        this.pieces=[new Piece("rookb1","A8","black","rook",),
                    new Piece("rookb2","H8","black","rook"),
                    new Piece("knightb1","B8","black","knight"),
                    new Piece("knightb2","G8","black","knight"),
                    new Piece("bisb1","C8","black","bishop"),
                    new Piece("bisb2","F8","black","bishop"),
                    new Piece("queenb","D8","black","queen"),
                    new Piece("kingb","E8","black","king"),
                    new Piece("pawnb1","A7","black","pawn"),
                    new Piece("pawnb2","B7","black","pawn"),
                    new Piece("pawnb3","C7","black","pawn"),
                    new Piece("pawnb4","D7","black","pawn"),
                    new Piece("pawnb5","E7","black","pawn"),
                    new Piece("pawnb6","F7","black","pawn"),
                    new Piece("pawnb7","G7","black","pawn"),
                    new Piece("pawnb8","H7","black","pawn"),

                    new Piece("rookw1","A1","white","rook"),
                    new Piece("rookw2","H1","white","rook"),
                    new Piece("knightw1","B1","white","knight"),
                    new Piece("knightw2","G1","white","knight"),
                    new Piece("bisw1","C1","white","bishop"),
                    new Piece("bisw2","F1","white","bishop"),
                    new Piece("queenw","D1","white","queen"),
                    new Piece("kingw","E1","white","king"),
                    new Piece("pawnw1","A2","white","pawn"),
                    new Piece("pawnw2","B2","white","pawn"),
                    new Piece("pawnw3","C2","white","pawn"),
                    new Piece("pawnw4","D2","white","pawn"),
                    new Piece("pawnw5","E2","white","pawn"),
                    new Piece("pawnw6","F2","white","pawn"),
                    new Piece("pawnw7","G2","white","pawn"),
                    new Piece("pawnw8","H2","white","pawn"),
                    ];
        this.moves=[];
        this.turn = WHITE;
        this.onMove = undefined;
        this.onReset = undefined;
        this.onCapture = undefined;
        this.onPieceDragged;
        this.onPieceDragged;
    }

    idetifyPiece(piece){
        for(let i=0;i<this.pieces.length;i++){
            if(piece == this.pieces[i].id){
                return this.pieces[i];
            } 
        }
        return null;
    }

    isEmpty(position){
        if(position.length>2){return false;}
        for(let i=0;i <this.pieces.length; i++){
            if(this.pieces[i].currentLocation == position){
                return false;
            } 
        } 
        return true; 
    }

    getPosition(position){
        for(let i=0;i<this.pieces.length;i++){
            if(position == this.pieces[i].currentLocation){
                return this.pieces[i];
            } 
        }
        return null;
    }

    canEliminate(piece,target){
        if(target.color != piece.color){
            return true;
        }
        return false;
    }

    freeDownward(piece, position){
        var newRow = parseInt(position.charAt(1));
        var col = piece.currentLocation.charAt(0);
        var currRow = parseInt(piece.currentLocation.charAt(1));

        if(position.length > 2){
            var target = this.idetifyPiece(position);
            newRow = parseInt(target.currentLocation.charAt(1));
            for(let i=currRow-1;i>newRow;i--){
                var check = (""+col+i);
                if(this.getPosition(check) != null){
                    return 0;
                } 
            }
            return 2;
        }
        for(let i=currRow-1;i>newRow;i--){
            var check = (""+col+i);
            if(this.getPosition(check) != null){
                return 0;
            } 
        }
        return 1;
    }

    freeUpward(piece, position){
        var newRow = parseInt(position.charAt(1));
        var col = piece.currentLocation.charAt(0);
        var currRow = parseInt(piece.currentLocation.charAt(1));
        
        if(position.length > 2){
            var target = this.idetifyPiece(position);
            newRow = parseInt(target.currentLocation.charAt(1));
            for(let i=newRow-1;i>currRow;i--){
                var check = (""+col+i);
                if(this.getPosition(check) != null){
                    return 0;
                } 
            }
            return 2;
        }
        
        for(let i=newRow-1;i>currRow;i--){
            var check = (""+col+i);
            if(this.getPosition(check) != null){
                return 0;
            } 
        }
        return 1;
    }

    freeRightward(piece,position){
        var newCol = position.charAt(0).codePointAt(0);
        var currCol = piece.currentLocation.charAt(0).codePointAt(0);
        var row = piece.currentLocation.charAt(1);

        if(position.length > 2){
            var target = this.idetifyPiece(position);
            newCol = target.currentLocation.charAt(0).codePointAt(0);
            for(let i=newCol-1;i>currCol;i--){
                var col = String.fromCharCode(i);
                var check = (""+col+row);
                if(this.getPosition(check) != null){
                    return 0;
                } 
            }
            return 2;
        }
        
        for(let i=newCol;i>currCol;i--){
            var col = String.fromCharCode(i);
            var check = (""+col+row);
            if(this.getPosition(check) != null){
                return 0;
            } 
        }
        return 1;
    }

    freeLeftward(piece,position){
        var newCol = position.charAt(0).codePointAt(0);
        var currCol = piece.currentLocation.charAt(0).codePointAt(0);
        var row = piece.currentLocation.charAt(1);
        if(position.length > 2){
            var target = this.idetifyPiece(position);
            newCol = target.currentLocation.charAt(0).codePointAt(0);
            for(let i=currCol-1;i>newCol;i--){
                var col = String.fromCharCode(i);
                var check = (""+col+row);
                if(this.getPosition(check) != null){
                    return 0;
                } 
            }
            return 2;
        }
        
        for(let i=currCol-1;i>newCol;i--){
            var col = String.fromCharCode(i);
            var check = (""+col+row);
            if(this.getPosition(check) != null){
                return 0;
            } 
        }
        return 1;
    }

    bishopFirstQ(piece,position){//Cuadrante 1 
        var posibilities = [];
        var currRow = parseInt(piece.currentLocation.charAt(1)); 
        var currCol = piece.currentLocation.charAt(0).codePointAt(0);
        var col = String.fromCharCode(currCol+1);
        var row = currRow+1;
        posibilities[0] = (""+col+row);
        var dif = 72-currCol;
        for (let i=1;i<dif;i++){
            var lastRow = parseInt(posibilities[i-1].charAt(1)); 
            var lastCol= posibilities[i-1].charAt(0).codePointAt(0);
            var newCol = String.fromCharCode(lastCol+1);
            var newRow = lastRow+1;
            posibilities[i] = (""+newCol+newRow);
        }
        return posibilities;
    }

    bishopSecondQ(piece){//Cuadrante 2 
        var posibilities = [];
        var currRow = parseInt(piece.currentLocation.charAt(1)); 
        var currCol = piece.currentLocation.charAt(0).codePointAt(0);
        var col = String.fromCharCode(currCol-1);
        var row = currRow+1;
        posibilities[0] = (""+col+row);
        var dif = currCol-65;
        for (let i=1;i<dif;i++){
            var lastRow = parseInt(posibilities[i-1].charAt(1)); 
            var lastCol= posibilities[i-1].charAt(0).codePointAt(0);
            var newCol = String.fromCharCode(lastCol-1);
            var newRow = lastRow+1;
            posibilities[i] = (""+newCol+newRow);
        }
        return posibilities;
    }

    bishopThirdQ(piece){//Cuadrante 3
        var posibilities = [];
        var currRow = parseInt(piece.currentLocation.charAt(1)); 
        var currCol = piece.currentLocation.charAt(0).codePointAt(0);
        var col = String.fromCharCode(currCol-1);
        var row = currRow-1;
        posibilities[0] = (""+col+row);
        var dif = currCol-65;
        for (let i=1;i<dif;i++){
            var lastRow = parseInt(posibilities[i-1].charAt(1)); 
            var lastCol= posibilities[i-1].charAt(0).codePointAt(0);
            var newCol = String.fromCharCode(lastCol-1);
            var newRow = lastRow-1;
            posibilities[i] = (""+newCol+newRow);
        }
        return posibilities;
    }

    bishopFourthQ(piece){//Cuadrante 4
        var posibilities = [];
        var currRow = parseInt(piece.currentLocation.charAt(1)); 
        var currCol = piece.currentLocation.charAt(0).codePointAt(0);
        var col = String.fromCharCode(currCol+1);
        var row = currRow-1;
        posibilities[0] = (""+col+row);
        var dif = 72-currCol;
        for (let i=1;i<dif;i++){
            var lastRow = parseInt(posibilities[i-1].charAt(1)); 
            var lastCol= posibilities[i-1].charAt(0).codePointAt(0);
            var newCol = String.fromCharCode(lastCol+1);
            var newRow = lastRow-1;
            posibilities[i] = (""+newCol+newRow);
        }
        return posibilities;
    }

    bishopPosibilities(piece,position,quadrant){
        var posibilities = [];
        switch(quadrant){
            case 1:
                posibilities = this.bishopFirstQ(piece);
            break;

            case 2:
                posibilities = this.bishopSecondQ(piece);
            break;

            case 3:
                posibilities = this.bishopThirdQ(piece);
            break;

            case 4:
                posibilities = this.bishopFourthQ(piece);
            break;
        }
        return posibilities;
    }

    canMove(position,posibilities,piece){
        if(position.length>2){
            var del = this.idetifyPiece(position);
            if(del != null){
                if(posibilities[0]==del.currentLocation){
                    return 2;
                }
                for(let i=1;i<=posibilities.length;i++){
                    if(posibilities[i]==del.currentLocation && this.isEmpty(posibilities[i-1])){
                        return 2;
                    }
                }
            }
        }
        for(let i=0;i<posibilities.length;i++){
            if(posibilities[i]==position){
                if(piece.type == "pawn"){return 0};
                for(let j=0;j<posibilities.length;j++){
                    if(posibilities[j]==position || piece.type == "knight" || piece.type == "king"){
                        return 1;
                    } else {
                        if((piece.type == "bishop" || piece.type=="queen") && !this.isEmpty(posibilities[j])){return 0;}   
                    }
                }
            }
        }
        return 0;
    }

    knightPosibilities(piece,position){
        var posibilities = [];
        var currRow = parseInt(piece.currentLocation.charAt(1)); 
        var currCol = piece.currentLocation.charAt(0).codePointAt(0);

        //Primera posibilidad
        if(currCol <= 71){
            if(currRow > 1){
                var col = String.fromCharCode(currCol+2);
                var row = currRow-1;
                posibilities.push(""+col+row);
            }    
            //Segunda opción
            if(currRow <=7){
                col = String.fromCharCode(currCol+2);
                row = currRow+1;
                posibilities.push(""+col+row);
            }
        }
        if(currRow <= 7){
            //Tercera opción
            col = String.fromCharCode(currCol+1);
            row = currRow+2;
            posibilities.push(""+col+row);

            //Cuarta opción
            col = String.fromCharCode(currCol-1);
            row = currRow+2;
            posibilities.push(""+col+row);
        }

        if(currCol >= 66){
            //Quinta opción
            
            col = String.fromCharCode(currCol-2);
            row = currRow+1;
            posibilities.push(""+col+row);
                 
            //Sexta opción
            
            col = String.fromCharCode(currCol-2);
            row = currRow-1;
            posibilities.push(""+col+row);
        }
        
        if(currRow > 2){
            //Séptima opción
            col = String.fromCharCode(currCol-1);
            row = currRow-2;
            posibilities.push(""+col+row);
            //Octava opción
            col = String.fromCharCode(currCol+1);
            row = currRow-2;
            posibilities.push(""+col+row);
        }
        return posibilities;
    }

    kingPosibilities(piece){
        var posibilities = [];
        var currRow = parseInt(piece.currentLocation.charAt(1)); 
        var currCol = piece.currentLocation.charAt(0).codePointAt(0);
        
        var col = String.fromCharCode(currCol+1);
        var row = currRow;
        posibilities.push(""+col+row);

        var col = String.fromCharCode(currCol+1);
        var row = currRow+1;
        posibilities.push(""+col+row);

        var col = String.fromCharCode(currCol);
        var row = currRow+1;
        posibilities.push(""+col+row);

        var col = String.fromCharCode(currCol-1);
        var row = currRow+1;
        posibilities.push(""+col+row);

        var col = String.fromCharCode(currCol-1);
        var row = currRow;
        posibilities.push(""+col+row);

        var col = String.fromCharCode(currCol-1);
        var row = currRow-1;
        posibilities.push(""+col+row);

        var col = String.fromCharCode(currCol);
        var row = currRow-1;
        posibilities.push(""+col+row);
            
        var col = String.fromCharCode(currCol+1);
        var row = currRow-1;
        posibilities.push(""+col+row);

        return posibilities;

    }

    verifyMovement(piece, position){
        // Indices ASCII A=65,B=66,C=67,D=68,E=69,F=70,G=71,H=72
        var newRow;
        var newCol;
        if(piece.color === this.turn){
            if(position.length > 2){
                var target = this.idetifyPiece(position);
                newRow = target.currentLocation.charAt(0).codePointAt(0);
                newCol = parseInt(target.currentLocation.charAt(1));
            } else {
                var newRow = position.charAt(0).codePointAt(0);
                var newCol = parseInt(position.charAt(1));
            }
            var currRow = piece.currentLocation.charAt(0).codePointAt(0);
            var currCol = parseInt(piece.currentLocation.charAt(1));
            switch(piece.type){
                case 'pawn':
                    if(piece.color === "black"){
                        if(currRow == newRow){
                            var pos = ""+String.fromCharCode(newRow)+(newCol+1);
                            if(piece.currentLocation === piece.initialLocation && (newCol+2 >= currCol) && this.isEmpty(pos)){
                                return 1;
                            }
                            if(newCol+1 == currCol){
                                return 1;
                            }
                        } else if(((currRow+1==newRow && newCol+1==currCol)  || (currRow-1==newRow && newCol==currCol-1))){
                            if(!this.isEmpty(position)){return 2;} else{
                                var last = this.moves[this.moves.length-1];
                                if(last.type === 'r' && last.position === position){
                                    return 1;
                                } else {
                                    return 0;
                                }
                            }
                        }   
                    } else if(piece.color === "white") {
                        if(currRow == newRow){
                            var pos = ""+String.fromCharCode(newRow)+(newCol-1);
                            if(piece.currentLocation === piece.initialLocation && (newCol-2 == currCol) && this.isEmpty(pos)){
                                return 1;
                            }
                            if(newCol-1 == currCol){
                                return 1;
                            }
                        } else if(((currRow-1==newRow && newCol-1==currCol)  || (currRow+1==newRow && newCol==currCol+1))){
                            if(!this.isEmpty(position)){return 2;}else{
                                var last = this.moves[this.moves.length-1];
                                if(last.type === 'r' && last.position === position){
                                    return 1;
                                } else {
                                    return 0;
                                }
                            }
                        }
                    }
                    
                break;
                case 'rook':
                    if(newRow == currRow){
                        if(newCol < currCol){var down = this.freeDownward(piece, position);return down;}//Se puede mover para abajo
                        else if(newCol>currCol){var up = this.freeUpward(piece, position);return up;} //Se puede mover hacia arriba
                    } else if(newCol == currCol){
                        if(newRow>currRow){var right = this.freeRightward(piece, position);return right;}//Se puede mover hacia la derecha
                        else if(newRow<currRow){var left = this.freeLeftward(piece, position);return left;}//Se puede mover hacia la izquierda
                    } else { return 0;}
                    
                break;
                case 'bishop':
                    var posibilities=[];
                    if(newCol > currCol && newRow > currRow){posibilities = this.bishopPosibilities(piece,position,1);} 
                    else if(newCol > currCol && newRow < currRow) {posibilities = this.bishopPosibilities(piece,position,2);} 
                    else {
                        if(newCol < currCol && newRow < currRow){posibilities = this.bishopPosibilities(piece,position,3);} 
                        else if(newCol < currCol && newRow > currRow){posibilities = this.bishopPosibilities(piece,position,4);}
                    }
                    if(posibilities.length>0){
                        var control = this.canMove(position,posibilities,piece)
                        return control;
                    }
                break;
                case 'knight':
                    var posibilities=[];
                    posibilities=this.knightPosibilities(piece,position);
                    if(posibilities.length>0){
                        return this.canMove(position,posibilities,piece);
                    }
                break;
    
                case 'king':
                    var posibilities=[];
                    posibilities=this.kingPosibilities(piece);
                    if(posibilities.length>0){
                        
                        return this.canMove(position,posibilities,piece);
                    }
                break;
    
                case 'queen':
                    var columnDif = Math.abs(newCol- currCol);
                    let rowDif = Math.abs(newRow - currRow);
                    if(currCol == newCol || currRow == newRow ){//Se mueve horizontalmente/verticalmente
                        if(newCol < currCol){var down = this.freeDownward(piece, position);return down;}//Se puede mover para abajo
                        else if(newCol>currCol){var up = this.freeUpward(piece, position);return up;} //Se puede mover hacia arriba
                        if(newRow>currRow){var right = this.freeRightward(piece, position);return right;}//Se puede mover hacia la derecha
                        else if(newRow<currRow){var left = this.freeLeftward(piece, position);return left;}//Se puede mover hacia la izquierda
                    }else if((columnDif - rowDif)==0) {//Se mueve diagonal
                        var posibilities=[];
                        if(newCol > currCol && newRow > currRow){posibilities = this.bishopPosibilities(piece,position,1);} 
                        else if(newCol > currCol && newRow < currRow) {posibilities = this.bishopPosibilities(piece,position,2);} 
                        else {
                            if(newCol < currCol && newRow < currRow){posibilities = this.bishopPosibilities(piece,position,3);} 
                            else if(newCol < currCol && newRow > currRow){posibilities = this.bishopPosibilities(piece,position,4);}
                        }
                        if(posibilities.length>0){
                            var control = this.canMove(position,posibilities,piece);
                            return control;
                        }
                    } else{
                        return 0;
                    }
                break;
            }
        }
        return 0;
    }

    changeTurn(){this.turn === WHITE ? this.turn=BLACK:this.turn=WHITE;}

    movePiece(position, piece){
        var newPiece = this.idetifyPiece(piece);
        var res = this.verifyMovement(newPiece,position);
        if(res == 1){
            //if(this.isEmpty(position)){
                newPiece.currentLocation = position;
                if(this.onMove != undefined){
                    this.addMoveList(piece, position,"m");
                    this.onMove(piece,position);
                    this.changeTurn(); 
                }
            //}
        }else if(res == 2 ){
            var del = this.idetifyPiece(position);
            if (this.canEliminate(newPiece,del) && del != null){
                var newPos=del.currentLocation;
                this.removePiece(del);
                this.movePiece(newPos,piece);
            }
             
        } else {
            alert("Movimiento no permitido");
        }
    }


    removePiece(piece){
        if(this.onCapture != undefined){
            this.addMoveList(piece, piece.currentLocation,"r");
            this.onCapture(piece); 
            piece.currentLocation = null;
            piece.status = 0;
        }
    }
    reset(){
        this.moves = [];
        this.onReset();
        for (let i=0;i<this.pieces.length;i++){
            this.pieces[i].currentLocation =  this.pieces[i].initialLocation;
            this.pieces[i].status = 1;
        }
    }

    addMoveList(piece, pos, type) {
        let newMove = new Move(piece,pos, type);
        this.moves.push(newMove);
    }
}
