
import { useState } from "react";
import { Check, Clock, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const StressManagement = () => {
  const [completedItems, setCompletedItems] = useState<number[]>([]);

  const stressReliefTips = [
    { id: 1, text: "Practice deep breathing for 2 minutes" },
    { id: 2, text: "Take a short walk outside" },
    { id: 3, text: "Stretch your body for 5 minutes" },
    { id: 4, text: "Write down three things you're grateful for" },
    { id: 5, text: "Listen to a calming song" }
  ];

  const toggleComplete = (id: number) => {
    if (completedItems.includes(id)) {
      setCompletedItems(completedItems.filter(item => item !== id));
    } else {
      setCompletedItems([...completedItems, id]);
      if (completedItems.length === 4) {
        toast({
          title: "Great job!",
          description: "You've completed all stress management techniques!",
        });
      }
    }
  };

  return (
    <Card className="overflow-hidden border-t-4 border-t-green-500 dark:border-t-green-400 h-full transition-all duration-300 hover:shadow-md">
      <CardHeader className="bg-green-50 dark:bg-green-900/20">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-green-500 dark:text-green-400" />
          <CardTitle>Stress Management</CardTitle>
        </div>
        <CardDescription>
          Tools and techniques to help you manage stress effectively
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-4">Quick Stress Relief Checklist</h3>
        <ul className="space-y-3 mb-6">
          {stressReliefTips.map((tip) => (
            <li key={tip.id} className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className={`h-6 w-6 rounded-full transition-colors ${
                  completedItems.includes(tip.id)
                    ? "bg-green-100 text-green-500 dark:bg-green-900/40 dark:text-green-400"
                    : ""
                }`}
                onClick={() => toggleComplete(tip.id)}
              >
                {completedItems.includes(tip.id) ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <span className="h-3 w-3" />
                )}
              </Button>
              <span className={completedItems.includes(tip.id) ? "line-through text-muted-foreground" : ""}>
                {tip.text}
              </span>
            </li>
          ))}
        </ul>
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Quick Exercise</h3>
          <Card className="bg-green-50/50 dark:bg-green-900/10">
            <CardContent className="p-4">
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-green-500 dark:text-green-400" />
                <span>2-Minute Relaxation</span>
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Find a comfortable position and close your eyes</li>
                <li>Take a deep breath in through your nose (count to 4)</li>
                <li>Hold your breath (count to 2)</li>
                <li>Exhale slowly through your mouth (count to 6)</li>
                <li>Repeat 5 times</li>
              </ol>
              <Button 
                className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white"
                onClick={() => {
                  toast({
                    title: "Exercise Started",
                    description: "Take a deep breath in... and out...",
                  });
                }}
              >
                Start Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default StressManagement;
