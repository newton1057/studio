
"use client";

import { useState } from "react";
import { Stethoscope, ArrowLeft, type LucideIcon, ArrowRight, LineChart, Users, PlayCircle, Video, Download, Dumbbell } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages, type ImagePlaceholder } from "@/lib/placeholder-images";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";


type PathwayId = "health" | "sports" | "diagnosis";

interface PathwayContentItem {
  title: string;
  description: string;
}

interface Tutorial {
  title: string;
  duration: string;
  imageUrl: string;
  videoUrl?: string;
  placeholder?: boolean;
}

interface DownloadableResource {
  title: string;
  description: string;
  url?: string;
  placeholder?: boolean;
}

interface MainVideo {
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
}

interface Pathway {
  id: PathwayId;
  title: string;
  icon: LucideIcon;
  description: string;
  image: ImagePlaceholder;
  content?: PathwayContentItem[];
  videoContent?: {
    mainVideo: MainVideo;
    tutorials: Tutorial[];
    resources: DownloadableResource[];
  };
}

const healthTutorials: Tutorial[] = Array.from({ length: 15 }, (_, i) => ({
    title: `Tutorial de salud ${i + 1}`,
    duration: `${Math.floor(Math.random() * 5) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    imageUrl: `https://picsum.photos/seed/tut-health-${i}/400/225`,
}));

healthTutorials[0] = {
    title: "Cirugías y procedimientos",
    duration: "0:15",
    imageUrl: "https://i.ytimg.com/vi/FMYwRvIQgYA/hqdefault.jpg",
    videoUrl: "https://youtube.com/shorts/FMYwRvIQgYA?feature=share"
};

healthTutorials[1] = {
    title: "Tratamientos activos",
    duration: "0-15",
    imageUrl: "https://i.ytimg.com/vi/2rIVzmtQF9c/hqdefault.jpg",
    videoUrl: "https://youtube.com/shorts/2rIVzmtQF9c"
};

healthTutorials[2] = {
    title: "Bitácora ima",
    duration: "0-15",
    imageUrl: "https://i.ytimg.com/vi/2dSRrA9HuUA/hqdefault.jpg",
    videoUrl: "https://youtube.com/shorts/2dSRrA9HuUA"
};

healthTutorials[3] = {
    title: "Estudios y análisis",
    duration: "0-15",
    imageUrl: "https://i.ytimg.com/vi/164-3IKkgw4/hqdefault.jpg",
    videoUrl: "https://youtube.com/shorts/164-3IKkgw4"
};

healthTutorials[4] = {
    title: "Banderas de riesgo",
    duration: "0-15",
    imageUrl: "https://i.ytimg.com/vi/rPoZixLX3Vs/hqdefault.jpg",
    videoUrl: "https://youtube.com/shorts/rPoZixLX3Vs"
};

healthTutorials[5] = {
    title: "Pregúntale a ima",
    duration: "0-15",
    imageUrl: "https://i.ytimg.com/vi/r8R29FTY_0Y/hqdefault.jpg",
    videoUrl: "https://youtube.com/shorts/r8R29FTY_0Y"
};

healthTutorials[6] = {
    title: "ima Score",
    duration: "0-15",
    imageUrl: "https://i.ytimg.com/vi/Z6Vqx2lwyRk/hqdefault.jpg",
    videoUrl: "https://youtube.com/shorts/Z6Vqx2lwyRk"
};

healthTutorials[7] = {
    title: "Sueño",
    duration: "0-15",
    imageUrl: "https://i.ytimg.com/vi/__P-BjWo3qw/hqdefault.jpg",
    videoUrl: "https://youtube.com/shorts/__P-BjWo3qw"
};

healthTutorials[8] = {
    title: "Consejo y metas diarias",
    duration: "0-15",
    imageUrl: "https://i.ytimg.com/vi/a_-mkc5Axbk/hqdefault.jpg",
    videoUrl: "https://youtube.com/shorts/a_-mkc5Axbk"
};

