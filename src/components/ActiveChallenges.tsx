
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { Clock, Play, CheckCircle, Trophy } from "lucide-react";
import { useState } from "react";

// Mock data for active challenges
const mockChallenges = [
  {
    id: 1,
    title: "Math Problem Sprint",
    description: "Solve 5 algebra problems",
    timeLimit: 15,
    opponent: "JaneDoe",
    status: "waiting", // waiting, in-progress, completed
    progress: 0,
  },
  {
    id: 2,
    title: "Essay Outline Challenge",
    description: "Create an outline for your essay",
    timeLimit: 20,
    opponent: "AlexSmith",
    status: "in-progress",
    progress: 60,
  },
  {
    id: 3,
    title: "Code Debugging Race",
    description: "Find and fix 3 bugs in the provided code",
    timeLimit: 10,
    opponent: "SamJohnson",
    status: "completed",
    progress: 100,
  }
];

const ActiveChallenges = () => {
  const [challenges, setChallenges] = useState(mockChallenges);

  const handleAcceptChallenge = (id: number) => {
    setChallenges(prevChallenges => 
      prevChallenges.map(challenge => 
        challenge.id === id ? { ...challenge, status: "in-progress" } : challenge
      )
    );
    
    toast({
      title: "Challenge Accepted!",
      description: "The timer has started. Good luck!",
    });
  };

  const handleCompleteTask = (id: number) => {
    setChallenges(prevChallenges => 
      prevChallenges.map(challenge => 
        challenge.id === id ? { ...challenge, status: "completed", progress: 100 } : challenge
      )
    );
    
    toast({
      title: "Challenge Completed!",
      description: "Great job! You've earned 50 XP.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "waiting":
        return <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Waiting</span>;
      case "in-progress":
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">In Progress</span>;
      case "completed":
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Completed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {challenges.map((challenge) => (
        <Card key={challenge.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle>{challenge.title}</CardTitle>
              {getStatusBadge(challenge.status)}
            </div>
            <CardDescription>{challenge.description}</CardDescription>
          </CardHeader>
          
          <CardContent className="pb-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Clock className="h-4 w-4" /> 
              {challenge.timeLimit} minutes
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{challenge.progress}%</span>
              </div>
              <Progress value={challenge.progress} className="h-2" />
            </div>
            
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Opponent:</span>
              <span className="text-sm font-medium">{challenge.opponent}</span>
            </div>
          </CardContent>
          
          <CardFooter className="pt-1">
            {challenge.status === "waiting" && (
              <Button 
                onClick={() => handleAcceptChallenge(challenge.id)}
                className="w-full gap-2"
              >
                <Play className="h-4 w-4" /> Accept Challenge
              </Button>
            )}
            
            {challenge.status === "in-progress" && (
              <Button 
                onClick={() => handleCompleteTask(challenge.id)}
                className="w-full gap-2"
              >
                <CheckCircle className="h-4 w-4" /> Mark as Complete
              </Button>
            )}
            
            {challenge.status === "completed" && (
              <Button 
                variant="outline" 
                className="w-full gap-2"
                disabled
              >
                <Trophy className="h-4 w-4" /> Challenge Completed
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ActiveChallenges;
