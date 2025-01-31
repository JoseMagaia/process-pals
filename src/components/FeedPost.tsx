import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FlowItemComments } from "./FlowItemComments";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

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
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const { data: flowItems, refetch: refetchFlowItems } = useQuery({
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

  const { data: postComments, refetch: refetchComments } = useQuery({
    queryKey: ['postComments', postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          content,
          created_at,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleAddComment = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          author_id: user.id,
          content: newComment,
        });

      if (error) throw error;

      setNewComment("");
      refetchComments();
      
      toast({
        title: "Success",
        description: "Comment added successfully",
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive",
      });
    }
  };

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
                onCommentAdded={() => refetchFlowItems()}
              />
            </div>
          </Card>
        ))}
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <div className="flex gap-4 w-full">
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
        </div>
        
        {showComments && (
          <div className="w-full space-y-4">
            <div className="space-y-4">
              {postComments?.map((comment: any) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={comment.profiles.avatar_url} />
                    <AvatarFallback>
                      {comment.profiles.full_name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{comment.profiles.full_name}</p>
                    <p className="text-sm text-gray-600">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <Textarea
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                Comment
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};