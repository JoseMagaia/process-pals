import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FlowItemComments } from "./FlowItemComments";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  postId: string;
}

export const FeedPost = ({ author, content, postImage, timestamp, likes, comments, postId }: FeedPostProps) => {
  const [showComments, setShowComments] = useState(false);

  const { data: flowItems } = useQuery({
    queryKey: ['flowItems', postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('flow_chart_items')
        .select(`
          id,
          content,
          media_url,
          item_type,
          position,
          flow_item_comments (
            id,
            content,
            created_at,
            profiles (
              full_name,
              avatar_url
            )
          )
        `)
        .eq('post_id', postId)
        .order('position');

      if (error) throw error;
      return data;
    },
  });

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
        
        {flowItems && flowItems.map((item: any) => (
          <Card key={item.id} className="p-4">
            {item.item_type === 'text' ? (
              <p>{item.content}</p>
            ) : (
              <img 
                src={item.media_url} 
                alt="Flow item" 
                className="max-h-[300px] object-contain"
              />
            )}
            <div className="mt-4">
              <FlowItemComments
                flowItemId={item.id}
                comments={item.flow_item_comments}
                onCommentAdded={() => {
                  // Refetch flow items
                }}
              />
            </div>
          </Card>
        ))}
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button variant="ghost" size="sm" className="gap-2">
          <Heart className="w-4 h-4" />
          {likes}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2"
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className="w-4 h-4" />
          {comments}
        </Button>
      </CardFooter>
    </Card>
  );
};