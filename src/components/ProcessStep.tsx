import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "./ui/card";
import { GripVertical } from "lucide-react";

interface ProcessStepProps {
  id: string;
  type: string;
  title: string;
}

export const ProcessStep = ({ id, type, title }: ProcessStepProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="bg-white cursor-move"
      {...attributes}
    >
      <CardContent className="p-4 flex items-center gap-4">
        <div {...listeners} className="touch-none">
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">Type: {type}</p>
        </div>
      </CardContent>
    </Card>
  );
};