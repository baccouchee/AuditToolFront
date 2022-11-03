import React, { useEffect } from 'react'
import DrawerPerm from '../Components/Drawer/DrawerPerm'
import { Button, Grid, Toolbar, Fab } from '@mui/material'
import { Box } from '@mui/system'
import { Container, Row, Col } from 'react-grid-system'
import '../basic.css'
import clsx from 'clsx'
import Risk from '../Components/rcm/Risk'
import Controle from '../Components/rcm/Controle'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import DialogRisk from '../Components/Dialog/DialogRisk'
import TestingProcedures from '../Components/rcm/testingProcedures'
import DialogControl from '../Components/Dialog/DialogControl'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import axios from 'axios'
import * as XLSX from 'xlsx/xlsx.mjs'
import { ShutterSpeedOutlined } from '@mui/icons-material'
import TableToExcel from '@linways/table-to-excel'

const Rcm = () => {
  const [open, setOpen] = React.useState(false)
  const [clickedRisk, setClickedRisk] = React.useState('')
  const [clickedControl, setclickedControl] = React.useState('')

  const [reloadAcc, setReloadAcc] = React.useState(false)

  const [sheetData, setSheetData] = React.useState([])

  const [loadData, setLoadData] = React.useState(false)

  const [subStream, setSubStream] = React.useState([])
  const [risk, setRisk] = React.useState([])
  const [control, setControl] = React.useState([])

  const [exportedSubStream, setexportedSubStream] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    subStream.map((obj, i) => {
      axios.get(`risk/${obj._id}`).then(res => {
        res.data.map(item => {
          risk.push(item)
          setexportedSubStream(true)
        })
      })
    })
  }, [subStream])

  React.useEffect(() => {
    if (exportedSubStream) {
      risk.map((obj, i) => {
        axios.get(`control/${obj._id}`).then(res => {
          res.data.map(item => {
            control.push(item)
          })
        })
      })
    }
  }, [exportedSubStream])

  const saveOmar = () => {
    const results = []
    if (subStream.length > 0) {
      subStream.forEach(subStream => {
        const subStreamResult = {
          _id: subStream._id,
          name: subStream.name,
          workprogram: subStream.workprogram,
          risks: [],
        }
        risk.forEach(risk => {
          if (risk.subStream === subStream._id) {
            const riskResult = {
              _id: risk._id,
              name: risk.name,
              controls: [],
            }
            control.forEach(control => {
              if (control.risk === risk._id) {
                const controlResult = {
                  _id: control._id,
                  control: control.control,
                  testPro: control.testPro,
                }
                riskResult.controls.push(controlResult)
              }
            }),
              subStreamResult.risks.push(riskResult)
          }
        }),
          results.push(subStreamResult)
      })

      setSheetData(results)
    }
  }

  const handleClickExport = () => {
    axios.get('subStream/62ff86ab0de29330bc35b1b0').then(res => {
      setSubStream(res.data)
    })
    saveOmar()
    setLoadData(true)
  }

  React.useEffect(() => {
    if (loadData && sheetData.length > 0) {
      console.log(sheetData)
      // var elt = document.getElementById('tabb')

      // var wb = XLSX.utils.table_to_book(elt, {
      //   header: 1,
      //   blankRows: false,
      //   defval: '',
      // })
      // XLSX.writeFileXLSX(wb, 'SheetJSReactHTML.xlsx')

      let table = document.querySelector('#tabb')
      TableToExcel.convert(table)
    }
  }, [sheetData])

  const Xport = () => {
    return (
      <>
        {sheetData && (
          <table id="tabb">
            <thead>
              <tr>
                <th>Risk</th>
                <th>Control</th>
                <th>Testing Procedures</th>
              </tr>
            </thead>
            <tbody>
              {sheetData.map(i => {
                return (
                  <>
                    <tr>
                      <th colspan="3">{i.name}</th>
                    </tr>

                    {i.risks.map(r => {
                      return (
                        <>
                          <tr>
                            <td rowSpan={r.controls.length}>{r.name}</td>
                            <td> {r.controls[0].control}</td>
                            <td> {r.controls[0].testPro}</td>
                          </tr>
                          {r.controls.map((c, index) => {
                            return (
                              <tr>
                                <td>{r.controls[index + 1]?.control}</td>
                                <td>{r.controls[index + 1]?.testPro}</td>
                              </tr>
                            )
                          })}
                        </>
                      )
                    })}
                  </>
                )
              })}
            </tbody>
          </table>
        )}
        <br></br>
        <table>
          <thead>
            <tr>
              <th>Risk</th>
              <th>Control</th>
              <th>Testing Procedures</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="2">Risk 1</td>
              <td>$80</td>
              <td>90</td>
            </tr>
            <tr>
              <td>$80</td>
              <td>90</td>
            </tr>
            <tr>
              <td rowSpan="0">Risk 2</td>
              <td>$80</td>
              <td>90</td>
            </tr>
          </tbody>
        </table>
      </>
    )
  }
  // style={{ visibility: 'hidden', maxHeight: 0 }}
  return (
    <DrawerPerm>
      <Grid container style={{ height: '86%' }}>
        <Grid item xs={12}>
          <Toolbar />
        </Grid>
        <Grid item xs={12} style={{ visibility: 'hidden', maxHeight: 0 }}>
          <Xport />
        </Grid>

        <Grid
          item
          rowSpacing={0}
          xs={3}
          style={{ backgroundColor: '#efefef', overflowY: 'auto', height: '100%' }}
          className={'mostly-customized-scrollbar'}
        >
          <Risk setClickedRisk={setClickedRisk} reloadAcc={reloadAcc} setReloadAcc={setReloadAcc} />
        </Grid>
        <Grid
          item
          rowSpacing={0}
          xs={5}
          style={{ backgroundColor: 'white', overflowY: 'auto', height: '100%' }}
          className={'mostly-customized-scrollbar'}
        >
          <Controle
            clickedRisk={clickedRisk}
            setClickedRisk={setClickedRisk}
            setclickedControl={setclickedControl}
            setReloadAcc={setReloadAcc}
          />
        </Grid>
        <Grid
          item
          rowSpacing={0}
          xs={4}
          style={{ backgroundColor: '#efefef', overflowY: 'auto', height: '100%' }}
          className={'mostly-customized-scrollbar'}
        >
          <TestingProcedures
            clickedControl={clickedControl}
            clickedRisk={clickedRisk}
            setclickedControl={setclickedControl}
          />
          <Fab
            size="small"
            variant="extended"
            sx={{ backgroundColor: '#FFE600', position: 'absolute', bottom: 20, right: 40 }}
            onClick={() => handleClickExport()}
          >
            <UploadFileIcon sx={{ mr: 1 }} />
            export
          </Fab>
        </Grid>
        <Grid item xs={3}>
          <Button
            sx={{
              backgroundColor: '#D9D9D9',
              width: '100%',
              height: '100%',
              borderRadius: 0,
              border: 2,
              borderColor: '#B7B7B7',
              color: 'black',
            }}
            startIcon={<ControlPointIcon />}
            onClick={handleClickOpen}
          >
            Add SubStream
          </Button>
        </Grid>
        <Grid item xs={5}>
          {' '}
          <Box sx={{ backgroundColor: 'white', width: '100%', height: '100%' }} />
        </Grid>
        <Grid item xs={4}>
          {' '}
          <Box sx={{ backgroundColor: '#EFEFEF', width: '100%', height: '100%' }} />
        </Grid>
      </Grid>
      <DialogRisk open={open} handleClose={handleClose} />
    </DrawerPerm>
  )
}

export default Rcm
