import gql from "graphql-tag";

export default gql`
  query VERIFY_QUERY($token: String!) {
	Users(where: {token: {_eq: $token}}) {
    	email
    	id
  	}  	
  }
`;

