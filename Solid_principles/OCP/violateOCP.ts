// violated 
// Product class representing any item in eCommerce.
class Product {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }
}

// 1. ShoppingCart: Only responsible for Cart related business logic.
class ShoppingCart {
  private products: Product[] = [];

  addProduct(product: Product): void {
    this.products.push(product);
  }

  getProducts(): Product[] {
    return this.products;
  }

  calculateTotal(): number {
    return this.products.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }
}

// 2. ShoppingCartPrinter: Only responsible for printing invoices
class ShoppingCartPrinter {
  private cart: ShoppingCart;

  constructor(cart: ShoppingCart) {
    this.cart = cart;
  }

  printInvoice(): void {
    console.log("Shopping Cart Invoice:");

    this.cart.getProducts().forEach((product) => {
      console.log(`${product.name} - Rs ${product.price}`);
    });

    console.log(`Total: Rs ${this.cart.calculateTotal()}`);
  }
}

// 3. ShoppingCartStorage: Only responsible for saving cart
class ShoppingCartStorage {
  private cart: ShoppingCart;

  constructor(cart: ShoppingCart) {
    this.cart = cart;
  }

  saveToSQLDatabase(): void {
    console.log("Saving shopping cart to SQL DB...");
  }

  saveToMongoDatabase(): void {
    console.log("Saving shopping cart to Mongo DB...");
  }

  saveToFile(): void {
    console.log("Saving shopping cart to File...");
  }
}

// Main
const cart = new ShoppingCart();

cart.addProduct(new Product("Laptop", 50000));
cart.addProduct(new Product("Mouse", 2000));

const printer = new ShoppingCartPrinter(cart);
printer.printInvoice();

const storage = new ShoppingCartStorage(cart);
storage.saveToSQLDatabase();


export {};