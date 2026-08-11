/*
Definition

Abstraction means hiding unnecessary implementation details and exposing only the essential functionality to the user.

Think of it as:

Show "what" an object can do, not "how" it does it.
*/
interface Car {
    startEngine(): void;
    stopEngine(): void;
    accelerate(): void;
    brake(): void;
    shiftGear(gear: number): void;
}

class sportsCar implements Car {
    protected brand: string;
    protected model: string;
    protected isEngineOn: boolean;
    protected currentSpeed: number;
    protected currentGear: number;

    constructor(brand: string, model: string) {
        this.brand = brand;
        this.model = model;
        this.isEngineOn = false;
        this.currentSpeed = 0;
        this.currentGear = 0;
    }

    startEngine(): void {
        this.isEngineOn = true;
        console.log(`${this.brand} ${this.model} engine started.`);
    }

    shiftGear(gear: number): void {
        if(!this.isEngineOn){
            console.log(`Cannot shift gears. The engine is off.`);
        }
        this.currentGear = gear;
        console.log(`${this.brand} ${this.model} shifted to gear ${this.currentGear}.`);
    }

    accelerate(): void {
        if(this.isEngineOn){
            this.currentSpeed += 10;
            console.log(`${this.brand} ${this.model} accelerated to ${this.currentSpeed} km/h.`);
        }
    }

    brake(): void {
        this.currentSpeed = Math.max(0, this.currentSpeed - 10);
        console.log(`${this.brand} ${this.model} slowed down to ${this.currentSpeed} km/h.`);
    }

    stopEngine(): void {
        this.isEngineOn = false;
        this.currentGear=0;
        this.currentSpeed=0;
        console.log(`${this.brand} ${this.model} engine stopped.`);
    }
}


const myCar: Car = new sportsCar("BMW", "M2");
myCar.startEngine();
myCar.shiftGear(1);
myCar.accelerate();
myCar.accelerate();
myCar.shiftGear(2);
myCar.brake();
myCar.stopEngine();

export {};