class Product {
  constructor(
    public name: string,
    public price: number
  ) {}
}

// 1. ShoppingCart: Only responsible for cart business logic
class ShoppingCart {
  private products: Product[] = [];

  addProduct(product: Product): void {
    this.products.push(product);
  }

  getProducts(): Product[] {
    return this.products;
  }

  // Calculates total price in cart
  calculateTotal(): number {
    return this.products.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }
}

// 2. ShoppingCartPrinter: Only responsible for printing invoices
class ShoppingCartPrinter {
  constructor(private cart: ShoppingCart) {}

  printInvoice(): void {
    console.log("Shopping Cart Invoice:");

    this.cart.getProducts().forEach((product) => {
      console.log(`${product.name} - Rs ${product.price}`);
    });

    console.log(`Total: Rs ${this.cart.calculateTotal()}`);
  }
}

// 3. ShoppingCartStorage: Only responsible for saving cart to DB
class ShoppingCartStorage {
  constructor(private cart: ShoppingCart) {}

  saveToDatabase(): void {
    console.log("Saving shopping cart to database...");
  }
}

// Main
const cart = new ShoppingCart();

cart.addProduct(new Product("Laptop", 50000));
cart.addProduct(new Product("Mouse", 2000));

const printer = new ShoppingCartPrinter(cart);
printer.printInvoice();

const db = new ShoppingCartStorage(cart);
db.saveToDatabase();



// voilating the SRP
class ViolatingProduct {
  constructor(
    public name: string,
    public price: number
  ) {}
}

// Violating SRP: ShoppingCart is handling multiple responsibilities
class VShoppingCart {
  private products: ViolatingProduct[] = [];

  addProduct(product: ViolatingProduct): void {
    this.products.push(product);
  }

  getProducts(): ViolatingProduct[] {
    return this.products;
  }

  // 1. Calculates total price in cart
  calculateTotal(): number {
    return this.products.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }

  // 2. Violating SRP - Printing logic inside cart class
  printInvoice(): void {
    console.log("Shopping Cart Invoice:");

    this.products.forEach((product) => {
      console.log(`${product.name} - Rs ${product.price}`);
    });

    console.log(`Total: Rs ${this.calculateTotal()}`);
  }

  // 3. Violating SRP - Database logic inside cart class
  saveToDatabase(): void {
    console.log("Saving shopping cart to database...");
  }
}

// Main
const Vcart = new VShoppingCart();

Vcart.addProduct(new ViolatingProduct("Laptop", 50000));
Vcart.addProduct(new ViolatingProduct("Mouse", 2000));

Vcart.printInvoice();
Vcart.saveToDatabase();