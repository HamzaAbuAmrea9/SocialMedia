import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Cookie from 'universal-cookie';
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const SettingsPage = () => {
  const [user, setUser] = useState({});
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const cookie = new Cookie();
  const token = cookie.get("socialmedia");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/socialmedia/current-user',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
        setNewUsername(response.data.username);
        setNewEmail(response.data.email);
        setNewPassword('');
      } catch (error) {
        console.log(error);
      }
    };

    fetchCurrentUser();
  }, [token]);

  const handleProfileUpdate = async () => {
    if (user.id) {
      try {
        const updatedData = {
          username: newUsername,
          email: newEmail,
          password: newPassword,
        };

        await axios.put(`http://localhost:8080/socialmedia/users/${user.id}`, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsProfileUpdated(true);
        setOpenSnackbar(true);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const handleLogout = () => {
    cookie.remove("socialmedia");
    navigate("/login");
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Settings(ChangeInformationAccount)
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="New Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="New Email"
              name="email"
              autoComplete="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleProfileUpdate}
            >
              Update Profile
            </Button>
          </Box>
          {isProfileUpdated && (
            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLogout}
              >
                Login Again
              </Button>
            </Box>
          )}
        </Box>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Profile updated successfully! Please log in again.
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default SettingsPage;
