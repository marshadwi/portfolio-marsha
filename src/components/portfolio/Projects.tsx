import { Card, Section } from "@/components/ui";
import { marshaData } from "@/data/marsha";
import { ExternalLink, Folder } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import Link from "next/link";

export function Projects() {
  return (
    <Section title="Technical Projects" id="projects">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {marshaData.projects.map((project, i) => (
          <Card key={i} className="card-elegant group flex flex-col p-0 overflow-hidden border-slate-200 bg-white">
            <div className="p-10 flex flex-col h-full">
               <div className="flex justify-between items-start mb-6">
                 <div className="text-slate-900">
                    <Folder size={24} />
                 </div>
                 {project.github && (
                   <Link
                     href={project.github}
                     target="_blank"
                     className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                   >
                     <GithubIcon size={20} />
                   </Link>
                 )}
               </div>
               
               <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-tight">
                 {project.title}
               </h3>
               
               <p className="text-slate-600 text-sm font-medium leading-relaxed mb-8 flex-grow">
                 {project.description}
               </p>
               
               <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                 <div className="flex flex-wrap gap-4">
                    {project.technologies.slice(0, 3).map((tech, j) => (
                      <span key={j} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {tech}
                      </span>
                    ))}
                 </div>
                 <Link 
                   href={project.github || "#"} 
                   target="_blank"
                   className="flex items-center gap-2 text-slate-900 font-bold text-[10px] uppercase tracking-widest hover:underline"
                 >
                   Documentation
                   <ExternalLink size={12}/>
                 </Link>
               </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
