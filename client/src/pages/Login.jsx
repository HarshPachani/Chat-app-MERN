import { useFileHandler } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography, } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from '../styles/StyledComponents'
import { bgGradient, gray } from "../constants/color";
import { userExists } from "../redux/reducers/auth";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [username, setUsername] = useState('Guest');
  const [password, setPassword] = useState('123456');

  const avatar = useFileHandler("single", 2);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const toastId = toast.loading('Logging In...');
    
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/user/login`,
        { username, password },
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message,{ id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const toastId = toast.loading('Signing Up...');

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("username", username);
    formData.append("password", password);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message, { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: gray,
      }}
    >
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        component={"main"}
        maxWidth="xs"
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  sx={{ marginTop: "1rem" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  Login
                </Button>

                <Typography textAlign="center" m="1rem">
                  OR
                </Typography>

                <Button fullWidth variant="text" onClick={toggleLogin} disabled={isLoading}>
                  Sign Up Instead
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">SignUp</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleSignUp}
              >
                <Stack position="relative" width="10rem" margin="auto">
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      right: "0",
                      color: "white",
                      bgcolor: "rgba(0, 0, 0, 0.5)",
                      ":hover": {
                        bgcolor: "rgba(0, 0, 0, 0.7)",
                      },
                    }}
                    component="label"
                  >
                    <>
                      <CameraAltIcon />
                      <VisuallyHiddenInput
                        onChange={avatar.changeHandler}
                        type="file"
                      />
                    </>
                  </IconButton>
                </Stack>

                {avatar.error && (
                  <Typography
                    m="1rem auto"
                    width="fit-content"
                    display="block"
                    color="error"
                    variant="caption"
                  >
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />

                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />

                <Button
                  sx={{ marginTop: "1rem" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={isLoading}
                >
                  SignUp
                </Button>

                <Typography textAlign="center" m="1rem">
                  OR
                </Typography>

                <Button fullWidth variant="text" onClick={toggleLogin} disabled={isLoading}>
                  Login Instead
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
