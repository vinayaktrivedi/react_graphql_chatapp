import gql from "graphql-tag";

export default gql`
mutation INSERT_CONVERSATION($group: Boolean, $name: String, $recp1: String, $recp2: String) {
  insert_conversation_one(object: {group: $group, name: $name, participants: {data: [{user_email: $recp1}, {user_email: $recp2}]}}) {
    id
    name
  }
}
`;