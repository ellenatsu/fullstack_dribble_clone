"use server"
import { updateProjectLikes, fetchToken, updateUserLikes} from '@/lib/actions';


export const likeBtnHandler = async (userId: string, projectId: string, isLiked: boolean,likedProjectIds: string[]) => {
      //get token to update the projectid list
      const {token} = await fetchToken();
      const newLikedProjectIds = isLiked ? likedProjectIds.filter(id => id !== projectId) : [...likedProjectIds, projectId];
      console.log(newLikedProjectIds);
      try{
        await updateUserLikes(newLikedProjectIds, userId, token);
      }catch(err){
          console.log(err);
      }
      
      //update the isLiked to update projects likes number
      isLiked = !isLiked;
        try{
          await updateProjectLikes(projectId as string, isLiked, token);
          console.log(isLiked);
          //await updateProjectLikes(projectId, isLiked);
        }catch(err){
            console.log(err);
        }
    }
  
  