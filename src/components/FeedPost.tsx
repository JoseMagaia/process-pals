import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface FeedPostProps {
  author: {
    name: string;
    image?: string;
  };
  content: string;
  postImage?: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export const FeedPost = ({ author, content, postImage, timestamp, likes, comments }: FeedPostProps) => {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={author.image} />
          <AvatarFallback>{author.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <Link to={`/profile/${encodeURIComponent(author.name)}`} className="hover:underline">
            <h3 className="font-semibold">{author.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground">{timestamp}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{content}</p>
        {postImage && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <img 
              src={postImage} 
              alt="Post content" 
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button variant="ghost" size="sm" className="gap-2">
          <Heart className="w-4 h-4" />
          {likes}
        </Button>
        <Button variant="ghost" size="sm" className="gap-2">
          <MessageCircle className="w-4 h-4" />
          {comments}
        </Button>
      </CardFooter>
    </Card>
  );
};