import { projects, team, milestones } from "./data";
import type { Locale, Project } from "@/types/content";
export const getProjects = () => projects;
export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);
export const getProjectTeam = (project: Project) =>
  team.filter((p) => project.teamMemberIds.includes(p.id));
export const getMemberProjects = (id: string) =>
  projects.filter((p) => p.teamMemberIds.includes(id));
export const getRelatedProjects = (project: Project) =>
  projects
    .filter((p) => p.id !== project.id)
    .sort(
      (a, b) =>
        Number(b.category === project.category) -
        Number(a.category === project.category),
    )
    .slice(0, 2);
export const getMilestones = () =>
  [...milestones].sort((a, b) => a.year - b.year);
export function filterProjects({
  category = "",
  status = "",
  query = "",
  sort = "newest",
  locale = "en",
}: {
  category?: string;
  status?: string;
  query?: string;
  sort?: string;
  locale?: Locale;
}) {
  return projects
    .filter(
      (p) =>
        (!category || p.category === category) &&
        (!status || p.status === status) &&
        p.title[locale]
          .toLocaleLowerCase(locale)
          .includes(query.trim().toLocaleLowerCase(locale)),
    )
    .sort((a, b) =>
      sort === "oldest"
        ? a.startDate.localeCompare(b.startDate)
        : b.startDate.localeCompare(a.startDate),
    );
}
