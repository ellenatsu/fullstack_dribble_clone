const projectTypeDef = `#graphql
type Project {
  id: ID!
  title: String!
  description: String!
  image: String!
  liveSiteUrl: String
  githubUrl: String
  category: String!
  views: Int!
  likes: Int!
  createdBy: User!
}

type Query {
  projects: [Project!]
  project(id: ID!): Project
}

type Mutation {
  createProject(input: CreateProjectInput!): Project!
  updateProject(input: UpdateProjectInput!): Project!
  deleteProject(id: ID!): Boolean
}

input CreateProjectInput {
    title: String!
    description: String!
    image: String!
    category: String
    liveSiteUrl: String
    githubUrl: String
}

input UpdateProjectInput {
    id: ID!
    title: String 
    description: String
    image: String
    liveSiteUrl: String 
    githubUrl: String
    category: String
    views: Int 
    likes: Int
}


`;
export default projectTypeDef;