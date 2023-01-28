import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useGetUserPerformanceQuery } from 'features/apiSlice';
import { DataGrid } from '@mui/x-data-grid';

import Header from 'components/Header';
import DataGridCustomCulumnMenu from 'components/DataGridCustomColumnMenu';
import { useSelector } from 'react-redux';

const Performance = () => {
  const theme = useTheme();
  const userId = useSelector((state) => state.global.userId);
  const { data, isLoading } = useGetUserPerformanceQuery(userId);

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 1,
    },
    {
      field: 'userId',
      headerName: 'User ID',
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
    },
    {
      field: 'products',
      headerName: '# of Products',
      flex: 1,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`
    }
  ];

  return (
    <Box margin="1.5rem 2.5rem">
      <Header
        title="Performance"
        subTitle="Track your affiliate sales performance here"
      />
      <Box
        marginTop="40px"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          columns={columns}
          rows={(data && data.sales) || []}
          getRowId={(row) => row._id}
          components={{
            ColumnMenu: DataGridCustomCulumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};

export default Performance;
