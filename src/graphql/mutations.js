import { gql } from "@apollo/client";

export const CHECK_USER = gql`
  mutation CheckUser($input: CheckUserInput!) {
    checkUser(input: $input) {
      user {
        name
        _id
        count
      }
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      refreshToken
      user {
        name
        _id
        count
      }
    }
  }
`;
export const SIGNUP_MUTATION = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      token
      refreshToken
      user {
        name
        _id
        count
      }
    }
  }
`;

/* export const USER_COUNT_SUBSCRIPTION = gql`
  subscription UserCountUpdated {
    userCountUpdated {
      updatedUserCount
    }
  }
`; */