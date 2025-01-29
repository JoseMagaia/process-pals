import { Header } from "@/components/Header";
import { FeedPost } from "@/components/FeedPost";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { MessageSquare } from "lucide-react";

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
];

const Profile = () => {
  const { username } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img
                src={SAMPLE_POSTS[0].author.image}
                alt={username}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{username}</h1>
              <p className="text-gray-600 mb-4">
                Helping students achieve their dreams through proven application strategies
              </p>
              <div className="flex gap-4">
                <Button className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </Button>
                <Button variant="outline">View Process Shop</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Posts</h2>
            <div className="space-y-6">
              {SAMPLE_POSTS.map((post, index) => (
                <FeedPost key={index} {...post} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold mb-4">About</h3>
              <div className="space-y-2 text-sm">
                <p>🎓 Harvard University '22</p>
                <p>📚 Application Mentor</p>
                <p>💡 Helped 50+ students</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;