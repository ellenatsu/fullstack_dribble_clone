import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";


type SearchParams = {
  category?:string;
  endCursor?:string;
}
type Props = {
  searchParams: SearchParams;
}
type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

const Home = ({ searchParams: {category, endCursor}} : Props) => {

    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">No projects found</p>
      </section>
    );
  
  }
//   return (
//     <section className="flex-start flex-col paddings mb-16">
//       <Categories />
      
//       <section className="projects-grid">
//         {projectsToDisplay.map((
//           {node}:{ node: ProjectInterface}) => (
//           <ProjectCard 
//             key={node?.id}
//             id={node?.id}
//             image={node?.image}
//             title={node?.title}
//             views={node?.views}
//             likes={node?.likes}
//             name={node?.createdBy?.name}
//             avatarUrl={node?.createdBy?.avatarUrl}
//             userId={node?.createdBy?.id}
//           />))}
//       </section>

//       <LoadMore 
//         startCursor={pagination?.startCursor}
//         endCursor={pagination?.endCursor}
//         hasNextPage={pagination?.hasNextPage}
//         hasPreviousPage={pagination?.hasPreviousPage}
//       />
//     </section>
//   );
// };

export default Home;
