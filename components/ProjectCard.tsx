import Link from "next/link";
import Image from "next/image";

type Props = {
    id: string;
    image: string;
    title: string;
    views: number;
    likes: number;
    name: string;
    avatarUrl: string;
    userId: string;
}

const ProjectCard = ({id, image, title, views, likes, name, avatarUrl, userId} : Props) => {
  return (
    <div className="flexStart flex-col rounded-2xl drop-shadow-card">
        <Link href={`/project/${id}`} className="flexCenter group relative w-full h-full">
            <Image
              src={image}
              width={414}
              height={314}
              className="w-full h-full object-cover rounded-2xl"
              alt="porject image"
            />
            <div className="hidden group-hover:flex profile_card-title"><p className="w-full">{title}</p></div>
        </Link>

        <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
          <Link href={`/profile/${userId}`}>
            <div className="flexCenter">
              <Image src={avatarUrl} width={24} height={24} className="rounded-full" alt="avatar" />
            </div>
          </Link>

          <div className="flexCenter gap-3">
            <div className="flexCenter gap-2">
              <Image src="/heart.svg" width={13} height={12} alt="liked" />
              <p className="text-sm">{likes}</p>
            </div>
            <div className="flexCenter gap-2">
              <Image src="/eye.svg" width={13} height={12} alt="viewed" />
              <p className="text-sm">{views}</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProjectCard