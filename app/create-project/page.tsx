import { redirect } from "next/navigation";
import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getCurrentUser } from "@/lib/session";
import { SessionInterface } from "@/common.types";

const CreateProject = async () => {
  //build a test session for office old no local grafbase db mac
  const session: SessionInterface = {
    user: {
      id: "12345",
      name: "Meow Meow",
      email: "john.doe@example.com",
      image: "https://i.ibb.co/XCBbpD6/avatar.jpg",
      avatarUrl: "https://i.ibb.co/XCBbpD6/avatar.jpg",
    },
    expires: "",
  };

  //const session = await getCurrentUser();
  if (!session?.user) redirect("/");

  return (
    <Modal>
      <h3 className="modal-head-text">Create New Project</h3>

      <ProjectForm type="create" session={session} />
    </Modal>
  );
};

export default CreateProject;
