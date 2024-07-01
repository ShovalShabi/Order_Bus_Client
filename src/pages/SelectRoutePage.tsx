// src/pages/SelectRoutePage.tsx

import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

//Hard-coded data
// src/data/routesData.ts

export interface BusStation {
  name: string;
  timestamp: string;
}

export interface BusRoute {
  id: string;
  name: string;
  stations: BusStation[];
}

export const routes: BusRoute[] = [
  {
    id: "1",
    name: "Route A",
    stations: [
      { name: "Station A1", timestamp: "08:00" },
      { name: "Station A2", timestamp: "08:15" },
      { name: "Station A3", timestamp: "08:30" },
    ],
  },
  {
    id: "2",
    name: "Route B",
    stations: [
      { name: "Station B1", timestamp: "08:05" },
      { name: "Station B2", timestamp: "08:20" },
      { name: "Station B3", timestamp: "08:35" },
    ],
  },
  // Add more routes as needed
];

const SelectRoutePage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Select Bus Route
      </Typography>
      <List>
        {routes.map((route: BusRoute) => (
          <ListItem
            button
            key={route.id}
            component={Link}
            to={`/select-route/${route.id}`}
          >
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default SelectRoutePage;
