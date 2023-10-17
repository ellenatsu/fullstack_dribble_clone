import Link from "next/link";
import Image from "next/image";

type Props = {
    id: string;
    image: string;
    title: string;
    name: string;
    avatarUrl: string;
    userId: string;
}

const ProjectCard = ({id, image, title, name, avatarUrl, userId} : Props) => {
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
    </div>
  )
}

export default ProjectCard