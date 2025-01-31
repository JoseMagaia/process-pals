import { Header } from "@/components/Header";
import { FeedPost } from "@/components/FeedPost";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const { data: posts } = useQuery({
    queryKey: ['posts', selectedCategory, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (selectedCategory !== "All") {
        query = query.eq('category', selectedCategory);
      }

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(!!searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="md:col-span-3 space-y-6">
            <div className="bg-white rounded-lg shadow p-4">
              <Button
                onClick={() => navigate("/create")}
                className="w-full gap-2"
              >
                Create Post
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-6">
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search processes..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
            
            {isSearching && (
              <CategoryFilter
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
            )}

            <div className="space-y-6">
              {posts?.map((post) => (
                <FeedPost 
                  key={post.id}
                  postId={post.id}
                  author={{
                    name: post.profiles.full_name || "Anonymous",
                    image: post.profiles.avatar_url,
                  }}
                  content={post.content}
                  timestamp={new Date(post.created_at).toLocaleDateString()}
                  likes={0}
                  comments={0}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-4">Top Mentors</h3>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;