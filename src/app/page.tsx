"use client";

import { Hero } from "@/components/portfolio/Hero";
import { Skills, Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Card } from "@/components/ui";
import { marshaData } from "@/data/marsha";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Skills />
        <Experience />
        <Projects />
        
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 uppercase tracking-tight">
              Academic Background
            </h2>
            <div className="h-0.5 w-16 bg-slate-900"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="card-elegant p-10 border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">Education</h3>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-lg text-slate-900">{marshaData.education.university}</p>
                    <span className="px-3 py-1 bg-slate-900 text-white rounded text-[10px] font-bold uppercase tracking-widest">GPA {marshaData.education.gpa.split(' ')[0]}</span>
                  </div>
                  <p className="text-slate-600 font-bold mb-4">{marshaData.education.degree}</p>
                  <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Target Graduation: {marshaData.education.targetGraduation}</p>
                </div>
                
                <div>
                  <p className="font-bold text-slate-900 mb-4 text-[11px] uppercase tracking-widest">Relevant Coursework</p>
                  <div className="flex flex-wrap gap-2">
                    {marshaData.education.coursework.map((course, i) => (
                      <span key={i} className="text-[13px] font-medium text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="card-elegant p-10 border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-8 pb-2 border-b border-slate-100">Key Achievements</h3>
              <ul className="space-y-6">
                {marshaData.achievements.map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0"></div>
                    <p className="text-slate-700 font-medium leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>
      </motion.div>

      <footer className="py-16 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-1 uppercase">Marsha Dwi Lucyana</h3>
            <p className="text-slate-500 font-medium text-sm italic">Information Technology Undergraduate Student</p>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} Professional Portfolio
          </p>
        </div>
      </footer>
    </main>
  );
}
