import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "./ui/card";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { GripVertical } from "lucide-react";

type FlowItemType = {
  id: string;
  type: 'text' | 'picture';
  content?: string;
  mediaUrl?: string;
  position: number;
};

interface FlowItemProps {
  item: FlowItemType;
  onUpdate: (item: FlowItemType) => void;
}

export const FlowItem = ({ item, onUpdate }: FlowItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="bg-white"
    >
      <CardContent className="p-4 flex items-start gap-4">
        <div {...attributes} {...listeners} className="cursor-move mt-2">
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
        <div className="flex-1">
          {item.type === 'text' ? (
            <Textarea
              placeholder="Enter text..."
              value={item.content || ''}
              onChange={(e) => onUpdate({ ...item, content: e.target.value })}
              className="min-h-[100px]"
            />
          ) : (
            <Input
              type="url"
              placeholder="Enter image URL..."
              value={item.mediaUrl || ''}
              onChange={(e) => onUpdate({ ...item, mediaUrl: e.target.value })}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};