healthTutorials[9] = {
    title: "Suplementos y vitaminas",
    duration: "0-15",
    imageUrl: "https://i.ytimg.com/vi/c9RvAaxVhtw/hqdefault.jpg",
    videoUrl: "https://youtube.com/shorts/c9RvAaxVhtw"
};

healthTutorials[10] = {
    title: "Alergias",
    duration: "0-15",
    imageUrl: "https://i.ytimg.com/vi/RhRJVVKWJfo/hqdefault.jpg",
    videoUrl: "https://youtube.com/shorts/RhRJVVKWJfo"
};

healthTutorials[11] = {
    title: "Actividad física",
    duration: "0-15",
    imageUrl: "https://i.ytimg.com/vi/KKvGd2UlwJA/hqdefault.jpg",
    videoUrl: "https://youtube.com/shorts/KKvGd2UlwJA"
};

healthTutorials[12] = {
    title: "Consumo de agua",
    duration: "0-15",
    imageUrl: "https://i.ytimg.com/vi/nW05rLxU5c0/hqdefault.jpg",
    videoUrl: "https://youtube.com/shorts/nW05rLxU5c0"
};

healthTutorials[13] = {
    title: "Pasos diarios",
    duration: "0-15",
    imageUrl: "https://i.ytimg.com/vi/z_oYFuk9qic/hqdefault.jpg",
    videoUrl: "https://youtube.com/shorts/z_oYFuk9qic"
};

healthTutorials[14] = {
    title: "Árbol familiar",
    duration: "0-15",
    imageUrl: "https://i.ytimg.com/vi/aiQ37kIQ81Q/hqdefault.jpg",
    videoUrl: "https://youtube.com/shorts/aiQ37kIQ81Q"
};

const findTutorial = (title: string) => healthTutorials.find(t => t.title === title)!;

const healthResources: DownloadableResource[] = [
  {
    title: "Bitácora ima",
    url: "https://drive.google.com/file/d/13AqkNkl5axBnbTy54aB7uAYZcnkLm6KQ/view?usp=drive_link",
    description: "seguimiento general de evolución y registros médicos",
  },
  { 
    title: "Banderas de riesgo", 
    description: "detección temprana de complicaciones", 
    url: "https://drive.google.com/file/d/1h9YI8AfV5MpRhowAUn4pehJBc3lVdvYg/view?usp=drive_link" 
  },
  {
    title: "Pregúntale a ima",
    url: "https://drive.google.com/file/d/1JU9XpXaTptAjWPgRQFZSeJDZfRJhFKSK/view?usp=drive_link",
    description: "resolución de dudas sobre cuidados y síntomas",
  },
  {
    title: "Sueño",
    url: "https://drive.google.com/file/d/1g4XCShV_IYqR5knHoKC3G-Lw3OttmyFX/view?usp=drive_link",
    description: "recuperación y descanso óptimo",
  },
  {
    title: "Consejo y metas diarias",
    url: "https://drive.google.com/file/d/1ehS6N5yTl8IBiyjtVwXiLtjY8651VhTV/view?usp=drive_link",
    description: "rutinas ligeras, control del progreso",
  },
  {
    title: "Actividad física",
    url: "https://drive.google.com/file/d/1-wkMhXp3MAujF6Ame_NMQtZi98j6JYMC/view?usp=drive_link",
    description: "retorno gradual al movimiento",
  },
  {
    title: "Consumo de agua",
    url: "https://drive.google.com/file/d/1xsoIkxxWTnID3KImvRh55BQX2dNxy20q/view?usp=drive_link",
    description: "importante para hidratación y cicatrización",
  },
  {
    title: "Pasos diarios",
    url: "https://drive.google.com/file/d/1AgQbxPqR-qG4bvn638_G--Ehfqhrk95r/view?usp=drive_link",
    description: "progresión funcional",
  },
  {
    title: "Árbol familiar",
    url: "https://drive.google.com/file/d/1mjXPZWdDr1oeEJ91s6RGMcrizGTFURJs/view?usp=drive_link",
    description: "antecedentes",
  },
  {
    title: "ima Score",
    description: "Tu calificación de salud personalizada.",
    url: "https://drive.google.com/file/d/1f70f69022c4f691b059f3b1406f36616/view?usp=sharing"
  },
  {
    title: "Métricas y hábitos personalizados",
    description: "rango de movilidad",
    url: "https://drive.google.com/file/d/1sW1ubTWQxt1_Gvb94osPnHTjaRGYeU-Z/view?usp=drive_link"
  },
  {
    title: "High performance",
    url: "https://drive.google.com/file/d/1ADwIf-c81RMCAqzv2aHi6TBQQcMKroAn/view?usp=drive_link",
    description: "función central para entrenamiento y rendimiento",
  },
  {
    title: "Plato macros",
    url: "https://drive.google.com/file/d/1H2D1Q4v_zfCv0nf_XK66DcHg5rXodFLH/view?usp=drive_link",
    description: "control de calorías y nutrición",
  },
];

