import * as React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import { Chip, Grid, Typography, TextField, IconButton, Box, Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Delete } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit'
import moment from 'moment'
import { GridActionsCellItem } from '@mui/x-data-grid'
import Avatar from '@mui/material/Avatar'
import { Buffer } from 'buffer'
import './DataGrid.css'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { DataGrid } from '@mui/x-data-grid'
import PropTypes from 'prop-types'
import { grey } from '@mui/material/colors'
import DialogEditWP from '../Dialog/DialogEditWP'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useNavigate, useParams } from 'react-router-dom'

const styles = {
  inputBase: {
    borderRadius: '20px',
    backgroundColor: '#efefef',
  },
}

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

function QuickSearchToolbar(props) {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          flexDirection: 'row-reverse',
          justifyContent: 'center',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <TextField
          variant="standard"
          style={styles.inputBase}
          value={props.value}
          onChange={props.onChange}
          placeholder="Search…"
          InputProps={{
            disableUnderline: true,
            startAdornment: <SearchIcon style={{ marginLeft: '2%' }} fontSize="small" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: props.value ? 'visible' : 'hidden' }}
                onClick={props.clearSearch}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            ),
          }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <Typography level="h1" fontWeight="bold" py={1} px={1} display="inline-flex">
          Dashboard Workprograms
        </Typography>
      </Box>
    </div>
  )
}

