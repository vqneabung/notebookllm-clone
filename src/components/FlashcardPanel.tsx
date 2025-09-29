"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  BookOpen,
  CreditCard,
  Shuffle,
  RotateCcw,
} from "lucide-react";
import { useState, useEffect } from "react";
import { FlashcardComponent } from "react-flashcard";
import { Source } from "@/app/chat/page";

// Interface for react-flashcard data structure
interface FlashcardData {
  front: {
    text: string;
    image?: string;
  };
  back: {
    text: string;
    image?: string;
  };
}



export default function FlashcardPanel({ sources }: { sources: Source[] }) {
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [isFlashcardMode, setIsFlashcardMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // // Sample data generator - following IFlashcard interface with centered content
  // const sampleFlashcards: IFlashcard[] = [
  //   {
  //     front: { html: <CenteredCardContent isTitle={true}>Dialectical Materialism</CenteredCardContent> },
  //     back: { html: <CenteredCardContent>A philosophical approach that views reality as being composed of opposing forces or contradictory elements.</CenteredCardContent> }
  //   },
  //   {
  //     front: { html: <CenteredCardContent isTitle={true}>Matter vs Consciousness</CenteredCardContent> },
  //     back: { html: <CenteredCardContent>In Marxist philosophy, matter is primary and consciousness is secondary, derived from material conditions.</CenteredCardContent> }
  //   },
  //   {
  //     front: { html: <CenteredCardContent isTitle={true}>Historical Materialism</CenteredCardContent> },
  //     back: { html: <CenteredCardContent>The application of dialectical materialism to the study of history and society.</CenteredCardContent> }
  //   },
  //   {
  //     front: { html: <CenteredCardContent isTitle={true}>Base and Superstructure</CenteredCardContent> },
  //     back: { html: <CenteredCardContent>Economic base (material conditions) determines the superstructure (culture, politics, ideology).</CenteredCardContent> }
  //   },
  //   {
  //     front: { html: <CenteredCardContent isTitle={true}>Class Struggle</CenteredCardContent> },
  //     back: { html: <CenteredCardContent>The ongoing conflict between different economic classes, which drives historical change.</CenteredCardContent> }
  //   }
  // ];

  const handleAddSampleCards = async () => {
    if (sources.length === 0) {
      console.warn('No sources available to generate flashcards');
      return;
    }

    setIsGenerating(true);
    setFlashcards([]);
    
    let allFlashcards: FlashcardData[] = [];

    for (const source of sources) {
      try {
        const response = await fetch("/api/flashcard", {
          method: "POST",
          body: JSON.stringify({ resourceId: source.id }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Flashcards generated:", data);
          
          const flashcardData: FlashcardData[] = data.flashcards.map((card: { front: string; back: string }) => ({
            front: {
              text:  card.front || "No Question"
            },
            back: {
              text: card.back || "No Answer"
            }
          }));
          
          console.log("Flashcards processed:", flashcardData);
          allFlashcards = [...allFlashcards, ...flashcardData];
        } else {
          console.error("Error generating flashcards for source:", source.id);
        }
      } catch (error) {
        console.error("Error fetching flashcards for source:", source.id, error);
      }
    }

    setFlashcards(allFlashcards);
    setIsGenerating(false);
    
    if (allFlashcards.length > 0) {
      setIsFlashcardMode(true);
    }
  };

  const handleShuffle = () => {
    if (flashcards.length > 0) {
      const shuffled = [...flashcards].sort(() => 0.5 - Math.random());
      setFlashcards(shuffled);
    }
  };

  const handleBackToMenu = () => {
    setIsFlashcardMode(false);
    setFlashcards([]);
  };

  if (isFlashcardMode && flashcards.length > 0) {
    return (
      <div className="w-80 bg-background border-l flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Flashcards ({flashcards.length} cards)
          </h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleShuffle}>
              <Shuffle className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Flashcard Area */}
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-sm">
              <FlashcardComponent
                dataSource={flashcards}
                flipDirection="horizontal"
                onChange={(step: number, size: number) => {
                  console.log('Card changed:', step, 'of', size);
                }}
                onFinish={() => console.log('Flashcards completed!')}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-2 mt-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleBackToMenu}
            >
              Back to Menu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-background border-l flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Flashcard</h2>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Options Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card
            className="p-4 hover:bg-muted cursor-pointer"
            onClick={() => setIsFlashcardMode(true)}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <BookOpen className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm font-medium">Study Mode</span>
            </div>
          </Card>

          <Card className="p-4 hover:bg-muted cursor-pointer">
            <div className="flex flex-col items-center text-center space-y-2">
              <Edit className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm font-medium">Edit Cards</span>
            </div>
          </Card>

          <Card className="p-4 hover:bg-muted cursor-pointer">
            <div className="flex flex-col items-center text-center space-y-2">
              <CreditCard className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm font-medium">Practice</span>
            </div>
          </Card>

          <Card className="p-4 hover:bg-muted cursor-pointer">
            <div className="flex flex-col items-center text-center space-y-2">
              <Shuffle className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm font-medium">Quiz Mode</span>
            </div>
          </Card>
        </div>

        {/* Bottom section */}
        <div className="mt-auto">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground">
              {flashcards.length > 0
                ? `${flashcards.length} flashcards ready`
                : "Click 'Generate Cards' to create flashcards from your sources"}
            </p>
          </div>

          <Button className="w-full mb-2" onClick={handleAddSampleCards}>
            <Plus className="w-4 h-4 mr-2" />
            Generate Cards
          </Button>
        </div>
      </div>
    </div>
  );
}
