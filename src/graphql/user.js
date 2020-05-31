import gql from "graphql-tag";

export default gql`
query USER_QUERY($email: String) {
  Users(where: {email: {_eq: $email}}) {
    id
    participants {
      conversation {
        id
        name
        group
      }
    }
  }
}
`;