export default function DataGridWP() {
  const [openDialog, setOpenDialog] = React.useState(false)
  const [idClient, setIdClient] = React.useState('')

  const handleClickOpenDialog = cellValue => {
    if (cellValue) {
      setOpenDialog(true)
      setIdClient(cellValue)
      console.log(cellValue)
    }
  }

  const navigate = useNavigate()

  const handleOnCellClick = params => {
    navigate(`/projects/workprogram/rcm/${params.id}`)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const [searchText, setSearchText] = React.useState('')

  QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }

  const columns = [
    { field: '_id', headerName: 'ID', width: 90, hide: true, headerClassName: 'headertheme' },

    {
      field: 'name',
      headerClassName: 'headertheme',
      headerName: 'WorkProgram name',
      editable: false,
      width: 250,
      renderCell: params => {
        return (
          <>
            <Avatar
              src={`data:${params.row.project.client};base64, ${Buffer.from(
                params.row.project.client.avatar.data,
              ).toString('base64')}`}
            />
            <Grid container direction="column" item xs={6}>
              <Grid item xs style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Typography
                  style={{
                    fontWeight: 500,
                    width: '100%',
                    marginLeft: '10%',
                    textAlign: 'left',
                  }}
                >
                  {params.row.project.client.name} -
                </Typography>
                <Typography
                  style={{
                    fontWeight: 500,
                    width: '100%',
                    textAlign: 'left',
                    marginLeft: '2%',
                  }}
                >
                  {params.row.name}
                </Typography>
              </Grid>
              <Grid item xs style={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  style={{
                    fontWeight: 'medium',
                    width: '100%',
                    color: grey,
                    fontSize: '80%',
                    marginLeft: '10%',
                    textAlign: 'left',
                  }}
                >
                  {'Updated ' + moment(params.row.updatedAt, 'YYYY-MM-DD HH:mm:ss').fromNow()}
                </Typography>
              </Grid>
            </Grid>
          </>
        )
      },
    },
    {
      field: 'senior',
      headerName: 'Senior auditor',
      headerClassName: 'headertheme',
      width: 200,
      editable: false,
      renderCell: params => {
        return (
          <>
            {params.row.senior.map(function (item, i) {
              return (
                <Box sx={{ marginRight: '5%' }}>
                  <Chip label={params.row.senior[i].name} />
                </Box>
              )
            })}
          </>
        )
      },
    },
    {
      field: 'junior',
      headerName: 'Junior auditor',
      headerClassName: 'headertheme',
      width: 200,
      editable: false,
      renderCell: params => {
        return (
          <>
            {params.row.junior.map(function (item, i) {
              return (
                <Box sx={{ marginRight: '5%' }}>
                  <Chip label={params.row.junior[i].name} />
                </Box>
              )
            })}
          </>
        )
      },
    },
    {
      field: 'description',
      headerClassName: 'headertheme',
      headerName: 'Description',
      width: 400,
      editable: false,
    },
    {
      field: 'createdAt',
      headerName: 'Date of creation',
      headerClassName: 'headertheme',
      type: 'date',
      width: 160,
      editable: false,
      renderCell: CellValue => {
        return <p>{moment(CellValue.value).format('DD/MM/YYYY')}</p>
      },
    },
    {
      field: 'deadline',
      headerName: 'Deadline',
      headerClassName: 'headertheme',
      type: 'date',
      width: 160,
      editable: false,
      renderCell: CellValue => {
        return <p>{moment(CellValue.value).format('DD/MM/YYYY')}</p>
      },
    },

    {
      field: 'priority',
      headerClassName: 'headertheme',
      headerName: 'Status',
      type: 'date',
      width: 160,
      editable: false,

      renderCell: CellValue => {
        if (CellValue.value === 'Low') return <Chip variant="contained" label={CellValue.value} color="warning" />
        if (CellValue.value === 'High') return <Chip label={CellValue.value} variant="contained" color="error" />
        if (CellValue.value === 'Normal') return <Chip label={CellValue.value} variant="contained" color="success" />
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerClassName: 'headertheme',
      getActions: params => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          showInMenu
          onClick={() => {
            handleClickOpenDialog(params.id)
          }}
        />,
        <GridActionsCellItem icon={<EditIcon />} onClick={() => handleClickOpen(params.id)} label="Edit" showInMenu />,
        <GridActionsCellItem icon={<EditIcon />} onClick={() => handleOnCellClick(params)} label="Open" showInMenu />,
      ],
    },
  ]
  const { id } = useParams()
  const { isLoading, data, refetch } = useQuery('workprogramdata', () =>
    axios.get(`workprograms/${id}`, {
      onSuccess: async data => {
        console.log(data)
      },
      onError: async error => {
        console.log(error)
      },
    }),
  )

  const queryClient = useQueryClient()

  const { data: data1, mutate } = useMutation(
    async cellValue => {
      const resp = axios.delete(`workprograms/${cellValue}`)
      return resp.data1
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries('workprogramdata'), refetch()
        }, 500)
      },
      onError: async error => {
        console.log(error)
      },
    },
  )

  const handleClickDelete = () => {
    console.log(idClient)
    mutate(idClient)
    refetch()
    setOpenDialog(false)
  }
  const [open, setOpen] = React.useState(false)
  const [rows, setRows] = React.useState([])
  const [rowId, setRowId] = React.useState('')
  const handleClickOpen = getRowId => {
    if (getRowId) {
      setRowId(getRowId)
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const requestSearch = searchValue => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.data.filter(row => {
      return Object.keys(row).some(field => {
        return searchRegex.test(row[field].toString())
      })
    })
    setRows(filteredRows)
  }

  React.useEffect(() => {
    if (data) {
      setRows(data.data)
    }
  }, [data])

  return (
    <div>
      {isLoading && <p>wait</p>}
      {data && (
        <div style={{ height: '68.2vh', width: '100%', backgroundColor: 'white' }}>
          <Dialog open={openDialog} onClose={handleCloseDialog} aria-describedby="alert-dialog-description">
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do you really want to delete this work program ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button onClick={handleClickDelete} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          <DialogEditWP open={open} rowId={rowId} handleClose={handleClose} />

          <DataGrid
            sx={{
              '& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator': {
                display: 'none',
              },
            }}
            rows={rows}
            columns={columns}
            getRowId={dataRow => dataRow._id}
            pageSize={6}
            getRowClassName={params => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
            rowsPerPageOptions={[6]}
            components={{ Toolbar: QuickSearchToolbar }}
            componentsProps={{
              toolbar: {
                value: searchText,
                onChange: event => requestSearch(event.target.value),
                clearSearch: () => requestSearch(''),
              },
            }}
          />
        </div>
      )}
    </div>
  )
}
