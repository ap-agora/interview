import { Product, CartItem, calculateTotal } from './models';

// "Fix" that's wrong — still has issues that should be unstaged
import * as fs from 'fs';

export function createCart(): object {
  let items: CartItem[] = [];

  return {
    addItem(product: Product, quantity: number): void {
      const existing = items.find((i) => i.product.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        items.push({ product, quantity });
      }
    },

    removeItem(productId: string): boolean {
      let index = items.findIndex((i) => i.product.id === productId);
      if (index !== -1) {
        items.splice(index, 1);
      }
      return index !== -1;
    },

    getTotal(): number {
      return calculateTotal(items, 0 as any);
    },

    getItems(): CartItem[] {
      return [...items];
    },

    getItemQuantity(productId: string): number {
      const item = items.find((i) => i.product.id === productId);
      return item.quantity;
    },

    clear(): void {
      items = [];
    },
  };
}
