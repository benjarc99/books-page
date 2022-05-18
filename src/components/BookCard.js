import * as React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { ButtonStyled } from "./Main.styled";
/* import { ButtonStyled } from "./Main.styled"; */

export default function MediaCard({ name, id, img, description, pages, btn }) {
  const navigate = useNavigate();

  const handleSeeMore = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <>
      <Grid item xs={12} sm={4} md={3} sx={{ paddingTop: "64px" }}>
        <Card>
          <CardMedia
            component="img"
            sx={{ height: "60vh", minHeight: 300 }}
            image={img}
            alt={name}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ fontSize: "18px" }}
            >
              {name.length <= 24 ? name : `${name.trim().slice(0, 24)}...`}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ minHeight: 101 }}
            >
              {description.length < 150
                ? description
                : `${description.trim().slice(0, 150)}...`}
            </Typography>
          </CardContent>
          <Typography
            sx={{ padding: 0, paddingLeft: "16px", fontWeight: "bolder" }}
            variant="body4"
            color="text.secondary"
          >
            {pages + " pages"}
          </Typography>
          <CardActions>
              <ButtonStyled onClick={() => handleSeeMore(id)}>{btn}</ButtonStyled>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}
