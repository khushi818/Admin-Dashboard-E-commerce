import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { BASE_URL } from "../../url";

type product = {
  _id(_id: any): unknown;
  productName: string;
  productDescription: string;
  productPrice: number;
  productScndPrice: number;
  productSize?: Array<string>;
  productCategory: Array<string>;
  productStock?: number;
  secondhand?: boolean;
  productImage?: {
    public_id: string;
    url: string;
  };
  createdAt: Date;
};

type GetResponse = {
  data: product[];
};

const columns: any = [
  {
    field: "productImage",
    headerName: "Image",
    width: 150,
    editable: true,
    renderCell: (params: any) => (
      <img style={{ width: "30px" }} src={params.value.url} />
    ),
  },
  {
    field: "_id",
    headerName: "id",
    width: 150,
  },
  {
    field: "productName",
    headerName: "ProductName",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "createdAt",
    width: 150,
  },
  {
    field: "secondhand",
    headerName: "secondHand",
    width: 150,
  },
];

const Products = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<product[]>([]);
  const getProducts = async () => {
    const product = await axios.get<GetResponse>(`${BASE_URL}/api/v1/product`);
    setProductData([...product.data.data]);
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log("data=>", productData);
  return (
    <>
      <Box>
        <Button onClick={() => navigate("/createproduct")}>
          create Product +{" "}
        </Button>
      </Box>
      <Box sx={{ margin: "25px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            sx={{
              fontSize: "25px",
              fontWeight: "600",
              LineHeight: "30.45px",
              color: "#424242",
            }}
          >
            Products
          </Typography>
        </Stack>
        <Box sx={{ height: 400, width: "100%", marginTop: "25px" }}>
          <DataGrid
            rows={productData}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            getRowId={(row: any) => row._id}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 200 },
                printOptions: { disableToolbarButton: true },
                csvOptions: { disableToolbarButton: true },
              },
            }}
            disableColumnMenu
            sx={{
              padding: "20px",
              border: "1px solid black",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
                cursor: "pointer",
                border: "1px solid black",
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Products;
