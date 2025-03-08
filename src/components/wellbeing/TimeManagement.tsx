
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, Play, Pause, RotateCcw, Check, ListTodo } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const TimeManagement = () => {
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [activeMode, setActiveMode] = useState<'focus' | 'break'>('focus');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        if (pomodoroSeconds === 0) {
          if (pomodoroMinutes === 0) {
            clearInterval(interval!);
            setIsActive(false);
            
            // Switch modes when timer ends
            if (activeMode === 'focus') {
              toast({
                title: "Focus session complete!",
                description: "Take a 5-minute break before starting your next session.",
              });
              setPomodoroMinutes(5);
              setActiveMode('break');
            } else {
              toast({
                title: "Break time over!",
                description: "Ready to start your next focus session?",
              });
              setPomodoroMinutes(25);
              setActiveMode('focus');
            }
            
            setProgress(0);
            return;
          }
          setPomodoroMinutes(pomodoroMinutes - 1);
          setPomodoroSeconds(59);
        } else {
          setPomodoroSeconds(pomodoroSeconds - 1);
        }
        
        // Update progress
        if (activeMode === 'focus') {
          const totalSeconds = 25 * 60;
          const remainingSeconds = pomodoroMinutes * 60 + pomodoroSeconds;
          const completedPercentage = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
          setProgress(completedPercentage);
        } else {
          const totalSeconds = 5 * 60;
          const remainingSeconds = pomodoroMinutes * 60 + pomodoroSeconds;
          const completedPercentage = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
          setProgress(completedPercentage);
        }
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, pomodoroMinutes, pomodoroSeconds, activeMode]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!isActive && pomodoroMinutes === 0 && pomodoroSeconds === 0) {
      if (activeMode === 'focus') {
        setPomodoroMinutes(25);
      } else {
        setPomodoroMinutes(5);
      }
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    if (activeMode === 'focus') {
      setPomodoroMinutes(25);
    } else {
      setPomodoroMinutes(5);
    }
    setPomodoroSeconds(0);
    setProgress(0);
  };

  // Format time with leading zeros
  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <section className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/30 dark:to-teal-900/30 rounded-2xl p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="h-6 w-6 text-blue-500 dark:text-blue-400" />
        <h2 className="text-2xl font-bold">Time Management & Productivity</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pomodoro Timer */}
        <Card className="border-t-4 border-t-blue-500 dark:border-t-blue-400">
          <CardHeader>
            <CardTitle>Pomodoro Timer</CardTitle>
            <CardDescription>
              Use the Pomodoro Technique to enhance focus and productivity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold mb-4 font-mono">
                {formatTime(pomodoroMinutes, pomodoroSeconds)}
              </div>
              
              <div className="w-full mb-6">
                <Progress 
                  value={progress} 
                  className="h-3"
                  style={{
                    background: activeMode === 'focus' ? 'hsl(var(--blue-100))' : 'hsl(var(--green-100))'
                  }}
                />
              </div>
              
              <div className="flex justify-center gap-4">
                <Button 
                  onClick={toggleTimer} 
                  className={`gap-2 ${
                    activeMode === 'focus' 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  }`}
                >
                  {isActive ? (
                    <>
                      <Pause className="h-4 w-4" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>Start</span>
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={resetTimer} 
                  variant="outline" 
                  className="gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </Button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Currently in <span className="font-medium text-foreground">{activeMode === 'focus' ? 'Focus' : 'Break'}</span> mode
                </p>
                <p className="text-xs text-muted-foreground">
                  The Pomodoro Technique: 25 min of focused work followed by a 5 min break
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Productivity Tips */}
        <Card className="border-t-4 border-t-teal-500 dark:border-t-teal-400">
          <CardHeader>
            <CardTitle>Time Blocking Techniques</CardTitle>
            <CardDescription>
              Organize your day efficiently with time blocking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <ListTodo className="h-4 w-4 text-teal-500 dark:text-teal-400" />
                  <span>How to Time Block Your Day</span>
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">1.</span>
                    <span>Start by listing all tasks that need to be completed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">2.</span>
                    <span>Estimate how long each task will take</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">3.</span>
                    <span>Allocate specific time blocks on your calendar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">4.</span>
                    <span>Include breaks between demanding tasks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">5.</span>
                    <span>Batch similar tasks together (emails, calls, reading)</span>
                  </li>
                </ol>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Quick Time Management Tips</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-500 dark:text-teal-400" />
                    <span>Set 1-3 important priorities each day</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-500 dark:text-teal-400" />
                    <span>Use the "two-minute rule" - if it takes less than two minutes, do it now</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-500 dark:text-teal-400" />
                    <span>Schedule difficult tasks during your peak energy hours</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-teal-500 dark:text-teal-400" />
                    <span>Plan for interruptions by buffering extra time</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full gap-2" onClick={() => {
              toast({
                title: "Calendar Integration",
                description: "Time blocking template has been added to your calendar.",
              });
            }}>
              <Calendar className="h-4 w-4" />
              <span>Get Time Blocking Template</span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default TimeManagement;
