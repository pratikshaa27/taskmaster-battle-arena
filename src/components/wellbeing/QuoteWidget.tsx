
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

// Sample quotes array
const quotes = [
  {
    text: "Self-care is not self-indulgence, it is self-preservation.",
    author: "Audre Lorde"
  },
  {
    text: "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman"
  },
  {
    text: "Mental health problems don't define who you are. They are something you experience.",
    author: "Roy Chisholm"
  },
  {
    text: "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
    author: "Anonymous"
  },
  {
    text: "The strongest people are those who win battles we know nothing about.",
    author: "Anonymous"
  },
  {
    text: "It's okay to not be okay – it's okay to ask for help.",
    author: "Anonymous"
  },
  {
    text: "There is hope, even when your brain tells you there isn't.",
    author: "John Green"
  }
];

const QuoteWidget = () => {
  const [quote, setQuote] = useState(quotes[0]);
  
  useEffect(() => {
    // Select a random quote when component mounts
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur shadow-lg border-t-4 border-t-blue-500 dark:border-t-blue-400 transform hover:-translate-y-1 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
            <Sparkles className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          </div>
          <div>
            <blockquote className="text-lg font-medium italic mb-2">
              "{quote.text}"
            </blockquote>
            <cite className="text-sm text-muted-foreground block text-right">
              — {quote.author}
            </cite>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteWidget;
