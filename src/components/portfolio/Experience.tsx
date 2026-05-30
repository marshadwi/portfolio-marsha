import { Card, Section } from "@/components/ui";
import { marshaData } from "@/data/marsha";
import { Code2, Layout, Database, Wrench, CheckCircle2 } from "lucide-react";

export function Skills() {
  const skillCategories = [
    { title: "Backend Systems", icon: <Database size={18}/>, items: marshaData.skills.database.concat(marshaData.skills.frameworks[0]) },
    { title: "Web Development", icon: <Layout size={18}/>, items: ["REST API", "HTML", "CSS", "JavaScript"] },
    { title: "Programming", icon: <Code2 size={18}/>, items: marshaData.skills.programming },
    { title: "Technical Tools", icon: <Wrench size={18}/>, items: marshaData.skills.tools },
  ];

  return (
    <Section title="Technical Competencies" id="skills">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {skillCategories.map((cat, i) => (
          <div key={i} className="flex flex-col">
             <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-100">
                <div className="text-slate-900">
                   {cat.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">{cat.title}</h3>
             </div>
             <ul className="space-y-4">
                {cat.items.map((skill, j) => (
                  <li key={j} className="flex items-center gap-3 text-slate-600 font-semibold text-sm">
                    <CheckCircle2 size={14} className="text-slate-300 shrink-0" />
                    {skill}
                  </li>
                ))}
             </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Experience() {
  return (
    <Section title="Experience & Leadership" id="experience">
      <div className="max-w-4xl mx-auto relative">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200"></div>
        
        <div className="space-y-12">
          {marshaData.experience.map((exp, i) => (
            <div key={i} className="relative pl-8">
              <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-slate-900 z-10"></div>
              
              <Card className="card-elegant p-8 border-slate-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{exp.role}</h3>
                    <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">
                      {exp.organization}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border border-slate-200 px-3 py-1 rounded">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-3">
                  {exp.description.map((item, j) => (
                    <li key={j} className="text-slate-600 text-sm leading-relaxed flex items-start gap-3 font-medium">
                      <span className="w-1 h-1 rounded-full bg-slate-300 mt-2 shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
