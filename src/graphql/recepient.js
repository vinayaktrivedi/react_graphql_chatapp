import gql from "graphql-tag";

export default gql`
mutation ADD_PARTICIPANT($conversation_id: bigint, $user_email: String) {
  insert_participants_one(object: {user_email: $user_email, conversation_id: $conversation_id}) {
    id
  }
}
`;
