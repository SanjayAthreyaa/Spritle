import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate , Link} from 'react-router-dom';





export default function Header() {

    const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }}>
         
      <AppBar position="static" style={{backgroundColor:"black"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color='white'
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SPRITLE
          </Typography>
          <Button color="inherit" onClick={()=>navigate('/signin')}>Login</Button>
          <Button color="inherit"  onClick={()=>navigate('/register')}>Signup</Button>
        </Toolbar>
      </AppBar>
     
    </Box>
  );
}