import React from "react";
import { Stack } from "@mui/material";

type AppProp = {
  children: React.ReactNode;
};

const ScreensWrapper = ({ children }: AppProp) => {
  return (
    <Stack
      sx={{
        width: "100%",
        minHeight: { xs: `calc(100vh - 54px)`, md: `calc(100vh - 64px)` },
        boxSizing: "border-box",
        padding: "20px",
        marginTop: { xs: "56px", md: "64px" },
        // bgcolor:"green"
      }}
    >
      {children}
    </Stack>
  );
};

export default ScreensWrapper;
