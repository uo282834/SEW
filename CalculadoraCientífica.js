"use strict";
class CalculadoraBasica{
    constructor(){
        this.show = '';
        this.lastOp = '';
        this.lastShow = '';
        this.memoryValue = 0;
        this.isCalculated = false;
        this.op1 = '';
        this.op2 = '';
        this.op3 = '';
        this.cond = false;
        this.condOp = false;
    }
    calc(){
        try{
            this.operacion();
            if (this.op2 === ''){
                this.show = eval(Number(this.op1));
                this.reset();
            }else{
                this.show = eval(Number(this.op1)+this.op2+Number(this.op3));
                this.reset();
            }
        }catch(error){
            this.show = 'Error!!';
            this.paint();
            document.getElementsByTagName("input")[0].disabled = true;
        }
    }
    reset(){
            this.lastShow = '';
            this.lastOp = '';
            this.op1 = '';
            this.op2 = '';
            this.op3 = '';
            this.cond = false;
            this.condOp = false;
            this.paint();
    }
    operacion(){
        if(this.show.charAt(0) === '-'){
            this.op1 += this.show.charAt(0);
            this.show = this.show.slice(1);
        }
        for (var i = 0; i < this.show.length; i++){
            if (this.show.charAt(i) != '+' && this.show.charAt(i) != '-' && this.show.charAt(i) != '*' && this.show.charAt(i) != '/' && this.show.charAt(i) != '%' && !this.condOp){
                this.op1 += this.show.charAt(i);
            }else if((this.show.charAt(i) === '+' || this.show.charAt(i) === '-' || this.show.charAt(i) === '*' || this.show.charAt(i) === '/' || this.show.charAt(i) === '%') && !this.condOp){
                this.condOp = true;
                this.op2 = this.show.charAt(i);
            }else if (this.condOp){
                this.op3 += this.show.charAt(i);
            }
        }

    }
    mrc(){
        this.show = this.memoryValue;
        this.paint();
    }

    mplus(){
        this.memoryValue = this.memoryValue + eval(Number(this.show));
    }

    mminus(){
        this.memoryValue = this.memoryValue - eval(Number(this.show));
    }
    
    add(value){
        if ( this.show === 'NaN' || this.show === 'Error' || this.show === 'Infinity'){
            this.show = '';
        }
        if (this.lastShow === '+' || this.lastShow === '-' || this.lastShow === '*' || this.lastShow === '/' || this.lastShow === '%'){
            this.lastShow = value.toString();
            this.lastOp = this.show;
            this.show = this.show + value.toString();
            this.paintlastShow();
        }else if (value === '+' || value === '-' || value === '*' || value === '/' || value === '%'){
            this.isCalculated = false;
            this.lastShow = value.toString();
            this.lastOp = this.show;
            this.show = this.show + value.toString();
            this.paintlastShow();
        }else{
            if (this.isCalculated){
                this.delete();
                this.lastShow = this.lastShow+ value.toString();
                this.lastOp = this.show;
                this.show = this.show + value.toString();
                this.paintlastShow();
            }else{
                this.lastShow = this.lastShow+ value.toString();
                this.lastOp = this.show;
                this.show = this.show + value.toString();
                this.paintlastShow();
            }
        }
    }

    delete(){
        this.show = '';
        this.lastOp = '';
        this.lastShow = '';
        this.isCalculated = false;
        this.paint();
    }
    ce(){
        if ( this.show === 'NaN' || this.show === 'Error' || this.show === 'Infinity' || this.show === 'Error!!'){
            this.delete();
        }else{
            this.show = this.show.substring(0, this.show.length -1);
            this.lastShow = this.lastShow.substring(0, this.lastShow.length -1);
            this.paint();
        }
    }
    sqrt(){
        this.show = Math.sqrt(this.show);
        this.paint();
    }
    masmenos(){
        this.lastOp = this.show;
        this.show = eval(Number(this.show*-1))
        //this.lastShow = eval(this.lastShow*-1);
        //this.show = this.lastOp + this.lastShow;
        this.paint();
    }
    paint(){
        document.getElementsByTagName("input")[0].value = this.show;
    }
    paintlastShow(){
        document.getElementsByTagName("input")[0].value = this.lastShow;
    }
}
"use strict";
class CalculadoraCientifica extends CalculadoraBasica{
    constructor(){
        super();
        this.shiftP = false;
        this.hypP = false;
        this.feP = false;
    }
    abs(){
        this.calc();
        this.show = Math.abs(Number(this.show));
        this.paint();
    }
    log(){
        this.calc();
        this.show = Math.log(Number(this.show));
        this.paint();
    }
    sin(){
        if (document.getElementsByName("sin")[0].value === "sin"){
            this.calc();
            this.show= Math.sin(this.show);
            this.paint(); 
        }
        if (document.getElementsByName("sin")[0].value === "arcsin"){
            this.calc();
            this.show= Math.asinh(this.show);
            this.paint(); 
        }
        if (document.getElementsByName("sin")[0].value === "arcsinh"){
            this.calc();
            this.show= Math.asinh(this.show);
            this.paint(); 
        }
    }

