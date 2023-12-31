import { ProjectForm } from "@/common.types";
import {
  getUserQuery,
  createUserMutation,
  createProjectMutation,
  projectsQuery,
  getProjectByIdQuery,
  getProjectsOfUserQuery,
  deleteProjectMutation,
  updateProjectMutation,
  getProjectsByCategory,
  updateUserMutation,
} from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "letmein";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    throw err;
  }
};

export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(createUserMutation, variables);
};

export const fetchToken = async () => {
  try {
    //fetch the token from nextAuth Endpoint
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (err) {
    throw err;
  }
};
//upload image t
export const uploadImage = async (imagePath: string) => {
  try {
    //the route is at app/api/upload/route.ts
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });
    return response.json();
  } catch (err) {
    throw err;
  }
};
export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image);
  if (imageUrl.url) {
    //give the token to the server to verify user
    client.setHeader("Authorization", `Bearer ${token}`);

    const variables = {
      input: { 
        ...form, 
        image: imageUrl.url, 
        createdBy: { 
          link: creatorId 
        }
      }
    };

    return makeGraphQLRequest(createProjectMutation, variables);
  }
};

//either undefined or string
export const fetchAllProjects = (category?: string, endCursor?: string ) => {
  client.setHeader("x-api-key", apiKey);
  if(category){
    
    return makeGraphQLRequest(getProjectsByCategory, { category, endCursor });
  };

  return makeGraphQLRequest(projectsQuery, { endCursor });
};

export const getProjectDetails = (id: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectByIdQuery, {id})
}

export const getUserProjects = (id: string, last?:number) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectsOfUserQuery, {id, last})
}

export const deleteProject = (id: string, token: string) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  return makeGraphQLRequest(deleteProjectMutation, {id})
}

export const updateProject = async (form: ProjectForm, projectId: string, token: string) => {
  //first check if image changed
  function isBase64DataURL(value:string){
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }
  
  let updatedForm = {...form};
  const isUploadingNewImage = isBase64DataURL(form.image);
  if(isUploadingNewImage){
    const imageUrl = await uploadImage(form.image);
    if(imageUrl.url){
      updatedForm = {...form, image: imageUrl.url}
    }
  }
  
  const variables = {
    id: projectId,
    input: updatedForm
  }

  client.setHeader("Authorization", `Bearer ${token}`);
  return makeGraphQLRequest(updateProjectMutation, variables)
}

export const updateProjectViews = async (projectId: string) => {
  //first check if image changed
  
  const variables = {
    id: projectId,
    input: {
      views: {
        "increment": 1
      }
    }
  }
  //client.setHeader("Authorization", `Bearer ${token}`);
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(updateProjectMutation, variables)
}

export const updateProjectLikes = async (projectId: string, liked: boolean, token: string) => {
  //first check if image changed
  let newLikes = liked ? { increment: 1 } : { decrement: 1 };
  
  const variables = {
    id: projectId,
    input: {
      likes: newLikes
    }
  }
  //client.setHeader("Authorization", `Bearer ${token}`);
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(updateProjectMutation, variables)
}

export const updateUserLikes = async (likedProjectIds: string[], userId: string, token: string) => {
  //first check if image changed

  const variables = {
    id: userId,
    input: {
      likedProjectIds: likedProjectIds
    }
  }
  client.setHeader("Authorization", `Bearer ${token}`);
  //client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(updateUserMutation, variables)
}