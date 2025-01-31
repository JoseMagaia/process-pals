import { Header } from "@/components/Header";
import { FeedPost } from "@/components/FeedPost";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
  });

  const { data: profile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session?.user?.id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const isMentor = profile?.user_type === 'mentor';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="md:col-span-3 space-y-6">
            <div className="bg-white rounded-lg shadow p-4">
              {session ? (
                <>
                  <h3 className="font-semibold mb-2">Welcome back!</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {isMentor ? "Share your knowledge" : "Find guidance"}
                  </p>
                  {isMentor && (
                    <Button
                      onClick={() => navigate("/create")}
                      className="w-full gap-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Create Post
                    </Button>
                  )}
                </>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Join ProcessPal to connect with mentors and share experiences
                  </p>
                  <Button
                    onClick={() => navigate("/auth")}
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search processes..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <CategoryFilter
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />

            <div className="space-y-6">
              {SAMPLE_POSTS.map((post, index) => (
                <FeedPost 
                  key={index} 
                  {...post} 
                  postId={`sample-${index}`}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-4">Top Mentors</h3>
              {/* Add mentor list here */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

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

export default Index;