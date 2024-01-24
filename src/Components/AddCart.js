import { Button } from "@mui/material";
import { atom, useAtom } from "jotai";

// Jotai store for cart items
export const cartAtom = atom([]);

// AddCart component
export function AddCart({ product, children }) {
  const [cart, setCart] = useAtom(cartAtom);

  const addToCart = () => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <Button
      variant="contained"
      onClick={addToCart}
      sx={{
        backgroundColor: "#ee4d2d",
        "&:hover": {
          backgroundColor: "#941900",
          border: "2px solid #ee4d2d",
        },
      }}
    >
      Add to Cart
    </Button>
  );
}
