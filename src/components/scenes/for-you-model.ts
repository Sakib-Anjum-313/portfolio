// Illustrative only: placeholder products and made-up weights that show how hybrid scoring behaves.
export const SIGNALS = ["Search", "View", "Cart", "Order", "Category"] as const;
export type Signal = (typeof SIGNALS)[number];

export const BOOST = 30;

export const PRODUCTS = [
  { id: "a", name: "Product A", shape: "circle", weights: { Search: 18, View: 4, Cart: 0, Order: 2, Category: 6 } },
  { id: "b", name: "Product B", shape: "square", boosted: true, weights: { Search: 2, View: 6, Cart: 0, Order: 0, Category: 4 } },
  { id: "c", name: "Product C", shape: "triangle", weights: { Search: 0, View: 16, Cart: 4, Order: 0, Category: 8 } },
  { id: "d", name: "Product D", shape: "diamond", weights: { Search: 4, View: 2, Cart: 22, Order: 2, Category: 2 } },
  { id: "e", name: "Product E", shape: "pill", weights: { Search: 0, View: 2, Cart: 2, Order: 24, Category: 6 } },
  { id: "f", name: "Product F", shape: "hexagon", weights: { Search: 6, View: 2, Cart: 0, Order: 0, Category: 20 } },
] as const;

type Product = (typeof PRODUCTS)[number];

export const scoreOf = (product: Product, signals: readonly Signal[], boost: boolean) =>
  signals.reduce((sum, signal) => sum + product.weights[signal], 0) + (boost && "boosted" in product ? BOOST : 0);

// Highest score first. Ties keep the fixed order, so with nothing on the feed is the same for everyone.
export const rank = (signals: readonly Signal[], boost: boolean) =>
  [...PRODUCTS].sort((a, b) => scoreOf(b, signals, boost) - scoreOf(a, signals, boost));
