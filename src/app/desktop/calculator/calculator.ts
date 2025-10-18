import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-calculator',
  imports: [],
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss'
})
export class Calculator {
  value1 = signal(0);
  value2 = signal(0);
  operator = signal("+");
  hasCalculated = signal(false);

  removeValue(){
    this.value1.set(0);
    this.hasCalculated.set(false);
  }

  removeExpression(){
    this.value1.set(0);
    this.value2.set(0);
    this.operator.set("+");
    this.hasCalculated.set(false);
  }

  removeLastDigit(){
    this.value1.set(Math.floor(this.value1() / 10));
  }

  addDigit(digit: number){
    this.value1.set(this.value1() * 10 + digit);
  }

  // Operations
  add(){
    this.operator.set("+");
  }

  subtract(){
    this.operator.set("-");
  }

  multiply(){
    this.operator.set("*");
  }

  divide(){
    this.operator.set("/");
  }

  modulo(){
    this.operator.set("%");
  }

  // Calculate and update result
  calcResult(){
    if(!this.hasCalculated()){
      this.value2.set(this.value1());
      this.value1.set(0);
      this.hasCalculated.set(true);
      return;
    }

    switch(this.operator()){
      case "+":
        this.value2.set(this.value2() + this.value1());
        break;
      case "-":
        this.value2.set(this.value2() - this.value1());
        break;
      case "*":
        this.value2.set(this.value2() * this.value1());
        break;
      case "/":
        this.value2.set(this.value2() / this.value1());
        break;
      case "%":
        this.value2.set(this.value2() % this.value1());
        break;
      default:
        break;
    }
    this.value1.set(0);
  }
}
