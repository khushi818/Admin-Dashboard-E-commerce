import React from "react";
import { Stack } from "@mui/material";

type AppProp = {
  children: React.ReactNode;
};

const AppWrapper = ({ children }: AppProp) => {
  return (
    <Stack
      sx={{
        width: "100%",
        maxWidth: "1440px",
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </Stack>
  );
};

export default AppWrapper;
