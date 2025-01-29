import React, { useEffect, useState } from "react";
import { getHomeCards } from "../../../api";


import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
} from "@mui/material";

const HomeCardsDisplay = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    const response = await getHomeCards();
    setCards(response.data);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={card.id}>
            <Card sx={{ maxWidth: 345, height:250, boxShadow: 3, borderRadius: 2, mt:5}}>
              <CardMedia
                component="img"
                height="40"
                image={card.icon} // Assuming it's a valid image URL
                alt={card.heading}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.heading}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomeCardsDisplay;
