import React from 'react';
import { useGetCustoemrsQuery } from 'features/apiSlice';

const Customers = () => {
  const { data, isLoading, isSuccess } = useGetCustoemrsQuery();

  return <div>Customer Scene Component</div>;
};

export default Customers;
