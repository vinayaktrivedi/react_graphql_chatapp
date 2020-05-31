import gql from "graphql-tag";

export default gql`
mutation SEND_MUTATION($conv_id: bigint, $user_id: bigint, $message: String) {
  insert_messages_one(object: {conversation_id: $conv_id, message: $message, sender_id: $user_id}) {
    id
  }
}
`;