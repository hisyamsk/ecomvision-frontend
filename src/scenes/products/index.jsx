import React, { useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import Header from 'components/Header';
import { useGetProductsQuery } from 'features/apiSlice';

const Products = () => {
  const { data, isLoading, isSuccess } = useGetProductsQuery();
  const isNonMobile = useMediaQuery('(min-width: 1000px)');

  return (
    <Box margin="1.5rem 2.5rem">
      <Header title="Products" subTitle="See your list of products" />
      {isSuccess && data && !isLoading ? (
        <Box>Hello</Box>
      ) : (
        <Box>Loading...</Box>
      )}
    </Box>
  );
};

export default Products;
