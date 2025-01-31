import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface FlowItemCommentsProps {
  flowItemId: string;
  comments: any[];
  onCommentAdded: () => void;
}

export const FlowItemComments = ({
  flowItemId,
  comments,
  onCommentAdded,
}: FlowItemCommentsProps) => {
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const handleSubmit = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("flow_item_comments")
        .insert({
          flow_item_id: flowItemId,
          author_id: user.id,
          content,
        });

      if (error) throw error;

      setContent("");
      onCommentAdded();
      
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
    <div className="space-y-4">
      <div className="space-y-4">
        {comments.map((comment) => (
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={!content.trim()}>
          Comment
        </Button>
      </div>
    </div>
  );
};