
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Award, Medal } from "lucide-react";

// Mock data for leaderboard
const leaderboardData = [
  { id: 1, username: "AlexSmith", xp: 1250, completedChallenges: 15 },
  { id: 2, username: "JaneDoe", xp: 1120, completedChallenges: 12 },
  { id: 3, username: "SamJohnson", xp: 980, completedChallenges: 10 },
  { id: 4, username: "EmilyWong", xp: 820, completedChallenges: 8 },
  { id: 5, username: "MichaelBrown", xp: 750, completedChallenges: 7 },
  { id: 6, username: "SarahGarcia", xp: 650, completedChallenges: 6 },
  { id: 7, username: "DavidLee", xp: 580, completedChallenges: 5 },
  { id: 8, username: "OliviaTaylor", xp: 520, completedChallenges: 4 },
];

const Leaderboard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Top Productivity Champions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase border-b">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">Rank</th>
                <th scope="col" className="px-6 py-3 text-left">User</th>
                <th scope="col" className="px-6 py-3 text-left">XP</th>
                <th scope="col" className="px-6 py-3 text-left">Completed</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-secondary/20">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {index === 0 && <Trophy className="h-4 w-4 text-yellow-500 mr-1" />}
                      {index === 1 && <Medal className="h-4 w-4 text-gray-400 mr-1" />}
                      {index === 2 && <Award className="h-4 w-4 text-amber-700 mr-1" />}
                      {index + 1}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{user.username}</td>
                  <td className="px-6 py-4">{user.xp.toLocaleString()} XP</td>
                  <td className="px-6 py-4">{user.completedChallenges} challenges</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
