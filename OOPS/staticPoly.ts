// method overloading in typescript

/*
Static Polymorphism (Compile-time polymorphism) means
the same method name behaves differently based on input parameters.

In TypeScript, this is achieved using method overloading
with multiple method signatures and a single implementation.
*/

class ManualCar {
  private brand: string;
  private model: string;
  private isEngineOn: boolean;
  private currentSpeed: number;
  private currentGear: number;

  constructor(brand: string, model: string) {
    this.brand = brand;
    this.model = model;
    this.isEngineOn = false;
    this.currentSpeed = 0;
    this.currentGear = 0;
  }

  public startEngine(): void {
    this.isEngineOn = true;
    console.log(`${this.brand} ${this.model} : Engine started.`);
  }

  public stopEngine(): void {
    this.isEngineOn = false;
    this.currentSpeed = 0;
    console.log(`${this.brand} ${this.model} : Engine turned off.`);
  }

  // 🔹 Method Overloading Signatures
  public accelerate(): void;
  public accelerate(speed: number): void;

  // 🔹 Single Implementation
  public accelerate(speed?: number): void {
    if (!this.isEngineOn) {
      console.log(
        `${this.brand} ${this.model} : Cannot accelerate! Engine is off.`
      );
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
    if (this.currentSpeed < 0) {
      this.currentSpeed = 0;
    }
    console.log(
      `${this.brand} ${this.model} : Braking! Speed is now ${this.currentSpeed} km/h`
    );
  }

  public shiftGear(gear: number): void {
    this.currentGear = gear;
    console.log(`${this.brand} ${this.model} : Shifted to gear ${gear}`);
  }
}

// 🚀 Main Execution
const myharrierManualCar = new ManualCar("Suzuki", "WagonR");
myharrierManualCar.startEngine();
myharrierManualCar.accelerate();      // Calls default acceleration
myharrierManualCar.accelerate(40);    // Calls parameterized acceleration
myharrierManualCar.brake();
myharrierManualCar.stopEngine();
