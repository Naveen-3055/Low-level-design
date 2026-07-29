// followed ocp
// Product class representing any item in eCommerce.
class Product {
  constructor(
    public name: string,
    public price: number
  ) {}
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

  // Calculates total price in cart.
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

// Persistence interface
interface Persistence {
  save(cart: ShoppingCart): void;
}

// SQL Persistence
class SQLPersistence implements Persistence {
  save(cart: ShoppingCart): void {
    console.log("Saving shopping cart to SQL DB...");
  }
}

// Mongo Persistence
class MongoPersistence implements Persistence {
  save(cart: ShoppingCart): void {
    console.log("Saving shopping cart to MongoDB...");
  }
}

// File Persistence
class FilePersistence implements Persistence {
  save(cart: ShoppingCart): void {
    console.log("Saving shopping cart to a file...");
  }
}

// Main
const cart = new ShoppingCart();

cart.addProduct(new Product("Laptop", 50000));
cart.addProduct(new Product("Mouse", 2000));

const printer = new ShoppingCartPrinter(cart);
printer.printInvoice();

const db: Persistence = new SQLPersistence();
const mongo: Persistence = new MongoPersistence();
const file: Persistence = new FilePersistence();

db.save(cart);     // Save to SQL database
mongo.save(cart); // Save to MongoDB
file.save(cart);  // Save to File

export { Product, ShoppingCart, ShoppingCartPrinter, Persistence, SQLPersistence, MongoPersistence, FilePersistence };