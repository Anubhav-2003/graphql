import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($email: String!, $password: String!) {
    addUser(email: $email, password: $password) {
      id
      email
    }
  }
`;