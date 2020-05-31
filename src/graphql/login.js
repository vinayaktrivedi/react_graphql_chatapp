import gql from "graphql-tag";

export default gql`
  mutation LOGIN_MUTATION($email: String!, $password: String!, $token: String!) {
  	update_Users(where: {email: {_eq: $email}, password: {_eq: $password}}, _set: {token: $token}) {
    	returning {
    		id
      		token
    	}
  	}
  }
`;