const findResource = (title: string) => healthResources.find(t => t.title === title)!;

const postOpVideoContent = {
  mainVideo: {
    title: "Bienvenido a tu camino de bienestar con ima",
    description: "Descubre cómo pequeños pasos pueden transformar tu salud.",
    imageUrl: "https://i.ytimg.com/vi/fnUOdFE3b_8/hqdefault.jpg",
    videoUrl: "https://youtu.be/fnUOdFE3b_8"
  },
  tutorials: healthTutorials.slice(0, 15),
  resources: [
    findResource("Bitácora ima"),
    findResource("Banderas de riesgo"),
    findResource("Pregúntale a ima"),
    findResource("Sueño"),
    findResource("Consejo y metas diarias"),
    findResource("Actividad física"),
    findResource("Consumo de agua"),
    findResource("Pasos diarios"),
    findResource("Árbol familiar")
  ].filter(Boolean) as DownloadableResource[],
};

const placeholderResource: DownloadableResource = {
    title: "Próximamente",
    description: "Una nueva herramienta para tu bienestar.",
    placeholder: true,
};

const physiotherapyTutorials: Tutorial[] = [
    findTutorial("Tratamientos activos"),
    findTutorial("Actividad física"),
    findTutorial("Estudios y análisis"),
    findTutorial("Cirugías y procedimientos"),
    findTutorial("Banderas de riesgo"),
    findTutorial("Bitácora ima"),
    findTutorial("Pregúntale a ima"),
    findTutorial("ima Score"),
    findTutorial("Consejo y metas diarias"),
    findTutorial("Sueño"),
    findTutorial("Suplementos y vitaminas"),
    findTutorial("Alergias"),
    { title: "Métricas y hábitos personalizados", duration: "0:15", imageUrl: "https://i.ytimg.com/vi/kdYVc3YkSzs/hqdefault.jpg", videoUrl: "https://youtube.com/shorts/kdYVc3YkSzs" },
    findTutorial("Consumo de agua"),
    findTutorial("Pasos diarios"),
    findTutorial("Árbol familiar"),
];

const physiotherapyResources: DownloadableResource[] = [
    findResource("Bitácora ima"),
    findResource("Actividad física"),
    placeholderResource,
    findResource("Pregúntale a ima"),
    findResource("ima Score"),
    findResource("Consejo y metas diarias"),
    findResource("Sueño"),
    placeholderResource,
    findResource("Consumo de agua"),
    findResource("Pasos diarios"),
    findResource("Árbol familiar"),
].filter(Boolean) as DownloadableResource[];

