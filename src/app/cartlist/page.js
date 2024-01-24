"use client";
import { AddCart, cartAtom } from "@/Components/AddCart";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
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
          <Button
            sx={{
              backgroundColor: "#ee4d2d",
              "&:hover": {
                backgroundColor: "#941900",
                border: "2px solid #ee4d2d",
              },
            }}
            variant="contained"
            onClick={() => router.back()}
          >
            Back
          </Button>
        </Grid>
        {cart ? (
          cart.map((v, i) => (
            <Grid
              key={i}
              item
              xs={12}
              md={2.3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                sx={{
                  minWidth: "100%",
                  "&:hover": {
                    backgroundColor: "white",
                    border: "2px solid #ee4d2d",
                  },
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={v.thumbnail}
                    alt="item"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      fontSize={"16px"}
                      fontWeight={700}
                      component="div"
                    >
                      {v.title}
                    </Typography>
                    <Typography color={"#ee4d2d"}>Price {v.price}$</Typography>
                    <Typography>stock {v.stock}EA</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
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
