const userTypeDef = `#graphql
type User {
  id: ID!
  name: String!
  email: String!
  avatarUrl: String!
  description: String
  githubUrl: String
  linkedinUrl: String
  projects: [Project]
  likedProjectIds: [String]
}

type Query {
  users: [User!]!
  user(id: ID!): User
}

type Mutation {
  createUser(input: SignUpInput): User
  updateUser(input: UserUpdateInput): User
  deleteUser(id: ID!): message: String!
}

input SignUpInput {
    name: String!
    email: String!
    avatarUrl: String!
    description: String
    githubUrl: String
    linkedinUrl: String
    likedProjectIds: [String]
}

input UserUpdateInput {
    id: ID!
    name: String
    email: String
    avatarUrl: String
    description: String
    githubUrl: String
    linkedinUrl: String
    likedProjectIds: [String]
}
`;

export default userTypeDef;