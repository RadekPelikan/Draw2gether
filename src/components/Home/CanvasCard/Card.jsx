import React, { useContext } from "react";
import {
  Card as CardM,
  CardContent,
  CardActionArea,
  Typography,
  Stack,
} from "@mui/material";

const Card = ({ room: { name, desc, users, locked, playerCount, maxPlayers } }) => {
  playerCount = users.length ?? 0;
  maxPlayers = maxPlayers ?? 0;
  name = name ?? "Default name";
  desc = desc ?? "No description";

  return (
    <CardM sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h5" display="inline" gutterBottom>
              {name}
            </Typography>
            {!locked ? <i className="fa-solid fa-lock fa-lg"></i> : ""}
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {desc}
          </Typography>
          <Stack
            className="card-info-wrapper"
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
          >
            <div>
              <i className="fa-solid fa-user fa-lg card-icon"></i>
              <Typography gutterBottom variant="h6">
                {`${playerCount} / ${maxPlayers}`}
              </Typography>
            </div>
          </Stack>
        </CardContent>
      </CardActionArea>
    </CardM>
  );
};

export default Card;
