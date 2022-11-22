"use strict";
class Calculadora{
    constructor(){
        this.show = '';
        this.lastOp = '';
        this.lastShow = '';
        this.memoryValue = 0;
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
        }else if (value === '+' || value === '-' || value === '*' || value === '/' || this.lastShow === '%'){
            this.lastShow = value.toString();
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

    delete(){
        document.getElementsByTagName("input")[0].disabled = false;
        this.show = '';
        this.lastOp = '';
        this.lastShow = '';
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

    teclado(){
        document.addEventListener('keydown', (event) => {
            var key = Number(event.key);
            if (key >= 0 && key <=9){
                this.add(key);
            }else if (event.key === '+' || event.key == '-' || event.key == '*'|| event.key == '/'|| event.key == '%'|| event.key == '.'){
                this.add(event.key);
            }else if(event.key === 'Enter'){
                this.calc();
            }else if (event.key === 'Delete'){
                this.delete();
            }else if (event.key === 'Backspace'){
                this.ce();
            }
        })
    }
}
var calc = new Calculadora();
calc.teclado();