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
            stringPila += " "+this.pila[i]+"\n";
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

}
class CalculadoraRPNEspecializada extends CalculadoraRPN{
    constructor(){
        super();
        this.actual = 'Metros';
    }
    metros(){
        switch(this.actual){
            case 'Kilómetros':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) * Number(1000)).toFixed(3);
                this.actual = "Metros";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
            case 'Pulgadas':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) * Number(0.0254)).toFixed(3);
                this.actual = "Metros";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
            case 'Pies':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) * Number(0.3047)).toFixed(3);
                this.actual = "Metros";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
             case 'Yardas':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) * Number(0.9144)).toFixed(3);
                this.actual = "Metros";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
            default:
        }
    }

    kilometros(){
        switch(this.actual){
            case 'Metros':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) / Number(1000)).toFixed(3);
                this.actual = "Kilómetros";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
            case 'Pulgadas':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) * Number(2.54e-5)).toFixed(3);
                this.actual = "Kilómetros";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
            case 'Pies':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) * Number(0.0003047)).toFixed(3);
                this.actual = "Kilómetros";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
             case 'Yardas':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) * Number(0.0009144)).toFixed(3);
                this.actual = "Kilómetros";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
            default:
        }
    }
    pulgadas(){
        switch(this.actual){
            case 'Metros':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) * Number(39.3701)).toFixed(3);
                this.actual = "Pulgadas";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
            case 'Kilómetros':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) * Number(39370.1)).toFixed(3);
                this.actual = "Pulgadas";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
            case 'Pies':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) * Number(12)).toFixed(3);
                this.actual = "Pulgadas";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
            case 'Yardas':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) * Number(36)).toFixed(3);
                this.actual = "Pulgadas";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
            default:
        }
    }
    pies(){
        switch(this.actual){
            case 'Metros':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) * Number(3.2808)).toFixed(3);
                this.actual = "Pies";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
            case 'Kilómetros':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) * Number(3280.84)).toFixed(3);
                this.actual = "Pies";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
            case 'Pulgadas':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) * Number(0.08333337)).toFixed(3);
                this.actual = "Pies";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
            case 'Yardas':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) * Number(3)).toFixed(3);
                this.actual = "Pies";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
            default:
        }
    }
    yardas(){
        switch(this.actual){
            case 'Metros':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) * Number(1.0936122047)).toFixed(3);
                this.actual = "Yardas";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
            case 'Kilómetros':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) * Number(1093.612)).toFixed(3);
                this.actual = "Yardas";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
            case 'Pulgadas':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) * Number(0.02777775)).toFixed(3);
                this.actual = "Yardas";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
            case 'Pies':
                var value = document.getElementsByTagName('input')[0].value;
                document.getElementsByTagName('input')[0].value = (Number(value) * Number(0.333333)).toFixed(3);
                this.actual = "Yardas";
                this.show = document.getElementsByTagName('input')[0].value;
                break;
            default:
        }
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
            }else if (event.key === 'M' || event.key === 'm'){
                    this.metros();
            }else if (event.key === 'K' || event.key === 'k'){
                    this.kilometros();
            }else if (event.key === 'P' || event.key === 'p'){
                    this.pulgadas();
            }else if (event.key === 'Y' || event.key === 'y'){
                    this.yardas();
            }else if (event.key === 'I' || event.key === 'i'){
                this.pies();
        }
        })
    }

}
var calc = new CalculadoraRPNEspecializada();
calc.teclado();