"use client";
import { AddCart, cartAtom } from "@/Components/AddCart";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartList() {
  const [cart, setCart] = useAtom(cartAtom);

  const router = useRouter();

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h2">Cart List ({cart.length})</Typography>
          <Button variant='contained' onClick={() => router.back()}>Back</Button>
        </Grid>
        {cart ? (
          cart.map((v, i) => (
            <Grid
              key={i}
              item
              xs={12}
              md={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  width: "100%",
                  border: "1px solid #dbdbdb",
                  borderRadius: "8px",
                  padding: "12px",
                  gap: 2,
                }}
              >
                <Box
                  sx={{ width: "100%", height: "300px", overflow: "hidden" }}
                >
                  <Image
                    src={v.thumbnail}
                    alt="item"
                    width={400}
                    height={400}
                    layout="responsive"
                  />
                </Box>
                <Typography variant="h5"> {v.title}</Typography>
                <Typography>Price {v.price}$</Typography>
              </Box>
            </Grid>
          ))
        ) : (
          <></>
        )}

        <Grid
          item
          xs={12}
          md={12}
          sx={{ display: "flex", justifyContent: "center" }}
        ></Grid>
      </Grid>
    </Container>
  );
}
