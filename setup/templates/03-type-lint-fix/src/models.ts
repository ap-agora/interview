// BUG: unused import (EventEmitter is never used)
import { EventEmitter } from 'events';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// BUG: should be 'const' not 'let' (value never reassigned)
let TAX_RATE = 0.08;

// BUG: missing return type annotation (eslint: explicit-function-return-type)
// BUG: 'discount' parameter is unused (noUnusedParameters)
export function calculateTotal(items: CartItem[], discount: number) {
  let sum = 0;
  for (const item of items) {
    sum += item.product.price * item.quantity;
  }
  return sum * (1 + TAX_RATE);
}

// BUG: Map generic arguments swapped — should be Map<string, Product> not Map<number, Product>
// since Product.id is a string
export type ProductCatalog = Map<number, Product>;

// BUG: unused variable 'DEFAULT_CATEGORY'
const DEFAULT_CATEGORY = 'uncategorized';
