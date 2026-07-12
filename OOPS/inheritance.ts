

class Vehicle{
    protected brand: string;
    protected model: string;
    protected isEngineOn: boolean;
    protected currentSpeed: number;

    constructor(brand: string, model: string){
        this.brand = brand;
        this.model = model;
        this.isEngineOn = false;
        this.currentSpeed = 0;
    }

    // common methods for all cars
    public startEngine(): void {
        this.isEngineOn = true;
        console.log(`${this.brand} ${this.model} engine started.`);
    }
    
    public stopEngine(): void {
        this.isEngineOn = false;
        this.currentSpeed = 0;
        console.log(`${this.brand} ${this.model} engine stopped.`);
    }

    public accelerate(): void {
        if(!this.isEngineOn){
            console.log(`Cannot accelerate. The engine is off.`);
            return;
        }

        this.currentSpeed += 10;
        console.log(`${this.brand} ${this.model} accelerated to ${this.currentSpeed} km/h.`);
    }

    public brake(): void {
        this.currentSpeed = Math.max(0, this.currentSpeed - 10);
        console.log(`${this.brand} ${this.model} slowed down to ${this.currentSpeed} km/h.`);
    }

}

class manualCar extends Vehicle {
    private current_Gear: number;
    
    constructor(brand: string, model: string){
        super(brand,model);
        this.current_Gear = 0;
    }

    public shiftGear(gear: number): void {
        if(!this.isEngineOn){
            console.log(`Cannot shift gears. The engine is off.`);
            return;
        }
        this.current_Gear = gear;
        console.log(`${this.brand} ${this.model} shifted to gear ${this.current_Gear}.`);
    }
}

class ElectricCar extends Vehicle {
    private batteryLevel: number;

    constructor(brand: string, model: string){
        super(brand,model);
        this.batteryLevel = 100; // battery level in percentage
    }

    public chargeBattery(): void {
        this.batteryLevel = 100;
        console.log(`${this.brand} ${this.model} battery fully charged.`);
    }
}

const myManualCar = new manualCar("Toyota", "Corolla");
myManualCar.startEngine();
myManualCar.accelerate();
myManualCar.shiftGear(2);
myManualCar.brake();
myManualCar.stopEngine();

console.log("----------------------------------------");

const myElectricCar = new ElectricCar("Tesla", "Model S");
myElectricCar.startEngine();
myElectricCar.accelerate();
myElectricCar.chargeBattery();  
myElectricCar.brake();
myElectricCar.stopEngine();
