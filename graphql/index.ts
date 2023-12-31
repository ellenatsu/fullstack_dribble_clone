export const getUserQuery = `
  query GetUser($email: String!) {
    user(by: { email: $email }) {
      id
      name
      email
      avatarUrl
      description
      githubUrl
      linkedinUrl
      likedProjectIds
    }
  }
`;

export const createUserMutation = `
    mutation createUser($input: UserCreateInput!) {
      userCreate(input: $input) {
            user {   
              name
              email
              avatarUrl
              description
              githubUrl
              linkedinUrl
              id
              likedProjectIds
            }
        }
    }
`;

export const updateUserMutation = `
	mutation UpdateUser($id: ID!,$input: UserUpdateInput!) {
		userUpdate(by: { id: $id },  input: $input) {
      user {
			  id
        likedProjectIds
      }
		}
	}
`;

export const createProjectMutation = `
	mutation CreateProject($input: ProjectCreateInput!) {
		projectCreate(input: $input) {
			project {
				id
				title
				description
        views
        likes
				createdBy {
					email
					name
				}
			}
		}
	}
`;

export const updateProjectMutation = `
	mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
		projectUpdate(by: { id: $id }, input: $input) {
			project {
				id
				title
				description
        views
        likes
				createdBy {
					email
					name
				}
			}
		}
	}
`;


export const deleteProjectMutation = `
  mutation DeleteProject($id: ID!) {
    projectDelete(by: { id: $id }) {
      deletedId
    }
  }
`;

export const getProjectsByCategory = `
  query getProjects($category: String, $endCursor: String) {
    projectSearch(first: 4, after: $endCursor, filter: {category: {eq: $category}}) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubUrl
          description
          liveSiteUrl
          id
          image
          category
          views
          likes
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;

export const projectsQuery = `
  query getProjects($endCursor: String) {
    projectSearch(first: 4, after: $endCursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          githubUrl
          description
          liveSiteUrl
          id
          image
          category
          views
          likes
          createdBy {
            id
            email
            name
            avatarUrl
          }
        }
      }
    }
  }
`;


export const getProjectByIdQuery = `
  query GetProjectById($id: ID!) {
    project(by: { id: $id }) {
      id
      title
      description
      image
      liveSiteUrl
      githubUrl
      category
      views
      likes
      createdBy {
        id
        name
        email
        avatarUrl
      }
    }
  }
`;

export const getProjectsOfUserQuery = `
  query getUserProjects($id: ID!, $last: Int = 4) {
    user(by: { id: $id }) {
      id
      name
      email
      description
      avatarUrl
      githubUrl
      linkedinUrl
      projects(last: $last) {
        edges {
          node {
            id
            title
            image
            views
            likes
          }
        }
      }
      likedProjectIds
    }
  }
`;
