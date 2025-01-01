import React from 'react';
import { Button, Container, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', marginTop: 5 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our App
        </Typography>
        <Typography variant="h5" paragraph>
          A simple, modern app to manage your orders and explore the menu.
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Landing;
