"use strict";
class PilaLIFO { 
    constructor (nombre){ 
        this.nombre = nombre;
        this.pila = new Array();
    }
    apilar(valor){
        this.pila.push(valor);
    }
    desapilar(){
        return (this.pila.pop());
    }
    mostrar(){
        var stringPila = "";
        for (var i in this.pila) 
            stringPila += " "+this.pila[i]+"\n"+"---------------------------------------------------------"+"\n";
        return stringPila;
    }
    count(){
        return this.pila.length;
    }

    removeAll(){
        this.pila = new Array();
    }
}
class CalculadoraRPN{
    constructor(){
        this.show='';
        this.pila = new PilaLIFO('calculadora');
        this.shiftP = false;
    }

    add(value){
        this.show += value;
        document.getElementsByTagName('input')[0].value = this.show;
    }

    push(){
        if ( this.show != '' ){
            this.pila.apilar(this.show);
            this.delete();
            this.print();
        }
    }

    calc(value){
        if ( this.pila.count() >= 2 ){
            var toEvaluate = parseFloat(this.pila.desapilar());
            switch(value){
                case "+":
                    toEvaluate = toEvaluate + parseFloat(this.pila.desapilar());
                    break;
                case "-":
                    toEvaluate = parseFloat(this.pila.desapilar()) - toEvaluate;
                    break;
                case "*":
                    toEvaluate = toEvaluate * parseFloat(this.pila.desapilar());
                    break;
                case "/":
                    toEvaluate = parseFloat(this.pila.desapilar()) / toEvaluate ;
                    break;
                case "**":
                    toEvaluate = toEvaluate ** parseFloat(this.pila.desapilar());
                    break;
            }      
            this.pila.apilar(toEvaluate);
            this.print(); 
        }    
    }

    print(){
        document.getElementsByTagName('textarea')[0].value = this.pila.mostrar();

    }

    ce(){
        if ( this.show === 'NaN' || this.show === 'Error' || this.show === 'Infinity' || this.show === 'Error!!'){
            this.delete();
        }else{
            this.show = this.show.substring(0, this.show.length -1);
            document.getElementsByTagName('input')[0].value = this.show;
        }
    }
    delete(){
        this.show = '';
        document.getElementsByTagName('input')[0].value = this.show;
    }

    deleteAll(){
        this.delete();
        this.pila.removeAll();
        this.print();
    }

    sqrt(){
        var number = this.pila.desapilar();
        this.pila.apilar(Math.sqrt(number));
        this.delete(); 
        this.print();
    }

    log(){
        var number = this.pila.desapilar();
        this.pila.apilar(Math.log(number));
        this.delete(); 
        this.print();
    }

    sin(){
        if (this.shiftP){
            var number = this.pila.desapilar();
            this.pila.apilar(Math.asin(number));
            this.delete(); 
            this.print();
        }else{
            var number = this.pila.desapilar();
            this.pila.apilar(Math.sin(number));
            this.delete(); 
            this.print();
        }
    }

    cos(){
        if (this.shiftP){
            var number = this.pila.desapilar();
            this.pila.apilar(Math.acos(number));
            this.delete(); 
            this.print();
        }else{
            var number = this.pila.desapilar();
            this.pila.apilar(Math.cos(number));
            this.delete(); 
            this.print();
        }
    }

    tan(){
        if (this.shiftP){
            var number = this.pila.desapilar();
            this.pila.apilar(Math.atan(number));
            this.delete(); 
            this.print();
        }else{
            var number = this.pila.desapilar();
            this.pila.apilar(Math.tan(number));
            this.delete(); 
            this.print();
        }
    }

    shift(){
        if (!this.shiftP){
            this.shiftP = true;
            document.getElementsByName("sin")[0].value = "arcsin";
            document.getElementsByName("cos")[0].value = "arcos";
            document.getElementsByName("tan")[0].value = "arctan";
        }else{
            this.shiftP = false;
            document.getElementsByName("sin")[0].value = "sin";
            document.getElementsByName("cos")[0].value = "cos";
            document.getElementsByName("tan")[0].value = "tan";
        }
    }

    fact(){
        var number = this.pila.desapilar();
        var fact = 1;
        var i;
        for ( i=1; i<=number; i++)
            fact *= i;
        this.pila.apilar(fact);
        this.delete(); 
        this.print();
    }
    teclado(){
        document.addEventListener('keydown', (event) => {
            var key = Number(event.key);
            if (key >= 0 && key <=9){
                this.add(key);
            }else if (event.key === '+' || event.key == '-' || event.key == '*'|| event.key == '/'){
                this.calc(event.key);
            }else if (event.key === '.'){
                this.add('.');
            }else if(event.key === 'Enter'){
                this.push();
            }else if (event.key === 'Delete'){
                this.deleteAll();
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

var calc = new CalculadoraRPN()
calc.teclado();