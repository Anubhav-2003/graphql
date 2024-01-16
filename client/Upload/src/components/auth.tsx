import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Link,
  Paper,
  CssBaseline,
} from '@mui/material';
import { styled } from '@mui/system';
import { ContainerProps } from '@mui/material/Container';

const StyledContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  }) as React.ComponentType<ContainerProps>;

const StyledPaper = styled(Paper)({
  padding: '20px',
  maxWidth: '400px',
  width: '100%',
  textAlign: 'center',
});

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your authentication logic here, for example, make API calls to handle login/signup
    if (isLogin) {
      // Handle login
      console.log('Logging in with:', { email, password });
    } else {
      // Handle signup
      console.log('Signing up with:', { email, password });
    }
    // Reset the form
    setEmail('');
    setPassword('');
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <StyledPaper elevation={3}>
        <Typography variant="h5">{isLogin ? 'Login' : 'Sign Up'}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <Typography variant="body2" align="center">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <Link href="#" onClick={handleToggleForm}>
            {isLogin ? 'Sign Up' : 'Login'}
          </Link>
        </Typography>
      </StyledPaper>
    </StyledContainer>
  );
};

export default AuthForm;
