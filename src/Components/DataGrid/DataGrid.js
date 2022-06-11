import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
  { field: 'id', headerName: 'ID', width: 90, hide: true },
  {
    field: 'ClientName',
    headerName: 'Client name',
    width: 150,
    editable: false,
  },
  {
    field: 'Manager',
    headerName: 'Manager',
    width: 150,
    editable: false,
  },
  {
    field: 'Description',
    headerName: 'Description',
    type: 'number',
    width: 110,
    editable: false,
  },
  {
    field: 'date',
    headerName: 'date',
    type: 'date',
    width: 160,
    editable: false,
  },
  {
    field: 'Status',
    headerName: 'Status',
    type: 'date',
    width: 160,
    editable: false,
  },
  {
    field: 'Actions',
    headerName: 'Actions',
    type: 'date',
    width: 160,
    editable: false,
  },
]

const rows = [
  { id: 1, ClientName: 'Snow', Manager: 'Jon', Description: 'test', date: 'test', Status: 'test', Actions: 'test' },
]

export default function DataGridDemo() {
  return (
    <div style={{ height: '50vh', width: '100%', backgroundColor: 'white' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </div>
  )
}
