import { Typography, Box, Card, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant={"h6"} paddingBottom={"20px"}>
        HI! WELCOME BACK 😃
      </Typography>
      <Stack
        justifyContent={"left"}
        alignItems={"center"}
        gap={"15px"}
        flexDirection={"row"}
      >
        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "300px",
            height: "200px",
            backgroundColor: "#C0E8F9",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/products");
          }}
        >
          <Typography variant={"h5"}>Total products</Typography>
          <Typography variant={"h6"}>5</Typography>
        </Card>

        <Card
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "300px",
            height: "200px",
            backgroundColor: "#C0E8F9",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/addadmin");
          }}
        >
          <Typography variant={"h5"}>Total Admins</Typography>
          <Typography variant={"h6"}>4</Typography>
        </Card>
      </Stack>
    </Box>
  );
};

export default Dashboard;
