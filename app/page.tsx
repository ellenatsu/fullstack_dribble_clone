import { ProjectInterface } from "@/common.types";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";

type SearchParams = {
  category?:string | null;
  endcursor?:string | null;
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
const Home = async () => {
  const data = (await fetchAllProjects("Game Dev")) as ProjectSearch;

  const projectsToDisplay = data?.projectSearch?.edges || [];
  
  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        Categories
        <p className="no-result-text text-center">No projects found</p>
      </section>
    );
  }

  return (
    <section className="flex-start flex-col paddings mb-16">
      <h1>Categories</h1>
      
      <section className="projects-grid">
        {projectsToDisplay.map((
          {node}:{ node: ProjectInterface}) => (
          <ProjectCard 
            key={node?.id}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
          />))}
      </section>

      <h1>LoadMore</h1>
    </section>
  );
};

export default Home;
