import gql from "graphql-tag";

export default gql`
mutation ADD_GROUP($group: Boolean, $name: String, $email: String) {
  insert_conversation_one(object: {group: $group, name: $name, participants: {data: {user_email: $email}}}) {
    id
    name
  }
}
`;