import {
  Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Slider from '@mui/material/Slider'
import CloseIcon from '@mui/icons-material/Close'
import CancelIcon from '@mui/icons-material/Cancel'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import DialogControl from '../Dialog/DialogControl'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import DeleteIcon from '@mui/icons-material/Delete'

function valuetext(value) {
  return `${value}°C`
}
const Controle = ({ clickedRisk, setclickedControl, setClickedRisk, setReloadAcc }) => {
  const [valueProbality, setValueProbality] = React.useState(0)

  const handleChangeProbality = async (event, newValue) => {
    await axios
      .patch(`risk/probability/${clickedRisk}`, { probability: newValue })
      .then(function (response) {
        setValueProbality(newValue)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const [valueImpact, setValueImpact] = React.useState(0)

  const handleChangeImpact = async (event, newValue) => {
    await axios
      .patch(`risk/impact/${clickedRisk}`, { impact: newValue })
      .then(function (response) {
        setValueImpact(newValue)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const [open, setOpen] = React.useState(false)

  const [riskName, setRiskName] = React.useState('')
  const [subStreamId, setSubStreamId] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const queryClient = useQueryClient()

  const [controlData, setcontrolData] = React.useState([])

  const handleDeleteControl = _id => {
    axios
      .delete(`control/${_id}`)
      .then(function (response) {
        // console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  React.useEffect(() => {
    if (clickedRisk) {
      axios
        .get(`control/${clickedRisk}`)
        .then(function (response) {
          setcontrolData(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })

      axios
        .get(`risk/name/${clickedRisk}`)
        .then(function (response) {
          setRiskName(response.data.name)
          setValueProbality(response.data.probability)
          setValueImpact(response.data.impact)
          setSubStreamId(response.data.subStream)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }, [clickedRisk, handleClose, handleDeleteControl])

  const btnstyle = { backgroundColor: '#FFE600', color: '#1A1A24', marginRight: '2%' }

  const handleDeleteRisk = () => {
    axios
      .delete(`risk/${clickedRisk}`)
      .then(function (response) {
        setClickedRisk('')
        setReloadAcc(true)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const handleClickControl = id => {
    setclickedControl(id)
  }
  return (
    <>
      {clickedRisk ? (
        <Box m={2}>
          <Box>
            <Typography variant="subtitle1" sx={{ color: 'black', fontSize: 'bold' }}>
              Risk :
            </Typography>
            <Typography variant="body1" sx={{ color: 'Grey' }}>
              {riskName}
            </Typography>
          </Box>
          <Box
            sx={{
              marginRight: '7rem',
              marginLeft: '7rem',
              marginTop: '2rem',
            }}
          >
            <Slider
              aria-label="Impact"
              defaultValue={0}
              value={valueImpact}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              onChange={handleChangeImpact}
              marks={[
                {
                  value: 0,
                  label: 'Impact',
                },

                {
                  value: 5,
                  label: valueImpact + '/5',
                },
              ]}
              min={0}
              max={5}
              sx={{ color: '#54D14D' }}
            />

            <Slider
              aria-label="Probability"
              defaultValue={0}
              value={valueProbality}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              onChange={handleChangeProbality}
              marks={[
                {
                  value: 0,
                  label: 'Probability',
                },

                {
                  value: 5,
                  label: valueProbality + '/5',
                },
              ]}
              min={0}
              max={5}
              sx={{ color: '#FFE600' }}
            />
          </Box>
          <Box sx={{ marginTop: '1rem' }}>
            <Box display="flex">
              <Typography variant="body1" sx={{ color: 'black', fontSize: 'bold' }}>
                Inherent risk :
              </Typography>
              <Typography variant="body1" sx={{ color: 'Grey', marginLeft: '0.5rem' }}>
                {valueImpact * valueProbality}
              </Typography>
            </Box>
            <Box display="flex">
              <Typography variant="body1" sx={{ color: 'black', fontSize: 'bold' }}>
                Real risk :
              </Typography>
              <Typography variant="body1" sx={{ color: 'Grey', marginLeft: '0.5rem' }}>
                {valueImpact * valueProbality * (1 - 4 / 5) + 0.2 * (valueProbality * valueImpact)}
              </Typography>
            </Box>
            <Box
              sx={{
                marginRight: '7rem',
                marginLeft: '7rem',
                marginTop: '2rem',
              }}
            >
              <Button onClick={handleClickOpen} size="small" startIcon={<ControlPointIcon />} style={btnstyle}>
                Add Control
              </Button>
              <Button variant="outlined" size="small" onClick={handleDeleteRisk} startIcon={<DeleteIcon />}>
                Delete
              </Button>
            </Box>
          </Box>
          <Box sx={{ marginTop: '1rem' }}>
            <Typography variant="subtitle1" sx={{ color: 'black', fontSize: 'bold' }}>
              Control :
            </Typography>

            {controlData.map(({ _id, control }, index) => {
              return (
                <Box
                  sx={{
                    display: 'flex',
                    backgroundColor: '#D9D9D9',
                    borderRadius: '4px',
                    p: 1,
                    marginBottom: 1,
                    ':hover': {
                      cursor: 'pointer',
                      background: '#E8E8E8',
                      transition: '0.3s',
                    },
                  }}
                  key={_id}
                  onClick={() => handleClickControl(_id)}
                >
                  <Typography variant="subtitle1">{control}</Typography>
                  <Box flexGrow={1} />
                  <IconButton onClick={() => handleDeleteControl(_id)}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              )
            })}
          </Box>
          <DialogControl open={open} handleClose={handleClose} idRisk={clickedRisk} />
        </Box>
      ) : (
        <Box
          display="flex"
          sx={{ flexDirection: 'column' }}
          justifyContent="center"
          alignItems="center"
          minHeight="70vh"
        >
          <img src="/notfound.jpg" width="40%" height="40%" alt="image" />
          <Typography sx={{ color: 'Grey' }}>No Risk Selected Yet !</Typography>
        </Box>
      )}
    </>
  )
}

export default Controle
