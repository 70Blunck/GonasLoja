export class Product {
    constructor(id, title, price, image, category) {
      this.id = id;
      this.title = title;
      this.price = price;
      this.image = image;
      this.category = category;
    }
  }
  
  export class CartItem {
    constructor(product, quantity = 1) {
      this.product = product;
      this.quantity = quantity;
    }
  }
  
  export class Cart {
    constructor() {
      const stored = localStorage.getItem("carrinho");
      this.items = stored ? JSON.parse(stored).map(p => new CartItem(new Product(p.id, p.title, p.price, p.image, p.category))) : [];
    }
  
    addItem(product) {
      const existing = this.items.find(item => item.product.id === product.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push(new CartItem(product));
      }
      this.save();
    }
  
    save() {
      localStorage.setItem("carrinho", JSON.stringify(this.items.map(i => i.product)));
    }
  }
  
  export class User {
    constructor(name, email) {
      this.name = name;
      this.email = email;
    }
  }
  