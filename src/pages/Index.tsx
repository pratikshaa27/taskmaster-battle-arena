
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Trophy, Zap, Clock, Users } from "lucide-react";
import CreateChallengeModal from "@/components/CreateChallengeModal";
import ActiveChallenges from "@/components/ActiveChallenges";
import Leaderboard from "@/components/Leaderboard";

const Index = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateChallenge = () => {
    setShowCreateModal(true);
  };

  const handleJoinDemo = () => {
    toast({
      title: "Demo Challenge Joined!",
      description: "You've joined the demo challenge. Start completing tasks now!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="container mx-auto pt-8 pb-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Challenge Arena
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Productivity duels to boost your focus and accomplish more through friendly competition
          </p>
          <div className="flex flex-wrap gap-4 mt-6 justify-center">
            <Button size="lg" onClick={handleCreateChallenge} className="gap-2">
              <Zap className="h-4 w-4" />
              Create Challenge
            </Button>
            <Button size="lg" variant="outline" onClick={handleJoinDemo} className="gap-2">
              <Users className="h-4 w-4" />
              Join Demo Duel
            </Button>
          </div>
        </div>
      </header>

      {/* Feature highlights */}
      <section className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Clock />}
            title="Timed Duels"
            description="Challenge yourself and others with timed productivity goals"
          />
          <FeatureCard 
            icon={<Users />}
            title="Real-time Competition"
            description="Compete head-to-head and track progress instantly"
          />
          <FeatureCard 
            icon={<Zap />}
            title="Earn XP & Level Up"
            description="Gain experience points for completing challenges"
          />
          <FeatureCard 
            icon={<Trophy />}
            title="Leaderboards"
            description="Climb the ranks and showcase your productivity mastery"
          />
        </div>
      </section>

      {/* Active challenges */}
      <section className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-6">Active Challenges</h2>
        <ActiveChallenges />
      </section>

      {/* Leaderboard section */}
      <section className="container mx-auto py-12">
        <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
        <Leaderboard />
      </section>

      {/* Create challenge modal */}
      <CreateChallengeModal 
        open={showCreateModal} 
        onOpenChange={setShowCreateModal} 
      />
    </div>
  );
};

// Feature card component
const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
}) => {
  return (
    <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Index;
