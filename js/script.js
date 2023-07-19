const previusOperationText = document.querySelector('#previous-operation');
const currentOperationText = document.querySelector('#current-operation');
const buttons = document.querySelectorAll("#buttons-container button");


//metodo de orientacao objeto, logica de aplicacao da calculadora

class Calculator {
    constructor(previusOperationText, currentOperationText){
        this.previusOperationText = previusOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }

    // adicionando os digitos na tela
    addDigit(digit){
        //checando se no algorismo da operacao ja tem um " . "

        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return
        }
        
        this.currentOperation = digit
        this.updateScreen();
    }

    //processos da calculadora
    processOperation(operation){
          
        //check if current is empty
        if(this.currentOperationText.innerText === "" && operation !== "C"){
            //change operations = condicao para mudar de operacao
            
            if(this.previusOperationText.innerText !== ""){
                this.changeOperations(operation)
            }
            return;
        }
         
        //pegando valores importantes
        let operationValue
        const previous = +this.previusOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;


        switch(operation){
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue,operation,current, previous)
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue,operation,current, previous)
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue,operation,current, previous)
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue,operation,current, previous)
                break;
                case "DEL":
                operationValue = previous * current
                this.prossDelOperator();
                break;
                case "CE":
                    operationValue = previous * current
                    this.processClearCurrentOperation();
                    break;
                    case "C":
                    operationValue = previous * current
                    this.processClearOperation();
                    break;
                    case "=":
                    operationValue = previous * current
                    this.processEqualOperator();
                    break;
            default:
                return;
        }
    }

    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
        ){
           

        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation
        } else{
            //cheque se o valor é zero, se for, adicione ao valor atual
            //check if value is zero, if it is just add current value
            if (previous === 0){
                operationValue = current
            }

            //adicionando o valor atual como valor anterior, subindo na equaçao
            this.previusOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    changeOperations(operation){
        const mathOperations = ["*", "/", "+", "-"]
        if(!mathOperations.includes(operation)){
            return
        }
        this.previusOperationText.innerText = this.previusOperationText.innerText.slice(0,-1) + operation;
    }

    //delet the last digit
    prossDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    processClearCurrentOperation(){
        this.currentOperationText.innerText = "";
    }
    processClearOperation(){
        this.currentOperationText.innerText = "";
        this.previusOperationText.innerText = "";
    }
    processEqualOperator(){
        const operation = previusOperationText.innerText.split(" ")[1];
        this.processOperation(operation)
    }
}

const calc = new Calculator(previusOperationText, currentOperationText);




// aqui vai vir os eventos que vamos utilizar pra fazer a calc funcionar
buttons.forEach((btn) => {
    btn.addEventListener("click", (e)=>{

        const value = e.target.innerText;
        
        if(+value >= 0 || value === "."){
          calc.addDigit(value)
        }else {
            calc.processOperation(value)
        }


    });
});