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
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          display={{ large: "none" }}
          sx={{
            width: "200px",
          }}
          alt="frontpage"
          src="/frontpage.PNG"
        />
        <Card
          sx={{
            maxWidth: "500px",
            width: "100%",
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
