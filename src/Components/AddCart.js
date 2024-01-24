import { Button } from '@mui/material';
import { atom, useAtom } from 'jotai';

// Jotai store for cart items
export const cartAtom = atom([]);

// AddCart component
export function AddCart({ product }) {
  const [cart, setCart] = useAtom(cartAtom);

  const addToCart = () => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <Button variant='contained' onClick={addToCart}>
      Add to Cart
    </Button>
  );
}