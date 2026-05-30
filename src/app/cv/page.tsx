"use client";

import { marshaData } from "@/data/marsha";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * PRODUCTION-GRADE PDF ENGINE (V6.0 - IRSYAD EDITION)
 * Strategy: Absolute 1-Page Constraint
 * Features: Balanced 12mm Margins, 9pt Body Text, 11pt Headers
 */

interface HTML2PDFOptions {
  margin: number;
  filename: string;
  image: { type: string; quality: number };
  html2canvas: {
    scale: number;
    useCORS: boolean;
    letterRendering: boolean;
    scrollX: number;
    scrollY: number;
    backgroundColor: string;
    onclone: (clonedDoc: Document) => void;
  };
  jsPDF: { unit: string; format: string; orientation: string; compress: boolean };
}

interface PDFInternal {
  getNumberOfPages: () => number;
}

interface PDFInstance {
  internal: PDFInternal;
  deletePage: (n: number) => void;
  save: (name: string) => void;
}

interface HTML2PDFWorker {
  from: (el: HTMLElement) => HTML2PDFWorker;
  set: (opt: HTML2PDFOptions) => HTML2PDFWorker;
  toPdf: () => HTML2PDFWorker;
  get: (type: "pdf") => Promise<PDFInstance>;
  save: () => Promise<void>;
}

declare global {
  interface Window {
    html2pdf: () => HTML2PDFWorker;
  }
}

// Type for the document.fonts API
interface FontFaceSet extends Iterable<FontFace> {
  readonly ready: Promise<FontFaceSet>;
}

