import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { useGetTransactionsQuery } from 'features/apiSlice';
import Header from 'components/Header';
import { Box, useTheme } from '@mui/material';
import DataGridCustomToolbar from 'components/DataGridCustomToolbar';

const Transactions = () => {
  const theme = useTheme();

  // request params sent to server
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState('');

  const [searchInput, setSearchInput] = useState('');

  const columns = [
    {
      field: '_id',
      headerName: 'Transaction ID',
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
      flex: 0.4,
      sortable: false,
      renderCell: (params) => {
        return params.value.length;
      },
    },
    {
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: (params) => `${Number(params.value).toFixed(2)}`,
    },
  ];

  const { data, isLoading, isError } = useGetTransactionsQuery({
    page,
    pageSize,
    search,
    sort: JSON.stringify(sort),
  });

  return (
    <Box margin="1.5rem 2.5rem">
      <Header title="Transactions" subTitle="List of Transactions" />
      <Box
        height="80vh"
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
          pagination
          paginationMode="server"
          page={page}
          pageSize={pageSize}
          sortingMode="server"
          rows={(data && data.transactions) || []}
          rowsPerPageOptions={[20, 50, 100]}
          rowCount={(data && data.total) || 0}
          columns={columns}
          components={{
            Toolbar: DataGridCustomToolbar,
          }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
          getRowId={(row) => row._id}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
