import { Outlet } from "react-router-dom";
import { Box, Card } from "@mui/material";
import AppWrapper from "./AppWrapper";

const AuthWrapper = () => {
  return (
    <AppWrapper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            width: "100%",
          }}
          alt="frontpage"
          src="/frontpage.PNG"
        ></Box>
        <Card
          sx={{
            width: "700px",
            padding: "40px",
            margin: "20px",
          }}
        >
          <Outlet />
        </Card>
      </Box>
      {/* form container */}
    </AppWrapper>
  );
};

export default AuthWrapper;
