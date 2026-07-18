// method overriding


abstract class HarrierCar {
    protected car_brand: string
    protected car_model: string;
    protected isEngineOn: boolean;
    protected currentSpeed: number;

    constructor(car_brand: string, car_model: string){
        this.car_brand = car_brand;
        this.car_model = car_model;
        this.isEngineOn = false;
        this.currentSpeed = 0;
    }

    public startEngine(): void {
        this.isEngineOn = true;
        console.log(`${this.car_brand} ${this.car_model} engine started.`);
    }

    public stopEngine(): void {
        this.isEngineOn = false;
        this.currentSpeed = 0;
        console.log(`${this.car_brand} ${this.car_model} engine stopped.`);
    }


    public abstract accelerate(): void;
    public abstract brake(): void;

}


class HarrierManualCar extends HarrierCar {
    private current_Gear: number;

    constructor(car_brand: string, car_model: string){
        super(car_brand, car_model);
        this.current_Gear = 0;
    }

    public shiftGear(gear: number): void {
        if(!this.isEngineOn){
            console.log(`Cannot shift gears. The engine is off.`);
        }
        this.current_Gear = gear;
        console.log(`${this.car_brand} ${this.car_model} shifted to gear ${this.current_Gear}.`);
    }

    // overriding methods (Dynamic Polymorphism)
    public accelerate(): void {
        if(!this.isEngineOn){
            console.log(`Cannot accelerate. The engine is off.`);
            return;
        }
        this.currentSpeed += 10;
        console.log(`${this.car_brand} ${this.car_model} accelerated to ${this.currentSpeed} km/h.`);
    }

    public brake(): void {
        this.currentSpeed = Math.max(0, this.currentSpeed - 10);
        console.log(`${this.car_brand} ${this.car_model} slowed down to ${this.currentSpeed} km/h.`);
    }
}


class HarrierElectricCar extends HarrierCar {
    private batteryLevel: number;

    constructor(car_brand: string, car_model: string){
        super(car_brand, car_model);
        this.batteryLevel = 100;
    }

    public chargeBattery(): void {
        this.batteryLevel = 100;
        console.log(`${this.car_brand} ${this.car_model} battery fully charged.`);
    }

    public accelerate(): void {
        if(!this.isEngineOn){
            console.log(`Cannot accelerate. The engine is off.`);
            return;
        }

        if(this.batteryLevel <= 0){
            console.log(`Cannot accelerate. The battery is empty.`);
            return;
        }

        this.currentSpeed += 15;
        this.batteryLevel -= 5; // decrease battery level by 5% for each acceleration
        console.log(`${this.car_brand} ${this.car_model} accelerated to ${this.currentSpeed} km/h. Battery level: ${this.batteryLevel}%`);
    }

    public brake(): void {
        this.currentSpeed = Math.max(0, this.currentSpeed - 10);
        console.log(`${this.car_brand} ${this.car_model} slowed down to ${this.currentSpeed} km/h.`);
    }
}


const myHarrierManualCar = new HarrierManualCar("Toyota", "Corolla");
myHarrierManualCar.startEngine();
myHarrierManualCar.accelerate();
myHarrierManualCar.shiftGear(2);
myHarrierManualCar.brake();
myHarrierManualCar.stopEngine();


//------------------------------------------------------------------------------

const myHarrierElectricCar = new HarrierElectricCar("Tesla", "Model S");
myHarrierElectricCar.startEngine();
myHarrierElectricCar.accelerate();
myHarrierElectricCar.brake();
myHarrierElectricCar.stopEngine();
