class Calculator {
    constructor(previousoperandText, currentoperandText) {
        this.previousoperandText = previousoperandText;
        this.currentoperandText = currentoperandText;
        this.clear();
    }

    clear() {
        this.previousoperand = "";
        this.currentoperand = "";
        this.operation = undefined;
    }

    delete() {
        this.currentoperand = this.currentoperand.toString().slice(0, -1);
    }

    appendnumber(number) {
        if (number === "." && this.currentoperand.includes(".")) return
        this.currentoperand = this.currentoperand.toString() + number.toString();
    }

    chooseoperation(operation) {
        if (this.currentoperand === "") return;
        if (this.previousoperand !== "") {
            this.compute();
        }

        this.operation = operation;
        this.previousoperand = this.currentoperand;
        this.currentoperand = "";
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousoperand)
        const current = parseFloat(this.currentoperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentoperand = computation
        this.operation = undefined
        this.previousoperand = ''
    }

    getDisplaynumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimaldigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimaldigits != null) {
            return `${integerDisplay}.${decimaldigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentoperandText.innerText = this.getDisplaynumber(this.currentoperand);
        if (this.operation != null) {
            this.previousoperandText.innerText = `${this.getDisplaynumber(this.previousoperand)} ${this.operation}`;
        } else {
            this.previousoperandText.innerText = "";
        }
    }
}


// get values
const numberBTN = document.querySelectorAll('[data-number]');
const operationBTN = document.querySelectorAll('[data-operation]');
const equalsBTN = document.querySelector('[data-equals]');
const deleteBTN = document.querySelector('[data-delete]');
const clearBTN = document.querySelector('[data-all-clear]');
const previousoperandBTN = document.querySelector('[data-previous-operand]');
const currentoperandBTN = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousoperandBTN, currentoperandBTN);

numberBTN.forEach(btn => {
    btn.addEventListener("click", () => {
        console.log("click numbers");
        calculator.appendnumber(btn.innerText);
        calculator.updateDisplay();
    })
})

operationBTN.forEach(btn => {
    btn.addEventListener("click", () => {
        console.log("click operation");
        calculator.chooseoperation(btn.innerText);
        calculator.updateDisplay();
    })
})

equalsBTN.addEventListener("click", () => {
    console.log("click equals");
    calculator.compute();
    calculator.updateDisplay();
})

deleteBTN.addEventListener("click", () => {
    console.log("click delete");
    calculator.delete();
    calculator.updateDisplay();
})

clearBTN.addEventListener("click", () => {
    console.log("click clear");
    calculator.clear();
    calculator.updateDisplay();
})