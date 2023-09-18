import { TextField, Typography, Button, Box, Card } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { loginAdmin } from "../redux/Action/authAction";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/app/hook";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  // .matches(/^(?=.*[a-z])/, "Must Contain One LowercaseA Character")
  // .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
  // .matches(/^(?=.*[0-9])/, "Must Contain One Number Character")
  // .matches(
  //   /^(?=.*[!@#\$%\^&\*])/,
  //   "Must Contain  One Special Case Character"
  // ),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.email !== "" || values.password !== "") {
        dispatch(loginAdmin(values));
      }
      console.log(values);
    },
  });

  // const isRequirementMet = (regex: RegExp) => {
  //   return regex.test(formik.values.password);
  // };

  return (
    <Box
      width="100%"
      component="form"
      display="flex"
      flexDirection="column"
      onSubmit={formik.handleSubmit}
    >
      <Typography
        variant="h4"
        style={{
          textAlign: "center",
          color: "#0d507d",
        }}
      >
        Login In
      </Typography>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />

      <Typography
        variant="body2"
        sx={{
          textAlign: "right",
          color: "#0d507d",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        forgot password?
      </Typography>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        type="submit"
        onClick={() => navigate("/")}
        sx={{
          marginTop: "10px",
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
