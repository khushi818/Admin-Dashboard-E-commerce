import {
  Stack,
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .required()
    .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
    .matches(/^(?=.*[0-9])/, "Must Contain One Number Character")
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "Must Contain  One Special Case Character"
    ),
  firstName: yup.string(),
  lastName: yup.string(),
  contactNumber: yup.number(),
});

const AddAdmin = () => {
  const [permissions, setPermissions] = useState<{
    user: boolean;
    order: boolean;
    product: boolean;
  }>({
    user: false,
    order: false,
    product: false,
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      contactNumber: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      await axios
        .post(`/auth/super/createadmin`, { ...values, permissions }, config)
        .then(() => console.log("success"));
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPermissions({
      ...permissions,
      [event.target.name]: event.target.checked,
    });
  };

  const { user, order, product } = permissions;

  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Typography
        sx={{
          fontSize: "25px",
          fontWeight: "600",
          LineHeight: "30.45px",
        }}
        color="primary"
      >
        Add Admin
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          required
          fullWidth
          id="firstName"
          name="firstName"
          label="FirstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />

        <TextField
          required
          fullWidth
          id="lastName"
          name="lastName"
          label="LastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />

        <TextField
          required
          fullWidth
          id="Email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          required
          fullWidth
          id="password"
          name="password"
          label="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <TextField
          required
          fullWidth
          id="passwordConfirm"
          name="passwordConfirm"
          label="passwordConfirm"
          type="passwordConfirm"
          value={formik.values.passwordConfirm}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.passwordConfirm &&
            Boolean(formik.errors.passwordConfirm)
          }
          helperText={formik.touched.password && formik.errors.passwordConfirm}
        />

        <TextField
          required
          fullWidth
          id="contactNumber"
          name="contactNumber"
          label="contactNumber"
          type="number"
          value={formik.values.contactNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.contactNumber && Boolean(formik.errors.contactNumber)
          }
          helperText={
            formik.touched.contactNumber && formik.errors.contactNumber
          }
        />

        <Typography
          sx={{
            color: "grey",
          }}
          mt={4}
        >
          Permissions
        </Typography>
        <FormControl
          required
          component="fieldset"
          sx={{ m: 3 }}
          variant="standard"
        >
          <FormGroup sx={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Checkbox checked={user} onChange={handleChange} name="user" />
              }
              label="user"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={order}
                  onChange={handleChange}
                  name="order"
                />
              }
              label="order"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={product}
                  onChange={handleChange}
                  name="product"
                />
              }
              label="product"
            />
          </FormGroup>
        </FormControl>
        <Button color="primary" variant="contained" fullWidth type="submit">
          ADD ADMIN
        </Button>
      </Box>
    </Stack>
  );
};

export default AddAdmin;
