// src/pages/RouteDetailsPage.tsx

import React from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { routes } from "./SelectRoutePage";

const RouteDetailsPage: React.FC = () => {
  const { routeId } = useParams<string>();
  const route = routes.find((r) => r.id === routeId);

  if (!route) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4">Route not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {route.name} Details
      </Typography>
      <List>
        {route.stations.map((station, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={station.name}
              secondary={`Timestamp: ${station.timestamp}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default RouteDetailsPage;
