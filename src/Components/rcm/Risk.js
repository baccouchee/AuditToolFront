import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import IsolatedMenuRisk from '../Menu/IsolatedMenuRisk'
import { Divider } from '@mui/material'
import { Box } from '@mui/system'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import CircleIcon from '@mui/icons-material/Circle'
import { useNavigate, useParams } from 'react-router-dom'

const Risk = ({ setClickedRisk, reloadAcc, setReloadAcc }) => {
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel, subStream) => (event, isExpanded) => {
    if (subStream) {
      setExpanded(isExpanded ? panel : false)
      setRisk([])
      getRiskBySubStream(subStream)
    }
  }

  React.useEffect(() => {
    if (reloadAcc) {
      setExpanded(false)
      setReloadAcc(false)
    }
  }, [reloadAcc])

  const queryClient = useQueryClient()
  const [risk, setRisk] = React.useState([])
  const { workprogram } = useParams()
  const { isLoading, data, error } = useQuery('subStreamData', () =>
    axios.get(`subStream/${workprogram}`, {
      onSuccess: async data => {
        console.log(data)
      },
      onError: async error => {
        console.log(error)
      },
    }),
  )

  const getRiskBySubStream = subStream => {
    axios
      .get(`risk/${subStream}`)
      .then(response => {
        // console.log(response.data)
        setRisk(response.data)
      })
      .catch(error => {
        setError(error)
      })
  }

  return (
    <>
      {data && (
        <div>
          {data.data.map(({ _id, name }, index, onClick) => {
            return (
              <Accordion
                disableGutters
                elevation={0}
                square
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`, _id)}
                key={_id}
              >
                <AccordionSummary
                  sx={{ background: '#D9D9D9', maxHeight: '2rem' }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography sx={{ marginTop: '8px' }}>{name}</Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <IsolatedMenuRisk id={_id} />
                </AccordionSummary>

                {risk.map(({ name, _id }, index) => {
                  return (
                    <Box key={_id}>
                      <AccordionDetails
                        sx={{
                          background: '#E8E8E8',
                          ':hover': {
                            cursor: 'pointer',
                            background: '#D9D9D9',
                            transition: '0.3s',
                          },
                        }}
                        onClick={() => {
                          setClickedRisk(_id)
                        }}
                      >
                        <Typography
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                            marginLeft: 1,
                            transition: '0.2s',
                          }}
                        >
                          <CircleIcon sx={{ width: '1.5%', height: '1.5%', marginRight: 1 }} size="small" />

                          {name}
                        </Typography>
                      </AccordionDetails>
                      <Divider sx={{ borderBottomWidth: 2 }} />
                    </Box>
                  )
                })}
              </Accordion>
            )
          })}
        </div>
      )}
    </>
  )
}

export default Risk
