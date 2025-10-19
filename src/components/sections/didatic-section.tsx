"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PrimaryButton } from "@/components/primary-button";

interface IDidaticTopic {
  id: string;
  label: string;
  videoUrl: string;
}

interface IDidaticSectionProps {
  topics: readonly IDidaticTopic[];
}

export const DidaticSection = ({ topics }: IDidaticSectionProps) => {
  const [activeTopic, setActiveTopic] = useState(topics[0]?.id || "");
  const [isAutoRotationActive, setIsAutoRotationActive] = useState(true);
  const activeTopicData = topics.find(topic => topic.id === activeTopic);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Center active tab in scroll container (mobile only)
  const centerActiveTab = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const activeButton = scrollContainerRef.current.querySelector(`[data-state="active"]`) as HTMLElement;
    if (!activeButton) return;

    const container = scrollContainerRef.current;
    const containerWidth = container.offsetWidth;
    const buttonLeft = activeButton.offsetLeft;
    const buttonWidth = activeButton.offsetWidth;
    
    const scrollPosition = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
    
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }, []);

  // Auto-rotate tabs every 5 seconds (only if auto-rotation is active)
  useEffect(() => {
    if (!isAutoRotationActive) return;

    const interval = setInterval(() => {
      const currentIndex = topics.findIndex(topic => topic.id === activeTopic);
      const nextIndex = (currentIndex + 1) % topics.length;
      setActiveTopic(topics[nextIndex].id);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeTopic, topics, isAutoRotationActive]);

  // Center tab when activeTopic changes (mobile only)
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only center on mobile/tablet (when overflow is needed)
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        centerActiveTab();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [activeTopic, centerActiveTab]);

  // Handle user interaction - disable auto-rotation
  const handleUserInteraction = useCallback(() => {
    setIsAutoRotationActive(false);
  }, []);

  // Handle tab change with user interaction
  const handleTabChange = useCallback((topicId: string) => {
    setIsAutoRotationActive(false);
    setActiveTopic(topicId);
  }, []);


  return (
    <section id="didatic" className="w-full py-20 bg-black">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col items-center gap-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-white text-3xl md:text-4xl font-semibold font-['Clash_Display'] leading-tight">
              NOSSA DIDÁTICA DESCOMPLICADA
            </h2>
            <p className="text-white text-lg md:text-xl font-normal font-['Rubik'] leading-relaxed">
              Selecione um tópico e conheça algumas das nossas aulas:
            </p>
          </div>

          {/* Tabs Grid */}
          <div className="w-full max-w-4xl">
            <Tabs value={activeTopic} onValueChange={handleTabChange} className="w-full">
              {/* Desktop: Grid 2x4 */}
              <div className="hidden lg:block">
                <TabsList className="grid grid-cols-4 gap-2.5 h-auto p-1 bg-transparent mb-2.5">
                  {topics.slice(0, 4).map((topic) => (
                    <TabsTrigger
                      key={topic.id}
                      value={topic.id}
                      className="px-4 py-3 rounded-full text-xs font-medium font-['Rubik'] uppercase transition-all duration-200 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-indigo-600 hover:bg-indigo-100"
                    >
                      {topic.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsList className="grid grid-cols-4 gap-2.5 h-auto p-1 bg-transparent">
                  {topics.slice(4, 8).map((topic) => (
                    <TabsTrigger
                      key={topic.id}
                      value={topic.id}
                      className="px-4 py-3 rounded-full text-xs font-medium font-['Rubik'] uppercase transition-all duration-200 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-indigo-600 hover:bg-indigo-100"
                    >
                      {topic.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Mobile/Tablet: Horizontal Scroll */}
              <div ref={scrollContainerRef} className="lg:hidden overflow-x-auto pb-2 scroll-smooth">
                <TabsList className="flex gap-2.5 h-auto p-1 bg-transparent min-w-max">
                  {topics.map((topic) => (
                    <TabsTrigger
                      key={topic.id}
                      value={topic.id}
                      className="flex-shrink-0 px-4 py-3 rounded-full text-xs font-medium font-['Rubik'] uppercase transition-all duration-200 data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-indigo-600 hover:bg-indigo-100 whitespace-nowrap"
                    >
                      {topic.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Video Content */}
              <div className="mt-8 space-y-8">
                <div className="flex flex-col items-center">
                  <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black">
                    {activeTopicData?.videoUrl ? (
                      <video
                        key={activeTopicData.id}
                        className="w-full h-full object-cover"
                        controls
                        preload="metadata"
                        poster="/placeholder.svg"
                        onClick={handleUserInteraction}
                        onPlay={handleUserInteraction}
                        onLoadStart={handleUserInteraction}
                        playsInline
                        disablePictureInPicture
                      >
                        <source src={activeTopicData.videoUrl} type="video/mp4" />
                        <p className="text-white text-center p-4">
                          Seu navegador não suporta o elemento de vídeo.
                        </p>
                      </video>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-white text-xl font-normal font-['Rubik'] leading-relaxed mt-8">
                    E muito mais...
                  </p>
                </div>
              </div>
            </Tabs>
          </div>

          {/* CTA Button */}
          <Link href="#">
            <PrimaryButton size="lg">
              QUERO MUDAR DE VIDA
            </PrimaryButton>
          </Link>
        </div>
      </div>
    </section>
  );
};