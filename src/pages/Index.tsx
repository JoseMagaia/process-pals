import { Header } from "@/components/Header";
import { ProcessCard } from "@/components/ProcessCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { useState } from "react";

const featuredProcesses = [
  {
    title: "How I Got Into Harvard",
    description: "A step-by-step guide to my successful application process",
    category: "College Admissions",
    mentorName: "Sarah Chen",
    mentorImage: "/placeholder.svg",
  },
  {
    title: "Fulbright Scholarship Success",
    description: "My journey to winning the Fulbright scholarship",
    category: "Scholarships",
    mentorName: "James Wilson",
    mentorImage: "/placeholder.svg",
  },
  {
    title: "UK Student Visa Guide",
    description: "Complete process for UK student visa application",
    category: "Visa Applications",
    mentorName: "Priya Patel",
    mentorImage: "/placeholder.svg",
  },
];

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProcesses = selectedCategory === "All"
    ? featuredProcesses
    : featuredProcesses.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Learn From Those Who Succeeded
          </h1>
          <p className="text-xl text-muted-foreground">
            Connect with mentors who have successfully completed the process you're starting
          </p>
        </div>

        <CategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProcesses.map((process, index) => (
            <ProcessCard key={index} {...process} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;