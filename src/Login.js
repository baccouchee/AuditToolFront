import React, { useState } from 'react'
import {
  Grid,
  Paper,
  Button,
  InputBase,
  CssBaseline,
  Alert,
  Collapse,
  Autocomplete,
  TextField,
  InputAdornment,
  FilledInput,
  InputLabel,
  FormControl,
} from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Ey from './img/Ey.png'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'

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
      color: 'black',
    },

    inputBase: {
      borderRadius: '7px',
      backgroundColor: '#F6F6FA',
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
    email: '',
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const navigate = useNavigate()

  const queryKey = ['users']

  const { isLoading, mutate } = useMutation(
    queryKey,
    async loginData => {
      const resp = await axios.post('users/login', loginData)
      return resp.data
    },
    {
      onSuccess: async data => {
        localStorage.setItem('thisismynewcourse', data.token)

        if (data.user.roles == 'junior') {
          navigate('/projects')
        } else navigate('/clients')
      },
      onError: async error => {
        console.log(error)
        setOpen(true)
      },
    },
  )

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }
  const handleSubmitLogin = async e => {
    e.preventDefault()

    const loginData = {
      email,
      password,
    }

    mutate(loginData)
  }

  const [open, setOpen] = React.useState(false)

  return (
    <Box sx={{ width: '100%' }}>
      <CssBaseline />
      <Grid container component="main" style={styles.imagebackgound}>
        <Paper elevation={10} style={paperStyle}>
          <Box>
            <Grid align="center">
              <Collapse in={open} sx={{ width: '50%', marginTop: '5%' }}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false)
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  The email or password are incorrect !
                </Alert>
              </Collapse>
              <img src="./white.png" style={avatarStyle} />
              <Box sx={{ height: '4ch' }} />

              <h2 className="font-face" style={{ color: 'white' }}>
                Sign In
              </h2>
            </Grid>
            <Box textAlign="center">
              <Box sx={{ height: '4ch' }} />

              <TextField
                label="Email"
                sx={{ width: '35ch' }}
                placeholder="Enter email"
                variant="filled"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={styles.inputBase}
              />

              <Box sx={{ height: '2ch' }} />
              <FormControl sx={{ width: '35ch' }} variant="filled">
                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                <FilledInput
                  id="filled-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={password}
                  style={styles.inputBase}
                  onChange={e => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Box sx={{ height: '2ch' }} />
              <FormControlLabel
                control={<Checkbox name="checkedB" sx={{ color: '#F6F6FA' }} />}
                sx={{ color: 'white' }}
                label="Remember me"
              />
            </Box>
            <Box textAlign="center">
              <Button
                variant="contained"
                type="submit"
                onClick={handleSubmitLogin}
                style={btnstyle}
                endIcon={<ArrowForwardIosIcon />}
              >
                Sign in
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Box>
  )
}

export default Login
