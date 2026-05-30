import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("glass rounded-2xl p-6 transition-all duration-300 hover:glass-dark hover:scale-[1.01]", className)}>
      {children}
    </div>
  );
}

export function Section({ children, id, className, title }: { children: React.ReactNode; id?: string; className?: string; title?: string }) {
  return (
    <section id={id} className={cn("py-20 px-6 max-w-7xl mx-auto", className)}>
      {title && (
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-slate-800">
          <span className="text-gradient">{title}</span>
        </h2>
      )}
      {children}
    </section>
  );
}
