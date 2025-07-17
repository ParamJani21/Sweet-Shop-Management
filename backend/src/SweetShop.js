class SweetShop {
  constructor() {
    this.sweets = [];
  }

  addSweet(sweet) {
    this.sweets.push(sweet);
  }

  getAllSweets() {
    return this.sweets;
  }

  deleteSweet(id) {
    this.sweets = this.sweets.filter(sweet => sweet.id !== id); //I used filter to remove the sweet with the given id...! 
    //filter returns a new array with all elements that pass the test implemented by the provided function...!
  }

  searchByName(name) {
    const lowerName = name.toLowerCase();
    return this.sweets.filter(sweet =>
      sweet.name.toLowerCase().includes(lowerName)
    );
  }

  searchByCategory(category) {
    const lowerCategory = category.toLowerCase();
    return this.sweets.filter(sweet =>
      sweet.category.toLowerCase() === lowerCategory
    );
  }

  searchByPriceRange(min, max) {
    return this.sweets.filter(sweet =>
      sweet.price >= min && sweet.price <= max
    );
  }

  sortSweets(field, order = 'asc') {
    // Create a shallow copy to avoid mutating the original array
    const sorted = [...this.sweets];
    sorted.sort((a, b) => {
      let valA = a[field];
      let valB = b[field];
      // For string fields, compare case-insensitively
      if (typeof valA === 'string' && typeof valB === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }
      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }

  purchaseSweet(id, quantity) {
    const sweet = this.sweets.find(sweet => sweet.id === id);
    if (!sweet) throw new Error('Sweet not found');
    if (sweet.quantity < quantity) throw new Error('Not enough stock');
    sweet.quantity -= quantity;
  }

  restockSweet(id, quantity) {
    const sweet = this.sweets.find(sweet => sweet.id === id);
    if (!sweet) throw new Error('Sweet not found');
    sweet.quantity += quantity;
  }
}

module.exports = SweetShop;
