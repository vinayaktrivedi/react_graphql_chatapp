import gql from "graphql-tag";

export default gql`
query CONVERSATION_QUERY($conv_id: bigint) {
  messages(where: {conversation_id: {_eq: $conv_id}}) {
    message
    created_at
    User {
      email
    }
  }
}
`;