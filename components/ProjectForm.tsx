"use client";
import { useState } from "react";
import { ProjectInterface, SessionInterface } from "@/common.types";
import Image from "next/image";
import FormField from "@/components/FormField";
import { categoryFilters } from "@/constants";
import CustomMenu from "@/components/CustomMenu";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

type Props = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};
const ProjectForm = ({ type, session, project }: Props) => {
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // const { token } = await fetchToken();
    // try {
    //   if (type === "create") {
    //     //create project
    //     await createNewProject(form, session?.user?.id, token);
    //     router.push("/");
    //   }
    //   if ( type === "edit") {
    //     //edit project
    //     await updateProject(form, project?.id as string, token);
    //     router.push("/");
    //   } 
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleStateChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  //gonna upload to cloudinary server
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // const file = e.target.files?.[0];
    // if (!file) return;
    // if (!file.type.includes("image"))
    //   return alert("Please upload an image file");

    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onloadend = () => {
    //   const result = reader.result as string;
    //   handleStateChange("image", result);
    // };
  };

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState({
    image: project?.image ||"",
    title: project?.title ||"",
    description: project?.description ||"",
    liveSiteUrl: project?.liveSiteUrl ||"",
    githubUrl: project?.githubUrl ||"",
    category: project?.category ||"",
  });

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create" ? true : false}
          className="form_image-input"
          onChange={(e) => handleChangeImage(e)}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="project poster"
            fill
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="Enter a title for your project"
        setState={(value) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        isTextArea
        setState={(value) => handleStateChange("description", value)}
      />

      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://jsmastery.pro"
        setState={(value) => handleStateChange("liveSiteUrl", value)}
      />

      <FormField
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        placeholder="https://github.com/adrianhajdin"
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <Button
          title={
            isSubmitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProjectForm;


function editProject(form: { image: string; title: string; description: string; liveSiteUrl: string; githubUrl: string; category: string; }, id: string | undefined, token: any) {
  throw new Error("Function not implemented.");
}

