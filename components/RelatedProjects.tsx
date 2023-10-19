import { ProjectInterface, UserProfile } from '@/common.types';
import { getUser } from '@/lib/actions';
import React from 'react'

type Props = {
    userId: string;
    projectedId: string;
}

const RelatedProjects = async ({userId, projectedId}: Props) => {
    const result = await getUser(userId) as {user? : UserProfile};
    //filter the project node out
    const filteredProjects = result?.user?.projects?.edges?.filter( ({node}:{node: ProjectInterface}) => node.id !== projectedId);
  return (
    <div>RelatedProjects</div>
  )
}

export default RelatedProjects