import { useState } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { FlowItem } from "./FlowItem";
import { Plus, Image, Type, GitBranch } from "lucide-react";

type FlowItemType = {
  id: string;
  type: 'text' | 'picture';
  content?: string;
  mediaUrl?: string;
  position: number;
};

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<FlowItemType[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddItem = (type: 'text' | 'picture') => {
    const newItem: FlowItemType = {
      id: crypto.randomUUID(),
      type,
      position: items.length,
    };
    setItems([...items, newItem]);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(item => item.id === active.id);
    const newIndex = items.findIndex(item => item.id === over.id);

    const newItems = [...items];
    const [movedItem] = newItems.splice(oldIndex, 1);
    newItems.splice(newIndex, 0, movedItem);

    const updatedItems = newItems.map((item, index) => ({
      ...item,
      position: index,
    }));

    setItems(updatedItems);
  };

  const handleSubmit = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      // Create post
      const { data: post, error: postError } = await supabase
        .from("posts")
        .insert({
          title,
          author_id: user.id,
          content: title, // Using title as content for consistency
          category: "process",
        })
        .select()
        .single();

      if (postError) throw postError;

      // Create flow chart items
      const flowItems = items.map(item => ({
        post_id: post.id,
        content: item.content || null,
        media_url: item.mediaUrl || null,
        item_type: item.type,
        position: item.position,
      }));

      const { error: itemsError } = await supabase
        .from("flow_chart_items")
        .insert(flowItems);

      if (itemsError) throw itemsError;

      toast({
        title: "Success",
        description: "Post created successfully",
      });

      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Input
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-xl font-bold"
      />

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => handleAddItem("text")}
          className="gap-2"
        >
          <Type className="w-4 h-4" />
          Add Text
        </Button>
        <Button
          variant="outline"
          onClick={() => handleAddItem("picture")}
          className="gap-2"
        >
          <Image className="w-4 h-4" />
          Add Picture
        </Button>
        <Button variant="outline" className="gap-2">
          <GitBranch className="w-4 h-4" />
          Track
        </Button>
      </div>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {items.map((item) => (
              <FlowItem
                key={item.id}
                item={item}
                onUpdate={(updatedItem) => {
                  setItems(items.map(i => 
                    i.id === updatedItem.id ? updatedItem : i
                  ));
                }}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button onClick={handleSubmit} className="w-full">
        Post
      </Button>
    </div>
  );
};