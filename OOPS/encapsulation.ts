class bmwCar {
    private brand: string;
    private model: string;
    private isEngineOn: boolean;
    private currentSpeed: number;
    private currentGear: number;

    private tyreCompany !: string; // definite assignment assertion

    constructor(brand: string, model: string){
        this.brand = brand;
        this.model = model;
        this.isEngineOn = false;
        this.currentSpeed = 0;
        this.currentGear = 0;
    }

    // set and get methods are used to access private properties of the class from outside the class.
    set setTyreCompany(tyreCompany: string){
        this.tyreCompany = tyreCompany;
    }

    get getTyreCompany() : string {
        return this.tyreCompany;
    }

    get getSpeed(): number {
        return this.currentSpeed;
    }
    get getBrand(): string{
        return this.brand;
    }

    public startEngine(): void {
        this.isEngineOn = true;
        console.log(`${this.brand} ${this.model} engine started.`);
    }

    public shiftGear(gear: number): void {
        if(!this.isEngineOn){
            console.log(`Cannot shift gears. The engine is off.`);
            return;
        }
        this.currentGear = gear;
        console.log(`${this.brand} ${this.model} shifted to gear ${this.currentGear}.`);
    }

    public accelerate(): void{
        if(this.isEngineOn){
            this.currentSpeed += 20;
            console.log(`${this.brand} ${this.model} accelerated to ${this.currentSpeed} km/h.`);
        }
    }

    public brake(): void {
        this.currentSpeed = Math.max(0, this.currentSpeed - 20);
        console.log(`${this.brand} ${this.model} slowed down to ${this.currentSpeed} km/h.`);
    }

    public stopEngine(): void {
        this.isEngineOn = false;
        this.currentGear=0;
        this.currentSpeed=0;
        console.log(`${this.brand} ${this.model} engine stopped.`);
    }
}

const Car = new bmwCar("BMW", "M2");

Car.startEngine();
Car.shiftGear(2);
Car.accelerate();
Car.accelerate();
Car.brake();
Car.stopEngine();

// access through getter 
console.log(`Tyre Company: ${Car.getTyreCompany}`); 
console.log(`Current Speed: ${Car.getSpeed} km/h`);
console.log(`Car Brand: ${Car.getBrand}`);

Car.setTyreCompany = "Michelin"; // access through setter
console.log(`Tyre Company: ${Car.getTyreCompany}`);