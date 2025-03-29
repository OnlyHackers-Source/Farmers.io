
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Truck } from "lucide-react";

// Sample order data - in a real app, this would come from an API
const recentOrders = [
  {
    id: "ORD-001",
    buyer: "Rahul Sharma",
    crop: "Organic Rice",
    quantity: "100 kg",
    total: "₹3,000",
    date: "2023-06-10",
    status: "Delivered"
  },
  {
    id: "ORD-002",
    buyer: "Amit Kumar",
    crop: "Fresh Tomatoes",
    quantity: "50 kg",
    total: "₹1,250",
    date: "2023-06-05",
    status: "Processing"
  },
  {
    id: "ORD-003",
    buyer: "Priya Singh",
    crop: "Green Chilies",
    quantity: "20 kg",
    total: "₹800",
    date: "2023-06-01",
    status: "Delivered"
  }
];

export default function RecentOrderList() {
  const getStatusColor = (status: string) => {
    switch(status) {
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "Processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-farmer-earth">Recent Orders</CardTitle>
        <Button variant="link" className="text-farmer-green">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentOrders.map((order) => (
            <div key={order.id} className="flex items-center p-3 bg-white rounded-md border border-gray-100">
              <div className="p-2 rounded-full bg-farmer-green-light mr-3">
                <Truck className="h-5 w-5 text-farmer-green" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{order.crop}</h3>
                  <Badge className={`${getStatusColor(order.status)} border`}>
                    {order.status}
                  </Badge>
                </div>
                <div className="mt-1 flex flex-col sm:flex-row sm:items-center text-xs text-gray-500">
                  <span>Order #{order.id.substring(4)}</span>
                  <span className="hidden sm:inline mx-1">•</span>
                  <span>{order.buyer}</span>
                  <span className="hidden sm:inline mx-1">•</span>
                  <span>{order.date}</span>
                </div>
              </div>
              
              <div className="text-right ml-4">
                <div className="text-sm font-medium text-gray-900">{order.total}</div>
                <div className="text-xs text-gray-500">{order.quantity}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
