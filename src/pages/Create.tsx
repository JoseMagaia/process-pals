import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Create = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success!",
      description: "Your process has been created. It will be reviewed shortly.",
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Share Your Process</h1>
          
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Process Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., My Journey to Getting the Fulbright Scholarship"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scholarships">Scholarships</SelectItem>
                      <SelectItem value="college">College Admissions</SelectItem>
                      <SelectItem value="visa">Visa Applications</SelectItem>
                      <SelectItem value="job">Job Applications</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your process and what others will learn..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Content</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-32">
                      <div className="text-center">
                        <span className="block text-2xl mb-2">📹</span>
                        Add Video
                      </div>
                    </Button>
                    <Button variant="outline" className="h-32">
                      <div className="text-center">
                        <span className="block text-2xl mb-2">📝</span>
                        Add Text
                      </div>
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Create Process
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Create;