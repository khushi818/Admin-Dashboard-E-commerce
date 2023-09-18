import { Stack, TextField, Button, Box, Typography } from "@mui/material";
import { useFormik } from "formik";

const CreateProduct = () => {
  const formik = useFormik({
    initialValues: {
      productName: "",
      productDescription: "",
      productPrice: null,
      productSize: "",
      productScndPrice: null,
      productCategory: "",
      productStock: null,
      productImage: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

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
        CREATE PRODUCT
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"left"}
          flexDirection={"column"}
        >
          <Box
            component={"img"}
            src={formik.values.productImage}
            sx={{
              marginInline: "auto",
              width: "300px",
              borderRadius: "100%",
            }}
          />
          <TextField
            required
            label={"productImage"}
            id="productImage"
            name="productImage"
            type="file"
            onChange={(e: any) =>
              formik.setValues({
                ...formik.values,
                productImage: URL.createObjectURL(e.target.files[0]),
              })
            }
          />
        </Box>
        <TextField
          required
          fullWidth
          id="productName"
          name="productName"
          label="productName"
          value={formik.values.productName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.productName && Boolean(formik.errors.productName)
          }
          helperText={formik.touched.productName && formik.errors.productName}
        />

        <TextField
          required
          fullWidth
          id="productDescription"
          name="productDescription"
          label="productDescription"
          value={formik.values.productDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.productDescription &&
            Boolean(formik.errors.productDescription)
          }
          helperText={
            formik.touched.productDescription &&
            formik.errors.productDescription
          }
        />

        <TextField
          required
          fullWidth
          name="productPrice"
          id="productPrice"
          label="productPrice"
          type="number"
          value={formik.values.productPrice}
          onChange={formik.handleChange}
          error={
            formik.touched.productPrice && Boolean(formik.errors.productPrice)
          }
          onBlur={formik.handleBlur}
          helperText={formik.touched.productPrice && formik.errors.productPrice}
        />
        <TextField
          required
          fullWidth
          id="productScndPrice"
          name="productScndPrice"
          label="productScndPrice"
          type="number"
          value={formik.values.productScndPrice}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.productScndPrice &&
            Boolean(formik.errors.productScndPrice)
          }
          helperText={
            formik.touched.productScndPrice && formik.errors.productScndPrice
          }
        />

        <TextField
          required
          fullWidth
          id="productSize"
          name="productSize"
          label="productSize"
          type="text"
          placeholder="10,12,14"
          value={formik.values.productSize}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.productSize && Boolean(formik.errors.productSize)
          }
          helperText={formik.touched.productSize && formik.errors.productSize}
        />

        <TextField
          required
          fullWidth
          id="productCategory"
          name="productCategory"
          label="productCategory"
          type="text"
          value={formik.values.productCategory}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.productCategory &&
            Boolean(formik.errors.productCategory)
          }
          helperText={
            formik.touched.productCategory && formik.errors.productCategory
          }
        />

        <TextField
          required
          fullWidth
          id="productStock"
          name="productStock"
          label="productStock"
          type="number"
          value={formik.values.productCategory}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.productStock && Boolean(formik.errors.productStock)
          }
          helperText={formik.touched.productStock && formik.errors.productStock}
        />

        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          sx={{
            marginTop: "20px",
          }}
        >
          CREATE PRODUCT
        </Button>
      </Box>
    </Stack>
  );
};

export default CreateProduct;
