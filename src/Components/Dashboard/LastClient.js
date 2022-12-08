import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useQuery } from 'react-query'
import axios from 'axios'

export default function LastClient() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'email',
      width: 150,
    },
    {
      field: 'priority',
      headerName: 'priority',
      type: 'number',
      width: 110,
      renderCell: params => {
        console.log('params', params)
        return (
          <p className=" rounded-xl border border-main px-2 py-1 text-main text-sm cursor-pointer">{params.value}</p>
        )
      },
    },
    {
      field: 'description',
      headerName: 'description',
      sortable: false,
      width: 160,
    },
  ]

  let rows = []

  const { isLoading, data, error } = useQuery('clients', () => axios.get('clients/all'), {
    refetchOnWindowFocus: false,

    onSuccess: data => {
      console.log(data)
    },
    onError: async error => {
      console.error(error)
    },
  })

  if (isLoading === false && data !== undefined) {
    let newRows = []
    data?.data.map((client, index) => {
      newRows.push({
        id: index + 1,
        firstName: client.name,
        email: client.email,
        priority: client.priority,
        description: client.description,
      })
    })
    rows = newRows
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {isLoading ? (
        <Typography className=" text-2lg justify-center">Loading...</Typography>
      ) : (
        <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} disableSelectionOnClick />
      )}
    </Box>
  )
}
