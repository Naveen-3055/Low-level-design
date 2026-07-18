// Base Car class
abstract class Car {
  protected brand: string;
  protected model: string;
  protected isEngineOn: boolean;
  protected currentSpeed: number;

  constructor(brand: string, model: string) {
    this.brand = brand;
    this.model = model;
    this.isEngineOn = false;
    this.currentSpeed = 0;
  }

  // Common methods for all cars
  public startEngine(): void {
    this.isEngineOn = true;
    console.log(`${this.brand} ${this.model} : Engine started.`);
  }

  public stopEngine(): void {
    this.isEngineOn = false;
    this.currentSpeed = 0;
    console.log(`${this.brand} ${this.model} : Engine turned off.`);
  }

  // 🔹 Overloaded abstract method signatures (STATIC polymorphism)
  public abstract accelerate(): void;
  public abstract accelerate(speed: number): void;

  // 🔹 Abstract method (DYNAMIC polymorphism)
  public abstract brake(): void;
}

// ---------------- MANUAL CAR ----------------
class BMWManualCar extends Car {
  private currentGear: number;

  constructor(brand: string, model: string) {
    super(brand, model);
    this.currentGear = 0;
  }

  public shiftGear(gear: number): void {
    this.currentGear = gear;
    console.log(`${this.brand} ${this.model} : Shifted to gear ${gear}`);
  }

  // 🔹 Overloaded method signatures
  public accelerate(): void;
  public accelerate(speed: number): void;

  // 🔹 Single implementation (IMPORTANT in TS)
  public accelerate(speed?: number): void {
    if (!this.isEngineOn) {
      console.log(`${this.brand} ${this.model} : Cannot accelerate! Engine is off.`);
      return;
    }

    if (speed !== undefined) {
      this.currentSpeed += speed;
    } else {
      this.currentSpeed += 20;
    }

    console.log(
      `${this.brand} ${this.model} : Accelerating to ${this.currentSpeed} km/h`
    );
  }

  public brake(): void {
    this.currentSpeed -= 20;
    if (this.currentSpeed < 0) this.currentSpeed = 0;
    console.log(
      `${this.brand} ${this.model} : Braking! Speed is now ${this.currentSpeed} km/h`
    );
  }
}

// ---------------- ELECTRIC CAR ----------------
class BMWElectricCar extends Car {
  private batteryLevel: number;

  constructor(brand: string, model: string) {
    super(brand, model);
    this.batteryLevel = 100;
  }

  public chargeBattery(): void {
    this.batteryLevel = 100;
    console.log(`${this.brand} ${this.model} : Battery fully charged!`);
  }

  // 🔹 Overloaded method signatures
  public accelerate(): void;
  public accelerate(speed: number): void;

  // 🔹 Single implementation
  public accelerate(speed?: number): void {
    if (!this.isEngineOn) {
      console.log(`${this.brand} ${this.model} : Cannot accelerate! Engine is off.`);
      return;
    }

    if (this.batteryLevel <= 0) {
      console.log(`${this.brand} ${this.model} : Battery dead! Cannot accelerate.`);
      return;
    }

    if (speed !== undefined) {
      this.batteryLevel -= 10 + speed;
      this.currentSpeed += speed;
    } else {
      this.batteryLevel -= 10;
      this.currentSpeed += 15;
    }

    console.log(
      `${this.brand} ${this.model} : Accelerating to ${this.currentSpeed} km/h. Battery at ${this.batteryLevel}%.`
    );
  }

  public brake(): void {
    this.currentSpeed -= 15;
    if (this.currentSpeed < 0) this.currentSpeed = 0;
    console.log(
      `${this.brand} ${this.model} : Regenerative braking! Speed is now ${this.currentSpeed} km/h. Battery at ${this.batteryLevel}%.`
    );
  }
}

// ---------------- MAIN ----------------
const myBMWManualCar: Car = new BMWManualCar("BMW", "X5");
myBMWManualCar.startEngine();
myBMWManualCar.accelerate();
myBMWManualCar.accelerate(40);
myBMWManualCar.brake();
myBMWManualCar.stopEngine();

console.log("----------------------");

const myBMWElectricCar: Car = new BMWElectricCar("BMW", "i3");
myBMWElectricCar.startEngine();
myBMWElectricCar.accelerate();
myBMWElectricCar.accelerate(30);
myBMWElectricCar.brake();
myBMWElectricCar.stopEngine();
