import { Stack, TextField, Button, Box, Typography } from "@mui/material";
import { BASE_URL } from "../../url";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";

const CreateProduct = () => {
  const [productImage, setProductImage] = useState<any>(null);
  const formik = useFormik({
    initialValues: {
      productName: "",
      productDescription: "",
      productPrice: null,
      productSize: "",
      productScndPrice: null,
      productCategory: "",
      productStock: null,
    },
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log(values);
      const formdata = new FormData();
      let key: any;
      const val: any = { ...values };
      for (key in val) {
        formdata.append(key, val[key]);
      }
      formdata.append("productImage", productImage);

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          // headers: { "Content-Type": "multipart/form-data" },
        },
        transformRequest: (formData: any) => formData,
      };

      // console.log(formdata);
      await axios
        .post(`${BASE_URL}/api/v1/product`, formdata, config)
        .then(() => console.log("success"));
    },
  });

  console.log(productImage);
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
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        method="post"
        action="/upload"
        encType="multipart/form-data"
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"left"}
          flexDirection={"column"}
        >
          <Box
            component={"img"}
            src={productImage ? URL.createObjectURL(productImage) : ""}
            sx={{
              marginBlock: "20px",
              width: "100px",
            }}
          />
          <input
            required
            id="productImage"
            name="productImage"
            accept=".png, .jpg, .jpeg"
            type="file"
            onChange={(e: any) => {
              setProductImage(e.target.files[0]);
            }}
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
          value={formik.values.productStock}
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