    cos(){
        if (document.getElementsByName("cos")[0].value === "cos"){
            this.calc();
            this.show= Math.cos(this.show);
            this.paint(); 
        }
        if (document.getElementsByName("cos")[0].value === "arccos"){
            this.calc();
            this.show= Math.acos(this.show);
            this.paint(); 
        }
        if (document.getElementsByName("cos")[0].value === "arccosh"){
            this.calc();
            this.show= Math.acosh(this.show);
            this.paint(); 
        }
    }

    tan(){
        if (document.getElementsByName("tan")[0].value === "tan"){
            this.calc();
            this.show= Math.tan(this.show);
            this.paint(); 
        }
        if (document.getElementsByName("tan")[0].value === "arctan"){
            this.calc();
            this.show= Math.atan(this.show);
            this.paint(); 
        }
        if (document.getElementsByName("tan")[0].value === "arctanh"){
            this.calc();
            this.show= Math.atanh(this.show);
            this.paint(); 
        }

    }
    shift(){
        if (!this.shiftP){
            this.shiftP = true;
            document.getElementsByName("sin")[0].value = "arcsin";
            document.getElementsByName("cos")[0].value = "arccos";
            document.getElementsByName("tan")[0].value = "arctan";
        }else{
            this.shiftP = false;
            this.hypP = false;
            document.getElementsByName("sin")[0].value = "sin";
            document.getElementsByName("cos")[0].value = "cos";
            document.getElementsByName("tan")[0].value = "tan";
        }   
    }
    hyp(){
        if (this.shiftP){
            if (!this.hypP){
                this.hypP = true;
                document.getElementsByName("sin")[0].value = "arcsinh";
                document.getElementsByName("cos")[0].value = "arccosh";
                document.getElementsByName("tan")[0].value = "arctanh";
            }else{
                this.hypP = false;
                document.getElementsByName("sin")[0].value = "arcsin";
                document.getElementsByName("cos")[0].value = "arccos";
                document.getElementsByName("tan")[0].value = "arctan";
            }
        } 
    }
    exp(value){
            this.isCalculated = false;
            this.lastShow = value.toString();
            this.lastOp = this.show;
            this.show = this.show + value.toString();
            this.paintlastShow();

    }
    expo(){
        this.calc();
        this.show = Number(eval(10**Number(this.show)));
        this.paint();
    }
    fact(){
        this.calc();
        var toFact = this.show;
        var fact = 1;
        var i;
        for ( i=1; i<=toFact; i++)
            fact *= i;
        this.show = fact;
        this.paint();
    }
    pi(){
            this.isCalculated = false;
            this.lastShow = "π";
            this.lastOp = this.show;
            this.show = this.show + Math.PI;;
            this.paintlastShow();
    }
    square(){
        this.calc();
        this.show = Number(this.show)+"**" + Number(2);
        this.calc();
        this.paint();
    }
    calc(){
        try{
            this.show = Number(eval(this.show));
            this.paint();
            this.isCalculated = true;
            this.reset();
            this.isCalculated = true;
        }catch(error){
            this.show = 'Error!!';
            this.paint();
        }
    }
    fe(){
        if (!this.feP){
            this.feP = true;
            this.calc();
            this.show = Number(this.show).toExponential();
            this.paint();
        }else{
            this.feP = false;
            this.calc();
            this.show = Number(this.show).toFixed();
            this.paint();
        }
    }
    teclado(){
        document.addEventListener('keydown', (event) => {
            var key = Number(event.key);
            if (key >= 0 && key <=9){
                this.add(key);
            }else if (event.key === '+' || event.key == '-' || event.key == '*'|| event.key == '/'|| event.key == '%'|| event.key == '.' || event.key == '(' || event.key == ')'){
                this.add(event.key);
            }else if(event.key === 'Enter'){
                this.calc();
            }else if (event.key === 'Delete'){
                this.delete();
            }else if (event.key === 'Backspace'){
                this.ce();
            }else if (event.key === 'Shift'){
                this.shift();
            }else if (event.key === 'r'){
                this.sqrt();
            }
        })
    }
}
var calc = new CalculadoraCientifica();
calc.teclado();