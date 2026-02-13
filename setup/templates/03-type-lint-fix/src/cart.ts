import { Product, CartItem, calculateTotal } from './models';

// BUG: unused import 'fs'
import * as fs from 'fs';

// BUG: missing return type annotation
export function createCart() {
  // BUG: 'let' should be 'const'
  let items: CartItem[] = [];

  return {
    // BUG: missing return type annotation
    addItem(product: Product, quantity: number) {
      const existing = items.find((i) => i.product.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        items.push({ product, quantity });
      }
    },

    // BUG: missing return type annotation
    removeItem(productId: string) {
      // BUG: 'let' used but index never reassigned
      let index = items.findIndex((i) => i.product.id === productId);
      if (index !== -1) {
        items.splice(index, 1);
      }
      return index !== -1;
    },

    // BUG: missing return type annotation
    getTotal() {
      // BUG: calculateTotal expects (items, discount) but discount isn't used properly
      // passing 'as any' instead of a number
      return calculateTotal(items, 0 as any);
    },

    // BUG: missing return type annotation
    getItems() {
      return [...items];
    },

    // BUG: missing return type annotation
    // BUG: nullable access — product might be undefined if find returns nothing
    getItemQuantity(productId: string) {
      const item = items.find((i) => i.product.id === productId);
      // BUG: item could be undefined — should check before accessing .quantity
      return item.quantity;
    },

    // BUG: missing return type annotation
    clear() {
      items = [];
    },
  };
}
