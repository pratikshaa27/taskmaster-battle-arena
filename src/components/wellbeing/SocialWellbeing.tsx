
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, ThumbsUp, MessageCircle, HeartHandshake, Coffee } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BalanceItem {
  id: number;
  area: string;
  icon: React.ReactNode;
  current: number;
  ideal: number;
  color: string;
}

const SocialWellbeing = () => {
  const [balanceItems, setBalanceItems] = useState<BalanceItem[]>([
    {
      id: 1,
      area: "Academics",
      icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4.5L2 9.5L12 14.5L22 9.5L12 4.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19 13V17.67C19 18.4 18.4 19 17.67 19H6.33C5.6 19 5 18.4 5 17.67V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>,
      current: 75,
      ideal: 65,
      color: "bg-blue-400"
    },
    {
      id: 2,
      area: "Social Activities",
      icon: <Users className="w-4 h-4" />,
      current: 25,
      ideal: 40,
      color: "bg-purple-400"
    },
    {
      id: 3,
      area: "Self-Care",
      icon: <HeartHandshake className="w-4 h-4" />,
      current: 15,
      ideal: 30,
      color: "bg-pink-400"
    },
    {
      id: 4,
      area: "Rest & Relaxation",
      icon: <Coffee className="w-4 h-4" />,
      current: 30,
      ideal: 35,
      color: "bg-green-400"
    }
  ]);

  const updateBalance = (id: number, value: number) => {
    setBalanceItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, current: Math.max(0, Math.min(100, value)) } 
          : item
      )
    );
  };

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <Users className="h-6 w-6 text-purple-500 dark:text-purple-400" />
        <h2 className="text-2xl font-bold">Social & Emotional Well-being</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Healthy Relationships */}
        <Card className="border-t-4 border-t-purple-500 dark:border-t-purple-400">
          <CardHeader>
            <CardTitle>Building Healthy Relationships</CardTitle>
            <CardDescription>
              Develop meaningful connections with peers and others
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Key Communication Skills</h3>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg space-y-3">
                <div>
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                    Active Listening
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Focus completely on the speaker, understand their message, respond thoughtfully, and remember key points.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                    Clear Expression
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Communicate your thoughts and feelings clearly using "I" statements to express your perspective.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium flex items-center gap-2">
                    <HeartHandshake className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                    Boundary Setting
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Learn to say no respectfully, identify your limits, and express your needs in relationships.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Handling Peer Pressure</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Peer pressure can be positive or negative. Learning to recognize and respond appropriately is a valuable skill.
              </p>
              <Button 
                className="w-full bg-purple-500 hover:bg-purple-600"
                onClick={() => {
                  toast({
                    title: "Resource Available",
                    description: "Guide to navigating peer pressure has been opened.",
                  });
                }}
              >
                View Peer Pressure Guide
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Study-Social Balance */}
        <Card className="border-t-4 border-t-indigo-500 dark:border-t-indigo-400">
          <CardHeader>
            <CardTitle>Balancing Studies & Social Life</CardTitle>
            <CardDescription>
              Find the right balance between academics and social activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="font-medium mb-3">Your Study-Social Balance Wheel</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Adjust the sliders to match your current balance. The colored markers show ideal balance.
              </p>
              
              <div className="space-y-4">
                {balanceItems.map(item => (
                  <div key={item.id} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${item.color}`}>
                          {item.icon}
                        </div>
                        <span className="text-sm font-medium">{item.area}</span>
                      </div>
                      <span className="text-xs">{item.current}%</span>
                    </div>
                    
                    <div className="relative h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${item.current}%` }}
                      />
                      <div 
                        className="absolute h-4 w-1 bg-black dark:bg-white top-1/2 -translate-y-1/2 rounded-full"
                        style={{ left: `${item.ideal}%` }}
                      />
                    </div>
                    
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={item.current}
                      onChange={(e) => updateBalance(item.id, parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => {
                toast({
                  title: "Balance Assessment",
                  description: "Your personalized balance recommendations have been generated.",
                });
              }}
            >
              Get Personalized Recommendations
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SocialWellbeing;