const sportsTutorials: Tutorial[] = [
    { title: "High Performance", duration: "0:15", imageUrl: "https://i.ytimg.com/vi/agpgRBWMKQ8/hqdefault.jpg", videoUrl: "https://youtube.com/shorts/agpgRBWMKQ8?feature=share" },
    findTutorial("Actividad física"),
    findTutorial("Consejo y metas diarias"),
    findTutorial("ima Score"),
    findTutorial("Bitácora ima"),
    findTutorial("Estudios y análisis"),
    findTutorial("Suplementos y vitaminas"),
    findTutorial("Tratamientos activos"),
    findTutorial("Sueño"),
    { title: "Plato de macros", duration: "0:15", imageUrl: "https://i.ytimg.com/vi/aZlHc9gi5Ck/hqdefault.jpg", videoUrl: "https://youtube.com/shorts/aZlHc9gi5Ck" },
    findTutorial("Consumo de agua"),
    findTutorial("Pasos diarios"),
    physiotherapyTutorials[12], // Métricas y hábitos personalizados
    findTutorial("Pregúntale a ima"),
    findTutorial("Banderas de riesgo"),
    findTutorial("Alergias"),
    findTutorial("Cirugías y procedimientos"),
    findTutorial("Árbol familiar"),
];

const sportsResources: DownloadableResource[] = [
    findResource("High performance"),
    findResource("Actividad física"),
    findResource("Consejo y metas diarias"),
    findResource("ima Score"),
    findResource("Bitácora ima"),
    findResource("Sueño"),
    findResource("Plato macros"),
    findResource("Consumo de agua"),
    findResource("Pasos diarios"),
    findResource("Métricas y hábitos personalizados"),
    findResource("Pregúntale a ima"),
    findResource("Banderas de riesgo"),
    findResource("Árbol familiar"),
].filter(Boolean) as DownloadableResource[];

const pathwaysData: Pathway[] = [
  {
    id: "health",
    title: "Post-operación",
    icon: Stethoscope,
    description: "cuidados, rutinas y pasos para tu recuperación",
    image: PlaceHolderImages.find(img => img.id === 'healthy-food')!,
    videoContent: postOpVideoContent,
  },
  {
    id: "diagnosis",
    title: "Fisioterapia",
    icon: Dumbbell,
    description: "ejercicios, guías y videos para tu recuperación",
    image: PlaceHolderImages.find(img => img.id === 'doctor-phone')!,
    videoContent: {
        mainVideo: {
            title: "Bienvenido a tu camino de bienestar con ima",
            description: "Descubre cómo pequeños pasos pueden transformar tu salud.",
            imageUrl: "https://i.ytimg.com/vi/fnUOdFE3b_8/hqdefault.jpg",
            videoUrl: "https://youtu.be/fnUOdFE3b_8"
        },
        tutorials: physiotherapyTutorials,
        resources: physiotherapyResources,
    },
  },
  {
    id: "sports",
    title: "Meta Deportiva",
    icon: LineChart,
    description: "entrenamientos, consejos y planes para mejorar tu rendimiento",
    image: PlaceHolderImages.find(img => img.id === 'runners')!,
    videoContent: {
        mainVideo: {
            title: "Bienvenido a tu camino de bienestar con ima",
            description: "Descubre cómo pequeños pasos pueden transformar tu salud.",
            imageUrl: "https://i.ytimg.com/vi/fnUOdFE3b_8/hqdefault.jpg",
            videoUrl: "https://youtu.be/fnUOdFE3b_8"
        },
        tutorials: sportsTutorials,
        resources: sportsResources,
    },
  },
];