export default function CVPage() {
  const [lang, setLang] = useState<"id" | "en">("id");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!window.html2pdf) {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleDownload = async () => {
    const html2pdf = window.html2pdf;
    if (!html2pdf) return;

    const element = document.getElementById("ats-document-root");
    if (!element) return;

    setIsGenerating(true);

    const fonts = (document as unknown as { fonts: FontFaceSet }).fonts;
    await fonts.ready;

    const opt: HTML2PDFOptions = {
      margin: 0,
      filename: `CV_MARSHA_LUCYANA_${lang.toUpperCase()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        letterRendering: false,
        scrollX: 0,
        scrollY: 0,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc: Document) => {
          const body = clonedDoc.body;
          const clonedEl = clonedDoc.getElementById('ats-document-root');
          body.style.margin = '0';
          body.style.padding = '0';
          if (clonedEl) {
            clonedEl.style.position = 'absolute';
            clonedEl.style.top = '0';
            clonedEl.style.left = '0';
            clonedEl.style.margin = '0';
            clonedEl.style.boxShadow = 'none';
          }
        }
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true }
    };

    try {
      const pdfInstance = await html2pdf().from(element).set(opt).toPdf().get('pdf');
      const totalPages = pdfInstance.internal.getNumberOfPages();
      
      if (totalPages > 1) {
        for (let i = totalPages; i > 1; i--) {
          pdfInstance.deletePage(i);
        }
      }
      
      pdfInstance.save(`CV_MARSHA_LUCYANA_${lang.toUpperCase()}.pdf`);
    } catch (err) {
      console.error("PDF_FATAL_ERROR", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen py-10 px-4 flex flex-col items-center antialiased">
      
      {/* HUD CONTROL BAR */}
      <div className="w-full max-w-[210mm] mb-8 flex flex-col md:flex-row justify-between items-center gap-4 no-print border-b border-zinc-800 pb-6">
        <div className="flex flex-col">
          <Link href="/" className="text-[10px] font-black text-zinc-500 hover:text-white transition-all uppercase tracking-[0.4em] flex items-center gap-2">
            ← BACK
          </Link>
          <p className="text-[11px] font-mono text-zinc-400">Layout: Irsyad_Precision_SinglePage</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-zinc-900 border border-zinc-800 p-1 rounded-xl">
            {(["id", "en"] as const).map((l) => (
              <button 
                key={l}
                onClick={() => setLang(l)}
                className={`px-6 py-2 text-[10px] font-black rounded-lg transition-all uppercase ${lang === l ? "bg-white text-black shadow-lg" : "text-zinc-500 hover:text-zinc-200"}`}
              >
                {l}
              </button>
            ))}
          </div>

          <button 
            onClick={handleDownload}
            disabled={isGenerating}
            className={`bg-[#0066FF] text-white px-10 py-3.5 rounded-xl text-[10px] font-black transition-all shadow-xl active:scale-95 ${isGenerating ? "opacity-30 cursor-wait" : "hover:bg-[#0052cc]"}`}
          >
            {isGenerating ? "PRODUCING..." : "DOWNLOAD_CV"}
          </button>
        </div>
      </div>

      {/* 
          ATS DOCUMENT ROOT (IRSYAD STYLE)
          Balanced 12mm Margins All Around
      */}
      <div 
        id="ats-document-root" 
        className="bg-white text-black flex flex-col overflow-hidden" 
        style={{ 
          width: '210mm', 
          height: '296.8mm', 
          padding: '12mm', 
          boxSizing: 'border-box',
          fontFamily: '"Times New Roman", Times, serif',
          color: '#000000',
          position: 'relative'
        }}
      >
        {/* HEADER: COMPACT 4:3 IDENTITY */}
        <header className="border-b-[1.5pt] border-black pb-3 mb-4 flex justify-between items-end w-full">
          <div className="flex-1 text-left">
            <h1 className="text-[24pt] font-bold uppercase leading-none mb-2 tracking-tighter">
              Marsha Dwi Lucyana
            </h1>
            <div className="text-[9pt] font-medium text-zinc-800 flex flex-wrap gap-x-4 gap-y-1">
              <p><strong>Loc:</strong> {marshaData.location}</p>
              <p><strong>Tel:</strong> {marshaData.phone}</p>
              <p><strong>Mail:</strong> {marshaData.email}</p>
              <p><strong>Git:</strong> github.com/{marshaData.github}</p>
            </div>
          </div>
          
          <div 
            className="border-[1pt] border-black overflow-hidden bg-white relative"
            style={{ width: '24mm', height: '32mm' }} 
          >
            <Image 
              src={marshaData.profileImage} 
              alt={marshaData.name} 
              fill
              className="object-cover grayscale"
              unoptimized
            />
          </div>
        </header>

        {/* CONTENT ARCHITECTURE - MAXIMUM DENSITY */}
        <div className="flex flex-col gap-3 w-full">
          
          <section>
            <h2 className="text-[11pt] font-bold uppercase border-b-[0.5pt] border-black mb-1 tracking-wider">Professional Summary</h2>
            <p className="text-[9pt] text-justify leading-[1.4]">
              {lang === 'id' ? marshaData.summary : marshaData.summaryEn}
            </p>
          </section>

          <section>
            <h2 className="text-[11pt] font-bold uppercase border-b-[0.5pt] border-black mb-1 tracking-wider">Technical Infrastructure</h2>
            <div className="grid grid-cols-2 gap-x-10 text-[9pt] leading-tight">
              <p><strong>Languages:</strong> {marshaData.skills.programming.join(", ")}</p>
              <p><strong>Frameworks:</strong> {marshaData.skills.frameworks.join(", ")}</p>
              <p><strong>Databases:</strong> {marshaData.skills.database.join(", ")}</p>
              <p><strong>Tools:</strong> {marshaData.skills.tools.join(", ")}</p>
            </div>
          </section>

          <section>
            <h2 className="text-[11pt] font-bold uppercase border-b-[0.5pt] border-black mb-1.5 tracking-wider">Professional Experience</h2>
            <div className="space-y-2.5">
              {marshaData.experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline leading-none">
                    <span className="text-[10pt] font-bold">{exp.organization}</span>
                    <span className="text-[8.5pt] italic text-zinc-600">{lang === 'id' ? exp.period : exp.periodEn}</span>
                  </div>
                  <div className="text-[9pt] font-bold text-zinc-800 mb-0.5">{lang === 'id' ? exp.role : exp.roleEn}</div>
                  <ul className="list-disc pl-4 text-[9pt] space-y-0.5 leading-snug">
                    {(lang === 'id' ? exp.description : exp.descriptionEn).map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[11pt] font-bold uppercase border-b-[0.5pt] border-black mb-1 tracking-wider">Education</h2>
            <div className="flex justify-between items-baseline">
              <div>
                <span className="text-[10pt] font-bold">{marshaData.education.university}</span>
                <p className="text-[9pt] italic leading-tight">{lang === 'id' ? marshaData.education.degree : marshaData.education.degreeEn}</p>
              </div>
              <div className="text-right">
                <span className="text-[10pt] font-bold uppercase">GPA: {marshaData.education.gpa.split(' ')[0]}</span>
                <p className="text-[8.5pt] text-zinc-500 italic leading-none">Class of {marshaData.education.targetGraduation}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-[11pt] font-bold uppercase border-b-[0.5pt] border-black mb-1.5 tracking-wider">Key Engineering Projects</h2>
            <div className="space-y-2">
              {marshaData.projects.slice(0, 3).map((project, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-0.5 leading-none">
                    <span className="text-[9.5pt] font-bold">{project.title}</span>
                    <span className="text-[8pt] font-bold text-zinc-500">[{project.technologies.slice(0, 3).join(", ")}]</span>
                  </div>
                  <p className="text-[9pt] leading-tight text-zinc-800">{lang === 'id' ? project.description : project.descriptionEn}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[11pt] font-bold uppercase border-b-[0.5pt] border-black mb-1 tracking-wider">Achievements</h2>
            <ul className="list-disc pl-4 text-[9pt] space-y-0.5 leading-snug">
              {marshaData.achievements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* BOTTOM LOCK */}
        <div className="mt-auto pt-4 flex justify-center items-center">
           <div className="h-[0.5pt] bg-zinc-100 flex-1"></div>
           <p className="px-4 text-[8pt] text-zinc-300 font-bold uppercase tracking-[0.5em] whitespace-nowrap">Marsha Dwi Lucyana</p>
           <div className="h-[0.5pt] bg-zinc-100 flex-1"></div>
        </div>
      </div>
    </div>
  );
}
