import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

import { Tooltip } from '@mui/material';
import logo from './images/logo.svg';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function SignIn() {
  // State for the password viewing functionality
  const [showPassword, setShowPassword] = useState(false);
 

  // Function to show the passowrd on (click or mousedown)
  const handleClickShowPassword = () => setShowPassword(!showPassword);

 
  // For alert box display
  const [isUserValid, setUserValid] = useState(false);

  

  const navigate = useNavigate();

 

  const handleSubmit = async(values) => {
   
    const student =  await fetch(
      `http://localhost:3004/student`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    ).then((res) => res.json())
    
      const teacher =  await fetch(
      `http://localhost:3004/teacher`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
      ).then((res) => res.json())
    
   
    if(teacher.find((i)=>i.email == values.email && i.password == values.password)){
      navigate('/teacher.console')
    }
    else if(student.find((i)=>i.email == values.email && i.password == values.password)){
      navigate('/student.console')
    }
    else{
      updateUserLoginAlert()
    }
    
    // If user present, userDetails will have the user else it will be false

    
  };

  const validateTask = yup.object({
    email: yup.string().email('email is invalid').required('email is required'),
    password: yup
      .string()
      .required('password is required')
      .required('password is invalid'),
  });

  const validateFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validateTask,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const updateUserLoginAlert = () => {
    setUserValid(true);
    setTimeout(() => {
      setUserValid(false);
    }, 2500);
  };

  return (
    <Container
      component="main"
      maxWidth={'xs'}
      onSubmit={validateFormik.handleSubmit}
      style={{ marginTop: '5em' }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Tooltip title={'click to go home'}>
          <div
            style={{ cursor: 'pointer', marginBottom: '2em' }}
            onClick={() => navigate('/')}
          >
            <img src={logo} alt="logo" className='img-thumbnail' style={{height:"50px"}} />
          </div>
        </Tooltip>
        <div className="design" style={{ padding: '3em' }}>
          <Typography component="h1" variant="h5" className='d-flex justify-content-center'>
            Sign In
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={validateFormik.values.email}
              onChange={validateFormik.handleChange}
              error={
                validateFormik.touched.email &&
                Boolean(validateFormik.errors.email)
              }
              helperText={
                validateFormik.touched.email && validateFormik.errors.email
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={validateFormik.values.password}
              onChange={validateFormik.handleChange}
              error={
                validateFormik.touched.password &&
                Boolean(validateFormik.errors.password)
              }
              helperText={
                validateFormik.touched.password &&
                validateFormik.errors.password
              }
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <FormControlLabel
                label="Show password"
                control={
                  <Checkbox onChange={() => handleClickShowPassword()} />
                }
              />
            </div>
            {isUserValid && (
              <Alert style={{ marginTop: '0.5em' }} severity="error">
                Email or Password does not match !
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <p>
                  New user? <Link to={'/register'}>Register here</Link>
                </p>
              </Grid>
            </Grid>
          </Box>
        </div>
      </Box>
      <hr style={{ marginTop: '3em' }} />
      <p style={{ textAlign: 'center' }}>©️ 2022 Spritle.in</p>
    </Container>
  );
}