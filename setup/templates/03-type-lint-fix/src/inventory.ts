import { Product, ProductCatalog } from './models';

// BUG: missing return type annotation
// BUG: 'data' is implicitly 'any' (no type on parameter)
export function parseProductData(data) {
  // BUG: 'as any' cast should be properly typed
  const parsed = JSON.parse(data) as any;

  // BUG: accessing .products on possibly-null parsed without check
  return parsed.products.map((item: any) => ({
    id: item.id,
    name: item.name,
    price: Number(item.price),
    category: item.category ?? 'general',
    inStock: Boolean(item.inStock),
  }));
}

// BUG: missing return type annotation
export function buildCatalog(products: Product[]) {
  // BUG: type mismatch — creating Map<string, Product> but the type alias says Map<number, Product>
  const catalog: ProductCatalog = new Map();

  for (const product of products) {
    // BUG: product.id is string, but ProductCatalog key is number (type error)
    catalog.set(product.id, product);
  }

  return catalog;
}

// BUG: missing return type annotation
// BUG: 'let' should be 'const' (result is never reassigned)
export function findExpensiveProducts(catalog: ProductCatalog, threshold: number) {
  let result: Product[] = [];

  catalog.forEach((product) => {
    if (product.price > threshold) {
      result.push(product);
    }
  });

  return result;
}

// BUG: missing return type annotation
// BUG: incorrect union narrowing — checks for 'string' but category is always string
export function getProductsByCategory(products: Product[], category: string | number) {
  if (typeof category === 'number') {
    // This branch incorrectly tries to use category as an index
    return products[category];
  }

  // BUG: 'let' should be 'const'
  let filtered = products.filter((p) => p.category === category);
  return filtered;
}
