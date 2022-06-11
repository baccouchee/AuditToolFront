import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, InputBase, CssBaseline } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Ey from './img/Ey.png'
import axios from 'axios'
import { BrowserRouter, Route, Link } from 'react-router-dom'

const Login = () => {
  const paperStyle = {
    width: '30vw',
    margin: '100px auto',
    background: '#1A1A24',
    border: '1px',
    borderRadius: '10px',
  }
  const styles = {
    multilineColor: {
      color: 'grey',
    },

    inputBase: {
      border: '1px solid white',
      borderRadius: '7px',
      height: '6vh',
      backgroundColor: '#F6F6FA',
      padding: 10,
      margin: 'normal',
      width: '45vh',
    },

    imagebackgound: {
      backgroundImage: `url(${Ey})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
    },
  }
  const avatarStyle = { maxWidth: '20%', marginTop: '10%' }
  const btnstyle = { margin: '30px', width: '20vh', height: '6vh', backgroundColor: '#FFE600', color: '#1A1A24' }

  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <Grid container component="main" style={styles.imagebackgound}>
      <CssBaseline />
      <Paper elevation={10} style={paperStyle}>
        <Box>
          <Grid align="center">
            <img src="./white.png" style={avatarStyle} />
            <Box sx={{ height: '4ch' }} />
            <h2 className="font-face" style={{ color: 'white' }}>
              Sign In
            </h2>
          </Grid>
          <Box textAlign="center">
            <Box sx={{ height: '4ch' }} />
            <InputBase label="Username" placeholder="Enter username" style={styles.inputBase} fullWidth required />
            <Box sx={{ height: '2ch' }} />
            <InputBase
              style={styles.inputBase}
              placeholder="Enter password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <IconButton
                  aria-label="toggle password visibility"
                  style={styles.multilineColor}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="start"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
              fullWidth
              required
            />
            <Box sx={{ height: '2ch' }} />

            <FormControlLabel
              control={<Checkbox name="checkedB" sx={{ color: '#F6F6FA' }} />}
              sx={{ color: 'white' }}
              label="Remember me"
            />
          </Box>
          <Box textAlign="center">
            <Button
              component={Link}
              to="/clients"
              variant="contained"
              type="submit"
              style={btnstyle}
              endIcon={<ArrowForwardIosIcon />}
            >
              Sign in
            </Button>
          </Box>
        </Box>
      </Paper>
    </Grid>
  )
}

export default Login
