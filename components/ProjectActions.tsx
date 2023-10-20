import React from 'react'
import  Link  from "next/link"
import Image from "next/image"

const ProjectActions = ({projectId}: {projectId: string}) => {
    const handleDelete = () => {}
  return (
    <>
      <Link href={`/edit-project/${projectId}`} className='flexCenter edit-action_btn'>
        <Image src="/pencile.svg" width={15} height={15} alt="edit" />
      </Link>

      <button className='flexCenter delete-action_btn' type='button'>
        <Image src="/trash.svg" width={15} height={15} alt="delete" />
      </button>
    </>
  )
}

export default ProjectActions