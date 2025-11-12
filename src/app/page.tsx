"use client";

import { useState } from "react";
import { HeartPulse, Dumbbell, Stethoscope, ArrowLeft, type LucideIcon, ArrowRight, LineChart, Users } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages, type ImagePlaceholder } from "@/lib/placeholder-images";


type PathwayId = "health" | "sports" | "diagnosis";

interface Pathway {
  id: PathwayId;
  title: string;
  icon: LucideIcon;
  description: string;
  image: ImagePlaceholder;
  content: {
    title: string;
    description: string;
  }[];
}

const pathwaysData: Pathway[] = [
  {
    id: "health",
    title: "Quiero empezar a cuidar mi salud",
    icon: HeartPulse,
    description: "Hábitos, guía diaria y tips sencillos.",
    image: PlaceHolderImages.find(img => img.id === 'healthy-food')!,
    content: [
      { title: "Evaluación inicial", description: "Entiende tu punto de partida. Realiza un chequeo médico y evalúa tus hábitos actuales." },
      { title: "Nutrición consciente", description: "Aprende los principios de una alimentación balanceada y cómo aplicarlos en tu día a día." },
      { title: "Actividad física regular", description: "Encuentra una actividad que disfrutes y conviértela en parte de tu rutina semanal." },
      { title: "Descanso y manejo del estrés", description: "La recuperación es clave. Prioriza un sueño de calidad y aprende técnicas de relajación." },
    ],
  },
  {
    id: "sports",
    title: "Tengo una meta deportiva",
    icon: LineChart,
    description: "Plan, progreso y motivación con High Performance.",
    image: PlaceHolderImages.find(img => img.id === 'runners')!,
    content: [
      { title: "Define tu objetivo", description: "Establece una meta clara, específica y medible. ¿Qué quieres lograr y para cuándo?" },
      { title: "Plan de entrenamiento", description: "Diseña un programa de entrenamiento progresivo y adaptado a tu disciplina deportiva." },
      { title: "Nutrición para el rendimiento", description: "Ajusta tu dieta para optimizar la energía, la fuerza y la recuperación." },
      { title: "Prevención de lesiones", description: "Incorpora ejercicios de movilidad, flexibilidad y fortalecimiento para mantenerte sin lesiones." },
    ],
  },
  {
    id: "diagnosis",
    title: "Tengo un diagnóstico",
    icon: Users,
    description: "Acompañamiento empático y herramientas prácticas.",
    image: PlaceHolderImages.find(img => img.id === 'doctor-phone')!,
    content: [
      { title: "Entiende tu condición", description: "Infórmate a través de fuentes confiables sobre tu diagnóstico, tratamiento y pronóstico." },
      { title: "Adherencia al tratamiento", description: "Sigue las indicaciones de tu equipo de salud y no dudes en consultar tus dudas." },
      { title: "Adaptaciones en el estilo de vida", description: "Realiza los cambios necesarios en tu alimentación, actividad y rutina diaria." },
      { title: "Apoyo emocional y comunidad", description: "Busca grupos de apoyo o profesionales de la salud mental para procesar tus emociones." },
    ],
  },
];

const PathwaySelection = ({ onSelect }: { onSelect: (pathway: PathwayId) => void }) => (
  <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
    <div>
        <h1 className="text-3xl font-bold">
            <span className="text-lime-400">ima.</span> Bienvenido al portal <span className="font-bold">Chantilly x ima</span> — Tu espacio para aprender, mejorar y cuidar tu salud.
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
            Selecciona tu camino y deja que ima te acompañe.
        </p>
    </div>
    <div className="grid grid-cols-1 gap-8 w-full max-w-6xl">
      {pathwaysData.map((path) => (
        <Card
            key={path.id}
            onClick={() => onSelect(path.id)}
            className="relative rounded-2xl overflow-hidden h-48 w-full group cursor-pointer"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(path.id); }}
            aria-label={`Seleccionar camino: ${path.title}`}
        >
          <Image
            src={path.image.imageUrl}
            alt={path.image.description}
            data-ai-hint={path.image.imageHint}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full flex items-center p-8 text-white">
            <div className="flex items-center gap-4 text-left">
              <path.icon className="w-8 h-8 opacity-70" />
              <div>
                <h3 className="text-2xl font-bold">{path.title}</h3>
                <p className="text-sm opacity-90">{path.description}</p>
              </div>
            </div>
            <Button variant="accent" size="lg" className="absolute right-8">
              Entrar <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const PathwayContent = ({ pathway, onBack }: { pathway: Pathway, onBack: () => void }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Button variant="ghost" onClick={onBack} className="mb-8 text-primary hover:text-primary/80 hover:bg-accent/50">
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a los caminos
      </Button>
      <Card className="p-6 md:p-8 bg-card/50 border-border">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="p-3 bg-accent/30 rounded-full flex-shrink-0">
            <pathway.icon className="w-10 h-10 md:w-12 md:h-12 text-primary" />
          </div>
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">{pathway.title}</h2>
            <p className="text-base md:text-lg text-muted-foreground">
              {pathway.description}
            </p>
          </div>
        </div>
        <Separator className="my-6 md:my-8 bg-border" />
        <div className="space-y-4">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground">Tu plan de acción</h3>
          <div className="space-y-4">
            {pathway.content.map((item, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-accent/30 border border-transparent hover:border-primary/50 transition-colors">
                <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default function Home() {
  const [selectedPathwayId, setSelectedPathwayId] = useState<PathwayId | null>(null);

  const selectedPathway = pathwaysData.find(p => p.id === selectedPathwayId) || null;

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        {selectedPathway ? (
          <PathwayContent pathway={selectedPathway} onBack={() => setSelectedPathwayId(null)} />
        ) : (
          <PathwaySelection onSelect={setSelectedPathwayId} />
        )}
      </main>
      <footer className="py-8 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Ima Health Navigator. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
