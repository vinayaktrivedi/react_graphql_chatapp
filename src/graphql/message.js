import gql from "graphql-tag";

export default gql`
subscription MESSAGE_SUBSCRIPTION($conv_id: bigint){
  messages(where: {conversation_id: {_eq: $conv_id}}) {
    message
    created_at
    User {
      email
    }
  }
}
`;