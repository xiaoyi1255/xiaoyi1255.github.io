class Calculator {
  initValue: number = 0;
  constructor(value: number) {
    this.initValue = value;
  }

  add(value: number): Calculator {
    this.initValue += value;
    return this;
  }

  subtract(value: number): Calculator {
    this.initValue -= value;
    return this;
  }

  multiply(value: number): Calculator {
    this.initValue *= value;
    return this;
  }

  divide(value: number): Calculator {
    if (value === 0) {
      throw new Error('Cannot divide by zero');
    }
    this.initValue /= value;
    return this;
  }

  power(value: number): Calculator {
    this.initValue /= value;
    return this;
  }

  getResult(): number {
    return this.initValue;
  }
}