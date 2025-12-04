import { projectsData } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: `Projects - ${siteConfig.title}`,
  description: "Growing list of independent projects done over the years",
};

export default function ProjectsPage() {
  return (
    <div>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Personal Projects
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Growing list of independent projects done over the years
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 pb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {projectsData.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}

