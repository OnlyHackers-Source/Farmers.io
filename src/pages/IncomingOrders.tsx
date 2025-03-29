
import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import WeatherWidget from "@/components/dashboard/WeatherWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface IncomingOrder {
  id: string;
  cropName: string;
  quantity: string;
  price: string;
  buyerName: string;
  date: string;
  status: "pending" | "accepted" | "rejected";
}

export default function IncomingOrders() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sample data for incoming orders
  const [incomingOrders, setIncomingOrders] = useState<IncomingOrder[]>([
    {
      id: "ord-001",
      cropName: "Rice",
      quantity: "500 kg",
      price: "₹15,000",
      buyerName: "Rajesh Trading Co.",
      date: "2025-03-09",
      status: "pending"
    },
    {
      id: "ord-002",
      cropName: "Wheat",
      quantity: "300 kg",
      price: "₹9,000",
      buyerName: "Global Foods",
      date: "2025-03-08",
      status: "pending"
    },
    {
      id: "ord-003",
      cropName: "Potatoes",
      quantity: "200 kg",
      price: "₹6,000",
      buyerName: "Vegetable Mart",
      date: "2025-03-07",
      status: "pending"
    }
  ]);

  const handleOrderAction = (id: string, action: "accepted" | "rejected") => {
    setIncomingOrders(prevOrders =>
      prevOrders.map(order => 
        order.id === id ? { ...order, status: action } : order
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader onToggleSidebar={toggleSidebar} />
      
      <div className="flex">
        <DashboardSidebar isOpen={sidebarOpen} />
        
        <div className="flex-1 p-4 md:p-6 md:ml-64">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-farmer-earth">Incoming Orders</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Orders Awaiting Your Response</CardTitle>
                </CardHeader>
                <CardContent>
                  {incomingOrders.length > 0 ? (
                    <div className="space-y-4">
                      {incomingOrders.map((order) => (
                        <div key={order.id} className="bg-white p-4 rounded-lg border shadow-sm">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                            <div>
                              <h3 className="font-semibold text-lg">{order.cropName}</h3>
                              <p className="text-sm text-gray-500">Order #{order.id}</p>
                              <div className="grid grid-cols-2 gap-x-4 mt-2">
                                <p className="text-sm"><span className="font-medium">Quantity:</span> {order.quantity}</p>
                                <p className="text-sm"><span className="font-medium">Price:</span> {order.price}</p>
                                <p className="text-sm"><span className="font-medium">Buyer:</span> {order.buyerName}</p>
                                <p className="text-sm"><span className="font-medium">Date:</span> {order.date}</p>
                              </div>
                            </div>
                            
                            {order.status === "pending" ? (
                              <div className="flex gap-2">
                                <Button 
                                  onClick={() => handleOrderAction(order.id, "accepted")}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Check className="mr-1 h-4 w-4" /> Accept
                                </Button>
                                <Button 
                                  onClick={() => handleOrderAction(order.id, "rejected")}
                                  variant="outline"
                                  className="border-red-500 text-red-500 hover:bg-red-50"
                                >
                                  <X className="mr-1 h-4 w-4" /> Decline
                                </Button>
                              </div>
                            ) : (
                              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                order.status === "accepted" 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {order.status === "accepted" ? "Accepted" : "Rejected"}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-gray-500">No incoming orders at the moment</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            <div>
              <WeatherWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
