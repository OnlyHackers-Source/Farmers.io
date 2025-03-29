
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Sample crop data - in a real app, this would come from an API
const crops = [
  {
    id: 1,
    name: "Organic Rice",
    quantity: "500 kg",
    price: "₹30/kg",
    status: "Available",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 2,
    name: "Fresh Tomatoes",
    quantity: "200 kg",
    price: "₹25/kg",
    status: "Low Stock",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  },
  {
    id: 3,
    name: "Green Chilies",
    quantity: "50 kg",
    price: "₹40/kg",
    status: "Available",
    image: "https://images.unsplash.com/photo-1593478595619-8c1f93cc04d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
  }
];

export default function CropsListing() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-farmer-earth">Current Available Crops</CardTitle>
        <Button size="sm" className="bg-farmer-green hover:bg-farmer-green-dark">
          <Plus className="h-4 w-4 mr-1" /> Add Crop
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {crops.map((crop) => (
            <div key={crop.id} className="flex items-center space-x-4 p-3 bg-white rounded-md border border-gray-100">
              <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                <img 
                  src={crop.image} 
                  alt={crop.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{crop.name}</h3>
                  <Badge className={crop.status === "Available" ? "bg-farmer-green" : "bg-amber-500"}>
                    {crop.status}
                  </Badge>
                </div>
                <div className="mt-1 flex text-xs text-gray-500">
                  <span className="mr-3">{crop.quantity}</span>
                  <span>{crop.price}</span>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="flex-shrink-0 border-farmer-green text-farmer-green hover:bg-farmer-green-light">
                Edit
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
