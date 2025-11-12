"use client";

import { useState } from "react";
import { Stethoscope, ArrowLeft, type LucideIcon, ArrowRight, LineChart, Users, PlayCircle, Video, Download, Dumbbell } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages, type ImagePlaceholder } from "@/lib/placeholder-images";


type PathwayId = "health" | "sports" | "diagnosis";

interface PathwayContentItem {
  title: string;
  description: string;
}

interface Tutorial {
  title: string;
  duration: string;
  imageUrl: string;
}

interface DownloadableResource {
  title: string;
  description: string;
}

interface Pathway {
  id: PathwayId;
  title: string;
  icon: LucideIcon;
  description: string;
  image: ImagePlaceholder;
  content: PathwayContentItem[];
  videoContent?: {
    mainVideo: {
      title: string;
      description: string;
      imageUrl: string;
    };
    tutorials: Tutorial[];
    resources: DownloadableResource[];
  };
}

const pathwaysData: Pathway[] = [
  {
    id: "health",
    title: "Post-operación",
    icon: Stethoscope,
    description: "Encuentra guías, videos y recomendaciones para tu cuidado después de una cirugía.",
    image: PlaceHolderImages.find(img => img.id === 'healthy-food')!,
    content: [],
    videoContent: {
      mainVideo: {
        title: "Bienvenido a tu camino de bienestar con ima",
        description: "Descubre cómo pequeños pasos pueden transformar tu salud.",
        imageUrl: "https://picsum.photos/seed/main-video/800/450",
      },
      tutorials: [
        { title: "Cómo registrar tus hábitos", duration: "2:40", imageUrl: "https://picsum.photos/seed/tut1/400/225" },
        { title: "Tu primer imá Score", duration: "2:30", imageUrl: "https://picsum.photos/seed/tut2/400/225" },
        { title: "Bitácora médica", duration: "1:30", imageUrl: "https://picsum.photos/seed/tut3/400/225" },
      ],
      resources: [
        { title: "Guía de inicio rápido", description: "Un PDF con los conceptos básicos para empezar a usar la app." },
        { title: "Plan de alimentación semanal", description: "Ejemplo de un plan de comidas saludables para una semana." },
        { title: "Rutina de ejercicios en casa", description: "Una rutina de ejercicios que puedes hacer sin equipo especial." },
      ],
    },
  },
  {
    id: "diagnosis",
    title: "Fisioterapia",
    icon: Dumbbell,
    description: "Recupera tu movimiento paso a paso con los tutoriales y el acompañamiento de ima.",
    image: PlaceHolderImages.find(img => img.id === 'doctor-phone')!,
    content: [
      { title: "Entiende tu condición", description: "Infórmate a través de fuentes confiables sobre tu diagnóstico, tratamiento y pronóstico." },
      { title: "Adherencia al tratamiento", description: "Sigue las indicaciones de tu equipo de salud y no dudes en consultar tus dudas." },
      { title: "Adaptaciones en el estilo de vida", description: "Realiza los cambios necesarios en tu alimentación, actividad y rutina diaria." },
      { title: "Apoyo emocional y comunidad", description: "Busca grupos de apoyo o profesionales de la salud mental para procesar tus emociones." },
    ],
  },
  {
    id: "sports",
    title: "Meta Deportiva",
    icon: LineChart,
    description: "Tu meta deportiva comienza aquí, con el apoyo y guía de ima.",
    image: PlaceHolderImages.find(img => img.id === 'runners')!,
    content: [
      { title: "Define tu objetivo", description: "Establece una meta clara, específica y medible. ¿Qué quieres lograr y para cuándo?" },
      { title: "Plan de entrenamiento", description: "Diseña un programa de entrenamiento progresivo y adaptado a tu disciplina deportiva." },
      { title: "Nutrición para el rendimiento", description: "Ajusta tu dieta para optimizar la energía, la fuerza y la recuperación." },
      { title: "Prevención de lesiones", description: "Incorpora ejercicios de movilidad, flexibilidad y fortalecimiento para mantenerte sin lesiones." },
    ],
  },
];

