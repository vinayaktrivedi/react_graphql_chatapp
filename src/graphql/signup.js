import gql from "graphql-tag";

export default gql`
  mutation SIGNUP_MUTATION($email: String!, $password: String!, $token: String!, $name: String) {
    insert_Users_one(object: {email:$email, name:$name, password:$password, token:$token}) {
      id
      token
    }
  }
`;
