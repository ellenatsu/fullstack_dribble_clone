"use client"

import React, {useState} from 'react'
import  Link  from "next/link"
import Image from "next/image"
import { deleteProject, fetchToken} from '@/lib/actions';
import { useRouter } from 'next/navigation';

const ProjectActions = ({projectId}: {projectId: string}) => {

    const [isDeleting, setisDeleting] = useState(false);
    const router = useRouter();
    const handleDelete = async () => {
        setisDeleting(true);
        //for create, update, delete, need token auth
        const { token } = await fetchToken();
              
        try{
            await deleteProject(projectId, token);
            router.push('/');
        }catch(err){
            console.log(err);
        }finally{
            setisDeleting(false);
        }

    }
  return (
    <>
      <Link href={`/edit-project/${projectId}`} className='flexCenter edit-action_btn'>
        <Image src="/pencile.svg" width={15} height={15} alt="edit" />
      </Link>

      <button className={`flexCenter delete-action_btn ${isDeleting? 'bg-gray' : 'bg-primary-purple'}` } 
            type='button' 
            onClick={handleDelete}>
        <Image src="/trash.svg" width={15} height={15} alt="delete" />
      </button>
    </>
  )
}

export default ProjectActions