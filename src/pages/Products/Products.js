import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Typography, Stack, CircularProgress, Box } from "@mui/material";

import { fetchProducts } from "./productsSlice";
import { CustomPagination } from "../../components/CustomPagination";
import ProductsTable from "./ProductsTabe/ProductsTable";
import CustomSearch from "./CustomSearch/CustomSearch";

export const Products = () => {
  const page = useSelector((state) => state.products.pageNum);
  const isLoading = useSelector((state) => state.products.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(1));
  }, [dispatch]);

  const memoizedSelector = useCallback((state) => state.products, []);
  return (
    <Stack spacing={2}>
      <CustomSearch />
      <Typography variant="h5">Page: {page}</Typography>
      <CustomPagination callback={fetchProducts} selector={memoizedSelector} />
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size={80} />
        </Box>
      ) : (
        <>
          <ProductsTable />
          <CustomPagination
            callback={fetchProducts}
            selector={memoizedSelector}
          />
        </>
      )}
    </Stack>
  );
};
