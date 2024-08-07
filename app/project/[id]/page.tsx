import { ProjectInterface } from '@/common.types';
// import { getProjectDetails, updateProjectViews } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session'
import Image from "next/image"
import Link from "next/link"
import Modal from "@/components/Modal"
import RelatedProjects from '@/components/RelatedProjects';
import ProjectActions from '@/components/ProjectActions';
import UserLikeBtn from '@/components/UserLikeBtn';
import { likeBtnHandler } from './UserActions';


type Props = {
    params: {
        id: string;
    }
}

async function incrementProjectViews(projectId: string | undefined, views: number) {
    // if (!projectId) {
    //   return;
    // }
    // try {
    //   await updateProjectViews(projectId as string);
    // }
    // catch (error) {
    //   console.error(error);
    // }
    console.log('incrementProjectViews', projectId, views)
  }
  
const Project = async ({params}: Props) => {
  //create session to get project details
  const session = await getCurrentUser();
  //result on server side, 
  //const result = await getProjectDetails(params.id) as {project? : ProjectInterface}; 
  
 
  //get if user like or no
  const curlikedProjectIds = session?.user?.likedProjectIds || [];
 
//   if(!result?.project) {
//     <p>Failed to fetch project information.</p>
//   }
//   const projectDetails = result?.project;
  
  //when click inside the detail page, views add 1
//   incrementProjectViews(params.id, projectDetails?.views as number);
  const dummyAvatarUrl = "https://avatar.iran.liara.run/public/boy?username=ali";
  return (
    <Modal>
        <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
            <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
                <Link href='/'>
                    { (
                        <Image
                            src={dummyAvatarUrl}
                            width={50}
                            height={50}
                            alt="profile"
                            className="rounded-full"
                        />
                    )}
                </Link>
                <div className="flex-1 flexStart flex-col gap-1">
                    <p className="self-start text-lg font-semibold">title holder</p>
                    <div className='user-info'>
                      <Link href="/">creator holder</Link>
                      <Image src="/dot.svg" width={4} height={4} alt='dot' />
                      <Link href="/" className="text-primary-purple font-semibold">category holder</Link>
                    </div>
                </div>            
            </div>
            {/* { session?.user?.id === projectDetails?.createdBy?.id && ( */}
                <div className='flex justify-end items-center gap-2'>
                    <ProjectActions projectId={""} />
                </div>
            {/* )} */}
        </section>
        <section className="mt-14 bg-slate-200">
            <Image src="" width={1064} height={798} alt='project poster' className="object-cover rounded-2xl" />
        </section>

        <section className="flexCenter flex-col mt-20">
            <p className='max-w-5xl text-xl font-normal'>description holder</p>
            <div className='flex flex-wrap mt-5 gap-5'>
                <Link href="" target="_blank" rel="noreferrer" className='flexCenter gap-w text-sm font-medium text-primary-purple'>
                🖥 <span className='underline'>Github</span>
                </Link>
                
                <Image src="/dot.svg" width={4} height={4} alt='dot' />
                <Link href="" target="_blank" rel="noreferrer" className='flexCenter gap-w text-sm font-medium text-primary-purple'>
                🚀 <span className='underline'>Live Site</span>
                </Link>
            </div>
            <div className="flex mt-2 gap-2">
                <p>user like button holder</p>
            {/* <UserLikeBtn projectId="" userId={session?.user?.id} likedProjectIds={curlikedProjectIds} likeBtnHandler={likeBtnHandler} /> */}
            </div>
        </section>

        {/* <section className='flexCenter w-full gap-8 mt-28'>
            <span className='w-full h-0.5 bg-light-white-200'/>
            <Link href='/' className='min-w-[82px] h-[82px]'>
                {projectDetails?.createdBy?.avatarUrl && (
                    <Image
                        src={projectDetails?.createdBy?.avatarUrl || ""}
                        width={80}
                        height={80}
                        alt="profile image"
                        className="rounded-full"
                    />
                )}
            </Link>
            <span className='w-full h-0.5 bg-light-white-200'/>
        </section> */}
        {/* <RelatedProjects userId={projectDetails?.createdBy?.id || ""} projectId={projectDetails?.id || ""} /> */}
    </Modal>
  )
}

export default Project