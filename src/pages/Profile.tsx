import { Header } from "@/components/Header";
import { FeedPost } from "@/components/FeedPost";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Profile = () => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{profile?.full_name}</h1>
        <p className="text-gray-600 mb-4">{profile?.bio}</p>
        
        <div className="space-y-6 mt-8">
          {SAMPLE_POSTS.map((post, index) => (
            <FeedPost 
              key={index} 
              {...post} 
              postId={`profile-${index}`}
            />
          ))}
        </div>
      </div>
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

export default Profile;
