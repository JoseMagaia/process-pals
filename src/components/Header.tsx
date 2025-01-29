import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">
          ProcessPal
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/browse">Browse</Link>
          <Link to="/create">
            <Button>Share Your Process</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};