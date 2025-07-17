const SweetShop = require('../src/SweetShop');

describe('SweetShop', () => {
  it('should add a new sweet to the shop', () => {
    const shop = new SweetShop();
    const sweet = { id: 1, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 };
    shop.addSweet(sweet);
    expect(shop.getAllSweets()).toEqual([sweet]);
  });

  it('should delete a sweet by id', () => {
    const shop = new SweetShop();
    const sweet1 = { id: 1, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 };
    const sweet2 = { id: 2, name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 15 };
    shop.addSweet(sweet1);
    shop.addSweet(sweet2);

    shop.deleteSweet(1); // Delete sweet with id 1

    expect(shop.getAllSweets()).toEqual([sweet2]);
  });

  it('should search sweets by name (case-insensitive, partial match)', () => {
    const shop = new SweetShop();
    shop.addSweet({ id: 1, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 });
    shop.addSweet({ id: 2, name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 15 });
    shop.addSweet({ id: 3, name: 'Gajar Halwa', category: 'Vegetable-Based', price: 40, quantity: 10 });

    const results = shop.searchByName('gulab');
    expect(results).toEqual([
      { id: 2, name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 15 }
    ]);
  });

  it('should search sweets by category (case-insensitive)', () => {
    const shop = new SweetShop();
    shop.addSweet({ id: 1, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 });
    shop.addSweet({ id: 2, name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 15 });
    shop.addSweet({ id: 3, name: 'Gajar Halwa', category: 'Vegetable-Based', price: 40, quantity: 10 });

    const results = shop.searchByCategory('milk-based');
    expect(results).toEqual([
      { id: 2, name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 15 }
    ]);
  });

  it('should search sweets by price range', () => {
    const shop = new SweetShop();
    shop.addSweet({ id: 1, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 });
    shop.addSweet({ id: 2, name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 15 });
    shop.addSweet({ id: 3, name: 'Gajar Halwa', category: 'Vegetable-Based', price: 40, quantity: 10 });

    const results = shop.searchByPriceRange(30, 45);
    expect(results).toEqual([
      { id: 2, name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 15 },
      { id: 3, name: 'Gajar Halwa', category: 'Vegetable-Based', price: 40, quantity: 10 }
    ]);
  });

  it('should sort sweets by name ascending', () => {
    const shop = new SweetShop();
    shop.addSweet({ id: 1, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 });
    shop.addSweet({ id: 2, name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 15 });
    shop.addSweet({ id: 3, name: 'Gajar Halwa', category: 'Vegetable-Based', price: 40, quantity: 10 });

    const results = shop.sortSweets('name', 'asc');
    expect(results.map(s => s.name)).toEqual(['Gajar Halwa', 'Gulab Jamun', 'Kaju Katli']);
  });

  it('should sort sweets by price descending', () => {
    const shop = new SweetShop();
    shop.addSweet({ id: 1, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 });
    shop.addSweet({ id: 2, name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 15 });
    shop.addSweet({ id: 3, name: 'Gajar Halwa', category: 'Vegetable-Based', price: 40, quantity: 10 });

    const results = shop.sortSweets('price', 'desc');
    expect(results.map(s => s.price)).toEqual([50, 40, 30]);
  });

  it('should sort sweets by category ascending', () => {
    const shop = new SweetShop();
    shop.addSweet({ id: 1, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 20 });
    shop.addSweet({ id: 2, name: 'Gulab Jamun', category: 'Milk-Based', price: 30, quantity: 15 });
    shop.addSweet({ id: 3, name: 'Gajar Halwa', category: 'Vegetable-Based', price: 40, quantity: 10 });

    const results = shop.sortSweets('category', 'asc');
    expect(results.map(s => s.category)).toEqual(['Milk-Based', 'Nut-Based', 'Vegetable-Based']);
  });

  it('should decrease quantity when a sweet is purchased', () => {
    const shop = new SweetShop();
    shop.addSweet({ id: 1, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 10 });

    shop.purchaseSweet(1, 3); // Purchase 3 units

    expect(shop.getAllSweets()[0].quantity).toBe(7);
  });

  it('should not allow purchase if not enough stock', () => {
    const shop = new SweetShop();
    shop.addSweet({ id: 1, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 2 });

    expect(() => shop.purchaseSweet(1, 5)).toThrow('Not enough stock');
  });

  it('should increase quantity when a sweet is restocked', () => {
    const shop = new SweetShop();
    shop.addSweet({ id: 1, name: 'Kaju Katli', category: 'Nut-Based', price: 50, quantity: 5 });

    shop.restockSweet(1, 10); // Restock 10 units

    expect(shop.getAllSweets()[0].quantity).toBe(15);
  });

  it('should throw an error if trying to restock a non-existent sweet', () => {
    const shop = new SweetShop();
    expect(() => shop.restockSweet(99, 5)).toThrow('Sweet not found');
  });
});
