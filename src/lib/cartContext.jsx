import { createContext } from 'react';

// Keep the context in a stable module. This prevents Vite Fast Refresh from
// recreating it independently of an already-mounted CartProvider.
export const CartContext = createContext(null);
