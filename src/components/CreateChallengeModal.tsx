
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

interface CreateChallengeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateChallengeModal = ({ open, onOpenChange }: CreateChallengeModalProps) => {
  const [challengeTitle, setChallengeTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState(15);
  const [opponent, setOpponent] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!challengeTitle || !taskDescription || !opponent) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Here would be the API call to create the challenge
    
    toast({
      title: "Challenge Created!",
      description: `Challenge sent to ${opponent}. Waiting for acceptance.`,
    });
    
    // Reset form
    setChallengeTitle("");
    setTaskDescription("");
    setTimeLimit(15);
    setOpponent("");
    
    // Close the modal
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Challenge
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="challenge-title">Challenge Title</Label>
            <Input 
              id="challenge-title" 
              value={challengeTitle}
              onChange={(e) => setChallengeTitle(e.target.value)}
              placeholder="E.g. Math Problem Sprint"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="task-description">Task Description</Label>
            <Input 
              id="task-description" 
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="E.g. Solve 5 algebra problems"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time-limit">Time Limit (minutes)</Label>
            <Input 
              id="time-limit" 
              type="number"
              min={1}
              max={120}
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="opponent">Opponent</Label>
            <Input 
              id="opponent" 
              value={opponent}
              onChange={(e) => setOpponent(e.target.value)}
              placeholder="Enter opponent's username"
              required
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Challenge</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChallengeModal;
