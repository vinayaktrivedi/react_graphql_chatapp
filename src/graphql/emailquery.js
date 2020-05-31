import gql from "graphql-tag";

export default gql`
  query EMAIL_QUERY($email: String!) {
	Users(where: {email: {_eq: $email}}) {
    	id
  	}  	
  }
`;

