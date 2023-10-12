export const getUserQuery = `
    query getUser($email: String!) {
      user(email: $email) {
        id
        name
        email
        avatarUrl
        description
        githubUrl
        linkedinUrl
      }
    }
`;

export const createUserMutation = `
    mutation createUser($input: UserCreateInput!) {
        createUser(input: $input) {
            user {   
              name
              email
              avatarUrl
              description
              githubUrl
              linkedinUrl
              id
            }
        }
    }
`;
