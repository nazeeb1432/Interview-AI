import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">AI Mock Interview</h1>
      <p className="text-lg mb-6">Welcome to your AI-powered mock interview platform!</p>
      <Button variant="default">Start Interview</Button>
    </div>
  );
}
