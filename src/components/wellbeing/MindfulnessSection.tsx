
import React, { useState } from "react";
import { Brain, Play, Pause, Wind } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

const MindfulnessSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const startMeditation = () => {
    if (isPlaying) {
      setIsPlaying(false);
      setProgress(0);
      toast({
        title: "Meditation paused",
        description: "Your session has been paused. Resume anytime.",
      });
      return;
    }
    
    setIsPlaying(true);
    toast({
      title: "Meditation started",
      description: "Find a comfortable position and focus on your breath...",
    });
    
    // Simulate progress over 2 minutes
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPlaying(false);
          toast({
            title: "Meditation complete",
            description: "Great job! How do you feel?",
          });
          return 0;
        }
        return prev + 1;
      });
    }, 1200); // 120 seconds = 2 minutes, update every 1.2 seconds
    
    return () => clearInterval(interval);
  };

  return (
    <Card className="overflow-hidden border-t-4 border-t-purple-500 dark:border-t-purple-400 h-full transition-all duration-300 hover:shadow-md">
      <CardHeader className="bg-purple-50 dark:bg-purple-900/20">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-500 dark:text-purple-400" />
          <CardTitle>Mindfulness & Meditation</CardTitle>
        </div>
        <CardDescription>
          Simple techniques to calm your mind and improve focus
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="rounded-lg overflow-hidden mb-6 aspect-video relative group">
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Peaceful nature scene"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <p className="text-white text-sm">Nature sounds can help reduce stress and anxiety</p>
          </div>
        </div>

        <h3 className="text-lg font-medium mb-4">2-Minute Guided Breathing</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-purple-500 dark:text-purple-400" />
              <span className="text-sm font-medium">Mindful Breathing</span>
            </div>
            <span className="text-xs text-muted-foreground">2:00</span>
          </div>
          
          <Progress value={progress} className="h-2 bg-purple-100 dark:bg-purple-900/20">
            <div className="bg-purple-500 dark:bg-purple-400 h-full transition-all duration-300 ease-in-out" />
          </Progress>
          
          <Button
            onClick={startMeditation}
            className={`w-full ${
              isPlaying 
              ? "bg-red-500 hover:bg-red-600" 
              : "bg-purple-500 hover:bg-purple-600"
            } text-white`}
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                <span>Pause Meditation</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                <span>Start 2-Minute Meditation</span>
              </>
            )}
          </Button>
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <h3 className="text-lg font-medium mb-3">Quick Mindfulness Tips</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-3">
              <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
              <span>Notice five things you can see, four you can touch, three you can hear, two you can smell, and one you can taste.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
              <span>When stressed, place your hand on your heart and feel the warmth and gentle pressure as you breathe.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
              <span>Practice "noting" by mentally labeling thoughts as they arise: "thinking," "worrying," "planning," etc.</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default MindfulnessSection;
