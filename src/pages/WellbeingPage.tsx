
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Moon, 
  Sun, 
  Clock, 
  Brain, 
  Users, 
  Calendar, 
  HeartPulse, 
  Timer, 
  ArrowLeft,
  MessageCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import StressManagement from "@/components/wellbeing/StressManagement";
import MindfulnessSection from "@/components/wellbeing/MindfulnessSection";
import TimeManagement from "@/components/wellbeing/TimeManagement";
import SocialWellbeing from "@/components/wellbeing/SocialWellbeing";
import QuoteWidget from "@/components/wellbeing/QuoteWidget";

const WellbeingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  useEffect(() => {
    // Apply dark mode class to document when darkMode state changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleNeedHelp = () => {
    toast({
      title: "Support Resources",
      description: "Connecting you with mental health professionals and resources.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/70 to-purple-50/70 dark:from-slate-900 dark:to-indigo-950 transition-colors duration-300">
      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="container mx-auto py-4 px-4 md:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Challenge Arena</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2" onClick={handleNeedHelp}>
              <HeartPulse className="h-4 w-4 text-red-500" />
              <span>Need Help?</span>
            </Button>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-amber-500" />
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
              <Moon className="h-4 w-4 text-indigo-500" />
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-900/20 dark:to-purple-900/20" />
        <div
          className="absolute inset-0 opacity-30 dark:opacity-10"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }}
        />
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Your Mental Well-being Matters!
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg mx-auto md:mx-0">
                Discover tools, techniques, and resources to nurture your mental health and social well-being as a student.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
                <Button className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <Heart className="h-4 w-4" />
                  <span>Start Your Journey</span>
                </Button>
                <Button variant="outline" className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat With Support</span>
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square md:aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1532798442725-41036acc7489?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                  alt="Students meditating together"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Daily Quote Widget */}
      <div className="container mx-auto px-4 md:px-6 -mt-8 relative z-10">
        <QuoteWidget />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="space-y-16">
          {/* Mental Health Sections */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Mental Health Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <StressManagement />
              <MindfulnessSection />
            </div>
          </section>

          {/* Time Management Section */}
          <TimeManagement />

          {/* Social & Emotional Wellbeing */}
          <SocialWellbeing />

          {/* Help & Support Section */}
          <section className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-2/3">
                <h2 className="text-2xl font-bold mb-4">Seeking Help Without Hesitation</h2>
                <p className="text-muted-foreground mb-6">
                  Reaching out for help is a sign of strength, not weakness. If you're struggling with your mental health, remember that support is always available.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button className="gap-2" onClick={handleNeedHelp}>
                    <HeartPulse className="h-4 w-4" />
                    <span>Talk to a Counselor</span>
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Users className="h-4 w-4" />
                    <span>Join Support Group</span>
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur">
                  <CardHeader>
                    <CardTitle>Emergency Resources</CardTitle>
                    <CardDescription>Available 24/7 for immediate support</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Crisis Helpline:</span>
                      <span className="font-semibold">1-800-273-8255</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Text Line:</span>
                      <span className="font-semibold">Text HOME to 741741</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Campus Support:</span>
                      <span className="font-semibold">555-123-4567</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          onClick={() => toast({
            title: "Wellness Assistant",
            description: "How can I help you with your well-being today?",
          })}
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Chat with wellness assistant</span>
        </Button>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">© 2023 Student Well-being Hub. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/" className="text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="/" className="text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link to="/" className="text-muted-foreground hover:text-primary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WellbeingPage;
