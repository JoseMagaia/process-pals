import { Header } from "@/components/Header";
import { FeedPost } from "@/components/FeedPost";
import { ProcessBuilder } from "@/components/ProcessBuilder";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

const SAMPLE_POSTS = [
  {
    author: {
      name: "Sarah Chen",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    },
    content: "Just published my Harvard application success story! Check out my process shop for the complete guide 📚",
    postImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 5,
  },
  {
    author: {
      name: "James Wilson",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    content: "New video tutorial on Fulbright Scholarship application tips is now live in my process shop! 🎓",
    postImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    timestamp: "5 hours ago",
    likes: 42,
    comments: 8,
  },
];

const Index = () => {
  const [showProcessBuilder, setShowProcessBuilder] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="space-y-4">
            <Button
              onClick={() => setShowProcessBuilder(!showProcessBuilder)}
              className="w-full gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Create Process
            </Button>
          </div>

          {/* Main Feed */}
          <div className="md:col-span-2">
            {showProcessBuilder ? (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold mb-6">Create Your Process</h2>
                <ProcessBuilder />
              </div>
            ) : (
              <div className="space-y-6">
                {SAMPLE_POSTS.map((post, index) => (
                  <FeedPost key={index} {...post} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;