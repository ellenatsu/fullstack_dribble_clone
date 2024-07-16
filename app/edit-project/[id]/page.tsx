import { redirect } from "next/navigation";
import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getCurrentUser } from "@/lib/session";
import { ProjectInterface } from "@/common.types";

const EditProject = async ({params: {id}} : {params: {id: string}}) => {

  // const session = await getCurrentUser();
  // if (!session?.user) redirect("/");

  //get project details
  //const result = await getProjectDetails(id) as {project?: ProjectInterface};

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>
      <p>project form to edit holder</p>

      {/* <ProjectForm type="edit" session={session} project={result?.project} /> */}
    </Modal>
  );
};

export default EditProject;
