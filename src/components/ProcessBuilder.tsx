import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ProcessStep } from "./ProcessStep";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const STEP_TEMPLATES = [
  { type: "video", title: "Add Video Explanation" },
  { type: "text", title: "Add Text Instructions" },
  { type: "document", title: "Add Document Template" },
  { type: "milestone", title: "Add Milestone" },
];

export const ProcessBuilder = () => {
  const [steps, setSteps] = useState<Array<{ id: string; type: string; title: string }>>([]);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setSteps((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addStep = (template: typeof STEP_TEMPLATES[0]) => {
    const newStep = {
      id: `${template.type}-${Date.now()}`,
      type: template.type,
      title: template.title,
    };
    setSteps([...steps, newStep]);
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Available Steps</h2>
        <div className="flex gap-2 flex-wrap">
          {STEP_TEMPLATES.map((template) => (
            <Button
              key={template.type}
              variant="outline"
              onClick={() => addStep(template)}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              {template.title}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Your Process Steps</h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={steps} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {steps.map((step) => (
                <ProcessStep key={step.id} id={step.id} type={step.type} title={step.title} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};