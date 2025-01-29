import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProcessCardProps {
  title: string;
  description: string;
  category: string;
  mentorName: string;
  mentorImage?: string;
}

export const ProcessCard = ({
  title,
  description,
  category,
  mentorName,
  mentorImage,
}: ProcessCardProps) => {
  return (
    <Card className="process-card">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{category}</Badge>
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Avatar className="mentor-avatar h-8 w-8">
            <AvatarImage src={mentorImage} />
            <AvatarFallback>{mentorName[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{mentorName}</span>
        </div>
      </CardContent>
    </Card>
  );
};