"use client";
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
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AddCart, cartAtom } from "../Components/AddCart";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

export default function Home() {
  const [data, setData] = useState();
  const [text, setText] = useState("");
  const [page, setPage] = useState(0);
  const [selectPage, setSelectPage] = useState(1);
  const router = useRouter();
  const handleChangePage = (event, value) => {
    setSelectPage(value);
    setPage(value * 10);
  };
  const handleSearch = (value) => {
    setText(value);
  };
  const [cart, setCart] = useAtom(cartAtom);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${text}&limit=10&skip=${page}`
      );
      setData(response.data);
      console.log("check", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectPage, text]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Typography variant="h2">Test</Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              sx={{ width: "80%" }}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search..."
            />
            <Button
              variant="contained"
              sx={{
                width: "19%",
                backgroundColor: "#ee4d2d",
                "&:hover": {
                  backgroundColor: "#941900",
                  border: "2px solid #ee4d2d",
                },
              }}
              onClick={() => router.push("/cartlist")}
            >{`Cart (${cart.length})`}</Button>
          </Box>
        </Grid>
        {data ? (
          data.products.map((v, i) => (
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
                    <Typography gutterBottom variant="h6" fontSize={'16px'} fontWeight={700} component="div">
                      {v.title}
                    </Typography>
                    <Typography color={"#ee4d2d"}>Price {v.price}$</Typography>
                    <Typography>stock {v.stock}EA</Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <AddCart product={v} />
                </CardActions>
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
        >
          <Pagination
            count={
              !data
                ? 0
                : selectPage * 10 <= data.total
                ? Math.ceil(data.total / 10) - 1
                : Math.ceil(data.total / 10)
            }
            page={selectPage}
            onChange={handleChangePage}
            sx={{
              "& .Mui-selected": {
                bgcolor: "#ee4d2d !important",
                color: "#FFFFFF",
                borderRadius: "17px",
                width: "35px",
                height: "23px",
                "&:hover": {
                  backgroundColor: "#941900",
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
