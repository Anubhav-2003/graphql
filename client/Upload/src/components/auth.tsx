import React, { useState } from 'react';
import { CREATE_USER_MUTATION } from '../GraphQL/Mutations/createUser';
import { useNavigate } from 'react-router-dom';
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
import { useMutation } from '@apollo/client';
import { FETCH_USER_MUTATION } from '../GraphQL/Mutations/fetchUser';

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

  const [createUserMutation] = useMutation(CREATE_USER_MUTATION)
  const [fetchUserMutation] = useMutation(FETCH_USER_MUTATION)

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //checking if on signup form or login form.
    if (!isLogin) {
      try {
        const { data } = await createUserMutation({
          variables: { email, password },
        });

        localStorage.setItem('userId', data.addUser.id);
        navigate('/upload')
      } catch (error) {
        console.error('Error creating user:', error);
      }
    } else {
      try {
        const { data } = await fetchUserMutation({
          variables: { email, password },
        });
        localStorage.setItem('userId', data.fetchUser.id);
        navigate('/upload')
      } catch (error) {
        console.error('No user found:', error);
      }
    }

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
