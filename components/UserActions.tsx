"use client"

import React, {useState} from 'react'
import  Link  from "next/link"
import Image from "next/image"
import { updateProjectLikes, fetchToken} from '@/lib/actions';
import { useRouter } from 'next/navigation';

const UserActions = ({projectId}: {projectId: string}) => {

    const [isLiked, setisLiked] = useState(false);
    const router = useRouter();
    const handleLikes = async () => {
        setisLiked(prevIsLiked => !prevIsLiked);
        //for create, update, delete, need token auth
        //const { token } = await fetchToken();
        try{
            await updateProjectLikes(projectId, isLiked);
        }catch(err){
            console.log(err);
        }
    }
  return (
    <>
      <button className={`${isLiked ? ' bg-red-500' : 'bg-gray-400'} flexCenter delete-action_btn`} type='button' onClick={handleLikes}>
        <Image src="/heart.svg" width={20} height={20} alt="like" />
      </button>
    </>
  )
}

export default UserActions