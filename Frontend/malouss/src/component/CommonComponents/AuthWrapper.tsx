import { Outlet } from "react-router-dom";
import { Stack, Paper } from "@mui/material";
import AppWrapper from "./AppWrapper";

const AuthWrapper = () => {
  return (
    <AppWrapper>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{
          minHeight: "100vh",
        }}
      >
        {/* form container */}
        <Paper
          elevation={18}
          sx={{
            boxSizing: "border-box",
            borderRadius: "20px",
            width: "95%",
            maxWidth: "460px",
            bgcolor: "background.paper",
            boxShadow: 24,
            padding: { xs: "20px", sm: "30px" },
          }}
        >
          <Outlet />
          {/* form container */}
        </Paper>
      </Stack>
    </AppWrapper>
  );
};

export default AuthWrapper;
