// import { getUserProjects } from "@/lib/actions";
// import { UserProfile } from "@/common.types";
import ProfilePage from "@/components/ProfilePage";

type Props = {
    params : {
        id: string;
    }
}
const UserProfile = async ({params}:Props) => {
  //   const  result = await getUserProjects(params.id, 100) as { user: UserProfile};
  //   if(!result?.user){
  //       return <p className="no-result-text">Failed to get user info.</p>
  //   } 

  // return (
  //   <ProfilePage user={result?.user} />
  // )

  return <p className="no-result-text">user profile holder</p>
}

export default UserProfile 