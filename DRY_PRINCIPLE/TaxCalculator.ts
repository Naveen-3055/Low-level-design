interface TaxCalculator {
    calculateTax(amount: number): number;
    getRegion(): string;
}

class USTaxCalculator implements TaxCalculator {
    calculateTax(amount: number): number {
        return amount * 0.10;
    }

    getRegion(): string {
        return "US";
    }
}

class EUTaxCalculator implements TaxCalculator {
    calculateTax(amount: number): number {
        return amount * 0.20;
    }

    getRegion(): string {
        return "EU";
    }
}

class UKTaxCalculator implements TaxCalculator {
    calculateTax(amount: number): number {
        return amount * 0.15;
    }

    getRegion(): string {
        return "UK";
    }
}

class OrderProcessor {
    private taxCalculator: TaxCalculator;

    constructor(taxCalculator: TaxCalculator) {
        this.taxCalculator = taxCalculator;
    }

    processOrder(amount: number): void {
        const tax = this.taxCalculator.calculateTax(amount);
        const total = amount + tax;
        console.log(`${this.taxCalculator.getRegion()} Order - Subtotal: $${amount.toFixed(2)}, Tax: $${tax.toFixed(2)}, Total: $${total.toFixed(2)}`);
    }
}

const usProcessor = new OrderProcessor(new USTaxCalculator());
usProcessor.processOrder(100.0);

const euProcessor = new OrderProcessor(new EUTaxCalculator());
euProcessor.processOrder(100.0);

const ukProcessor = new OrderProcessor(new UKTaxCalculator());
ukProcessor.processOrder(100.0);