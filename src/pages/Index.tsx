
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-farmer-green">Farmer.io</h1>
          <div className="space-x-2">
            <Button variant="outline" className="border-farmer-green text-farmer-green">
              Sign In
            </Button>
            <Button className="bg-farmer-green hover:bg-farmer-green-dark">
              Register
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-farmer-green-light to-white">
        <div className="container px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-farmer-green-dark mb-4">
            Connect Farmers Directly with Wholesalers
          </h1>
          <p className="text-xl text-farmer-earth max-w-2xl mx-auto mb-8">
            A marketplace for farmers to sell their crops and goods directly to wholesalers, cutting out the middlemen and increasing profits.
          </p>
          <div className="space-x-4">
            <Link to="/dashboard">
              <Button className="bg-farmer-green hover:bg-farmer-green-dark text-white px-8 py-6 text-lg">
                View Dashboard Demo
              </Button>
            </Link>
            <Button variant="outline" className="border-farmer-earth text-farmer-earth px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-white py-6 border-t border-gray-200">
        <div className="container px-4 text-center text-farmer-earth">
          <p>© 2024 Farmer.io - Connecting Farmers and Wholesalers</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
