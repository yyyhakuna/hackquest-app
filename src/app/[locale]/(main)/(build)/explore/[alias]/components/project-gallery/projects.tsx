import type { ProjectExtend } from '@/graphql/generated/hooks'
import type React from 'react'
import { ProjectCard } from './project-card'

interface ProjectsProp {
  projects: ProjectExtend[]
}

const Projects: React.FC<ProjectsProp> = ({ projects }) => {
  return (
    <div className="flex flex-wrap gap-6">
      {projects.map((p, _i) => (
        <div key={p.id} className="w-full sm:w-[calc((100%-3rem)/3)]">
          <ProjectCard project={p as ProjectExtend} />
        </div>
      ))}
    </div>
  )
}

export default Projects