const PathwaySelection = ({ onSelect }: { onSelect: (pathway: PathwayId) => void }) => (
  <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
    <div className="w-full max-w-6xl text-left">
        <h1 className="text-xl md:text-2xl" style={{ color: '#2A97B0' }}>
            <span className="font-bold" style={{ color: '#2A97B0' }}>ima.</span> Bienvenido al portal <span className="font-bold">del Dr. Sebastián Armida</span> — Tu espacio para aprender, mejorar y cuidar tu salud.
        </h1>
        <p className="mt-4 text-lg" style={{ color: '#656E6B' }}>
          Selecciona tu camino y deja que ima te acompañe.
        </p>
    </div>
    <div className="grid grid-cols-1 gap-8 w-full max-w-4xl pt-8">
      {pathwaysData.map((path) => (
        <Card
            key={path.id}
            onClick={() => onSelect(path.id)}
            className="relative rounded-2xl overflow-hidden h-auto md:h-64 w-full group cursor-pointer transition-all duration-300 hover:shadow-2xl shadow-border/20 hover:shadow-border/40 aspect-[16/9] md:aspect-auto"
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
            className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent transition-colors duration-300 group-hover:from-black/80" />
          <div className="relative h-full flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 text-white">
            <div className="flex items-start text-left flex-col gap-2">
              <h3 className="text-xl md:text-2xl font-bold">{path.title}</h3>
              <p className="text-sm opacity-90">{path.description}</p>
            </div>
            <Button variant="accent" size="lg" className="rounded-full mt-4 md:mt-0 md:ml-4 transition-transform duration-300 group-hover:scale-105">
              Entrar <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const HealthPathwayContent = ({ videoContent, onBack }: { videoContent: Pathway['videoContent'], onBack: () => void }) => {
  if (!videoContent) return null;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
       <div className="w-full max-w-6xl mx-auto mb-8">
        <h1 className="text-xl">
            <span className="font-bold text-primary">ima.</span>
        </h1>
      </div>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">{videoContent.mainVideo.title}</h2>
        <p className="text-muted-foreground mt-2">{videoContent.mainVideo.description}</p>
      </div>

      <Card className="overflow-hidden mb-12 border-2 border-primary/20 shadow-lg shadow-primary/10">
        <div className="relative aspect-video">
          <Image src={videoContent.mainVideo.imageUrl} alt="Video principal" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <PlayCircle className="w-16 h-16 md:w-20 md:h-20 text-white/70 hover:text-white transition-colors cursor-pointer hover:scale-110 duration-300" />
          </div>
        </div>
      </Card>

      <div className="mb-12">
        <h3 className="text-xl md:text-2xl font-bold mb-6">Tutoriales</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {videoContent.tutorials.map((tutorial, index) => (
            <Card key={index} className="overflow-hidden group cursor-pointer transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10">
              <div className="relative aspect-video">
                <Image src={tutorial.imageUrl} alt={tutorial.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayCircle className="w-12 h-12 text-white/80" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">{tutorial.duration}</div>
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-foreground truncate">{tutorial.title}</h4>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <Video className="w-4 h-4 text-primary" />
                  <span>{tutorial.duration}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl md:text-2xl font-bold mb-6">Recursos descargables</h3>
        <div className="space-y-4">
          {videoContent.resources.map((resource, index) => (
            <Card key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 transition-all duration-300 hover:bg-accent/20 hover:shadow-md hover:border-primary/30 gap-4">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/30 text-primary flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{resource.title}</h4>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                Descargar
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      </div>

       <Button variant="ghost" onClick={onBack} className="mt-12 text-primary hover:text-primary/80 hover:bg-accent/50">
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a los caminos
      </Button>
    </div>
  );
};


const DefaultPathwayContent = ({ pathway, onBack }: { pathway: Pathway, onBack: () => void }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Button variant="ghost" onClick={onBack} className="mb-8 text-primary hover:text-primary/80 hover:bg-accent/50">
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a los caminos
      </Button>
      <Card className="p-6 md:p-8 bg-card/50 border-border shadow-lg">
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
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-accent/30 border border-transparent hover:border-primary/50 transition-colors duration-300">
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
          selectedPathway.id === 'health' ? (
            <HealthPathwayContent videoContent={selectedPathway.videoContent} onBack={() => setSelectedPathwayId(null)} />
          ) : (
            <DefaultPathwayContent pathway={selectedPathway} onBack={() => setSelectedPathwayId(null)} />
          )
        ) : (
          <PathwaySelection onSelect={setSelectedPathwayId} />
        )}
      </main>
      <footer className="w-full mt-24 py-8 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground text-sm px-4">
          <p>
            Si tienes alguna duda escríbenos al correo de soporte:{" "}
            <a href="mailto:soporte@preguntaleaima.com" className="text-primary hover:underline">
              soporte@preguntaleaima.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