const PathwaySelection = ({ onSelect }: { onSelect: (pathway: PathwayId) => void }) => (
    <div className="flex flex-col items-center text-center space-y-4 animate-fade-in">
        <div className="w-full max-w-[1280px] text-left flex flex-col justify-center" style={{ minHeight: '120px' }}>
            <h1 className="text-[20px]" style={{ color: '#B9DDE8' }}>
                <span className="font-bold text-[40px]" style={{ color: '#D2F251' }}>ima.</span> Bienvenido al portal <span className="font-bold">del Dr. Sebastián Armida</span> — Tu espacio para aprender, mejorar y cuidar tu salud.
            </h1>
            <p className="mt-4 text-[16px]" style={{ color: '#B9DDE8' }}>
                Selecciona tu camino y deja que ima te acompañe.
            </p>
        </div>
        <div className="grid grid-cols-1 gap-2.5 w-full max-w-[1280px] pt-[20px]">
            {pathwaysData.map((path) => (
                <Card
                    key={path.id}
                    onClick={() => onSelect(path.id)}
                    className="relative overflow-hidden w-full group cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_#2A97B0]"
                    style={{ height: '260px', borderRadius: '20px' }}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent transition-all duration-300 group-hover:from-black/80 group-hover:backdrop-blur-[2px]" />
                    <div className="relative h-full flex flex-col md:flex-row items-start md:items-center justify-between p-10 text-white" style={{ paddingTop: '40px', paddingLeft: '40px' }}>
                        <div className="flex items-start text-left flex-col gap-2 transition-transform duration-300 group-hover:-translate-y-[5px]" style={{ width: '600px' }}>
                            <h3 className="text-[24px] font-bold">{path.title}</h3>
                            <p className="text-[16px] font-normal" style={{ opacity: 0.8 }}>{path.description}</p>
                        </div>
                        <Button variant="accent" className="w-[120px] h-[44px] rounded-[30px] absolute right-[60px] transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-[5px] text-black">
                            Entrar <ArrowRight className="ml-2 h-4 w-4" style={{ height: '16px', width: '16px' }} />
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    </div>
);


const VideoPathwayContent = ({ pathway, onBack }: { pathway: Pathway, onBack: () => void }) => {
  if (!pathway.videoContent) return null;

  const MainVideoPlayer = () => {
    const video = pathway.videoContent!.mainVideo;
    const cardContent = (
      <div className="relative aspect-video">
        <Image src={video.imageUrl} alt="Video principal" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <PlayCircle className="w-16 h-16 md:w-20 md:h-20 text-white/70 group-hover:text-white transition-all duration-300 cursor-pointer group-hover:scale-110" />
        </div>
      </div>
    );

    if (video.videoUrl) {
      return (
        <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
          <Card className="overflow-hidden mb-12 border-2 border-primary/20 shadow-lg shadow-primary/10 group cursor-pointer">
            {cardContent}
          </Card>
        </a>
      );
    }

    return (
      <Card className="overflow-hidden mb-12 border-2 border-primary/20 shadow-lg shadow-primary/10 group cursor-pointer">
        {cardContent}
      </Card>
    );
  };
  
  const TutorialItem = ({ tutorial }: { tutorial: Tutorial }) => {
    const cardContent = (
      <Card className={`overflow-hidden group transition-all duration-300 ${tutorial.placeholder ? '' : 'cursor-pointer hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(42,151,176,0.7)]'}`} style={{ borderRadius: '16px', border: '1px solid rgba(185, 221, 232, 0.4)' }}>
        <div className="relative aspect-video">
          <Image src={tutorial.imageUrl} alt={tutorial.title} fill className="object-cover" />
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(14, 75, 135, 0.55)'}}>
            {!tutorial.placeholder && <PlayCircle className="w-12 h-12 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
          </div>
          <div className="absolute bottom-2 right-2 bg-black/50 text-xs px-2 py-1 rounded-md" style={{color: '#F6A62A'}}>{tutorial.duration}</div>
        </div>
        <div className="p-4 transition-colors duration-300" style={{ background: 'linear-gradient(180deg, rgba(14,75,135,0.7) 0%, rgba(14,75,135,0.1) 100%)' }}>
          <h4 className="font-semibold truncate" style={{color: '#B9DDE8', fontSize: '18px'}}>{tutorial.title}</h4>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
            {!tutorial.placeholder && <Video className="w-4 h-4 text-muted-foreground" />}
            <span className="text-muted-foreground">{!tutorial.placeholder ? tutorial.duration : ''}</span>
          </div>
        </div>
      </Card>
    );

    if (tutorial.videoUrl) {
      return (
        <a href={tutorial.videoUrl} target="_blank" rel="noopener noreferrer" className="p-1 block">
          {cardContent}
        </a>
      );
    }

    return <div className="p-1">{cardContent}</div>;
  };

  const ResourceItem = ({ resource }: { resource: DownloadableResource }) => {
    const cardContent = (
      <Card className={`group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 transition-all duration-300 ${resource.placeholder ? '' : 'hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(42,151,176,0.8)]'}`}
      style={{
        background: 'rgba(185,221,232,0.2)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(185,221,232,0.4)',
        borderRadius: '16px'
      }}>
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-white" style={{ fontSize: '18px' }}>{resource.title}</h4>
            <p className="text-sm text-white/80" style={{ fontSize: '15px' }}>{resource.description}</p>
          </div>
        </div>
        {!resource.placeholder &&
          <Button size="sm" className="w-full sm:w-auto mt-4 sm:mt-0 shadow-md text-primary-foreground" style={{ backgroundColor: '#F6A62A' }}>
            Descargar
            <Download className="ml-2 h-4 w-4" />
          </Button>
        }
      </Card>
    );

    if (resource.url) {
        return (
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="block">
                {cardContent}
            </a>
        );
    }

    return cardContent;
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
       <div className="w-full max-w-6xl mx-auto mb-8">
        <h1 className="text-xl" style={{ color: '#B9DDE8' }}>
            <span className="font-bold text-2xl" style={{ color: '#D2F251' }}>ima.</span>
        </h1>
      </div>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold" style={{ color: '#B9DDE8' }}>{pathway.videoContent.mainVideo.title}</h2>
        <p className="text-muted-foreground mt-2" style={{ color: '#B9DDE8' }}>{pathway.videoContent.mainVideo.description}</p>
      </div>

      <MainVideoPlayer />

      <div className="mb-12">
        <h3 className="text-xl md:text-2xl font-bold mb-6" style={{ color: '#B9DDE8' }}>Tutoriales</h3>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {pathway.videoContent.tutorials.map((tutorial, index) => (
              <CarouselItem key={index} className="sm:basis-1/2 md:basis-1/3">
                 <TutorialItem tutorial={tutorial} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-white hover:text-white bg-white/20 hover:bg-white/30 border-none -left-4" />
          <CarouselNext className="text-white hover:text-white bg-white/20 hover:bg-white/30 border-none -right-4"/>
        </Carousel>
      </div>

      <div className="mb-12">
        <h3 className="text-xl md:text-2xl font-bold mb-6" style={{ color: '#B9DDE8' }}>Recursos descargables</h3>
        <ScrollArea className="h-[430px] w-full rounded-md pr-4">
          <div className="space-y-5">
            {pathway.videoContent.resources.map((resource, index) => (
              <ResourceItem key={index} resource={resource} />
            ))}
          </div>
        </ScrollArea>
      </div>

       <Button variant="ghost" onClick={onBack} className="mt-12 hover:bg-accent/50" style={{ color: '#B9DDE8' }}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la página principal
      </Button>
    </div>
  );
};


const DefaultPathwayContent = ({ pathway, onBack }: { pathway: Pathway, onBack: () => void }) => {
  if (!pathway.content) return null;
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <Button variant="ghost" onClick={onBack} className="mb-8 hover:bg-accent/50" style={{ color: '#B9DDE8' }}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a la página principal
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

  const handleBack = () => setSelectedPathwayId(null);

  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground relative">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        {selectedPathway ? (
          selectedPathway.videoContent ? (
            <VideoPathwayContent pathway={selectedPathway} onBack={handleBack} />
          ) : (
            <DefaultPathwayContent pathway={selectedPathway} onBack={handleBack} />
          )
        ) : (
          <PathwaySelection onSelect={setSelectedPathwayId} />
        )}
      </main>
      <footer className="w-full py-8 border-t border-border" style={{ marginTop: '20px' }}>
        <div className="container mx-auto text-center text-muted-foreground text-sm px-4">
          <p>
            <span style={{ color: '#B9DDE8' }}>Si tienes alguna duda escríbenos al correo de soporte: </span>
            <a href="mailto:soporte@preguntaleaima.com" className="text-accent hover:underline" style={{ color: '#D2F251' }}>
              soporte@preguntaleaima.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
    
    

    

    



    

    

    

    

    

    

    

    

    

    

    

    




    

    

    

    
