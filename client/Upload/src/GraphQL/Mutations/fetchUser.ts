import { gql } from '@apollo/client';

export const FETCH_USER_MUTATION = gql`
  mutation findUser($email: String!, $password: String!) {
    fetchUser(email: $email, password: $password) {
      id
      email
    }
  }
`;