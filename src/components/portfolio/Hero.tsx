"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, FileText, ArrowDown, GraduationCap, Laptop, Code2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { marshaData } from "@/data/marsha";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 py-20 bg-elegant-gradient">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Profile Photo */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 relative mx-auto w-32 h-32 md:w-40 md:h-40"
          >
            <div className="absolute inset-0 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100">
              <Image 
                src={marshaData.profileImage} 
                alt={marshaData.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative Ring */}
            <div className="absolute -inset-2 rounded-full border border-slate-200 opacity-50"></div>
          </motion.div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-slate-50 text-slate-600 rounded-lg text-[11px] font-bold uppercase tracking-widest border border-slate-200">
            Student Researcher | Backend Developer
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            Marsha Dwi Lucyana
          </h1>
          
          <div className="text-lg md:text-xl text-slate-700 mb-10 max-w-2xl mx-auto leading-relaxed space-y-6 font-medium">
            <p>
              Undergraduate Information Technology student with a focus on Software Engineering and Backend Development. 
              Dedicated to building scalable systems and mastering modern web architectures.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-slate-600 text-sm font-medium border border-slate-200">
              <MapPin size={16} />
              {marshaData.location}
            </div>
            <a href={`mailto:${marshaData.email}`} className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 transition-all rounded-lg text-slate-800 text-sm font-bold border border-slate-200 shadow-sm">
              <Mail size={16} />
              Email Contact
            </a>
            <a href={marshaData.githubUrl} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 transition-all rounded-lg text-slate-800 text-sm font-bold border border-slate-200 shadow-sm">
              <GithubIcon size={16} />
              GitHub Profile
            </a>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              href="#projects"
              className="px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-base hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              Portfolio Projects
            </Link>
            <Link
              href="/cv"
              className="px-8 py-4 bg-white text-slate-900 border border-slate-300 rounded-xl font-bold text-base hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <FileText size={20} />
              Professional CV
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Hero Stats */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 border-t border-slate-200 pt-12">
        <Stat icon={<GraduationCap size={18}/>} label="Academic GPA" value={marshaData.education.gpa.split(' ')[0]} />
        <Stat icon={<Laptop size={18}/>} label="Total Projects" value={`${marshaData.projects.length} Entries`} />
        <Stat icon={<Code2 size={18}/>} label="Core Specialization" value="Backend Systems" className="hidden md:flex" />
      </div>

      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10"
      >
        <ArrowDown size={24} className="text-slate-300" />
      </motion.div>
    </section>
  );
}

function Stat({ icon, label, value, className = "" }: { icon: React.ReactNode; label: string; value: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center md:items-start gap-1 ${className}`}>
      <div className="text-slate-400 mb-1">{icon}</div>
      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
      <span className="text-lg font-bold text-slate-900">{value}</span>
    </div>
  );
}
