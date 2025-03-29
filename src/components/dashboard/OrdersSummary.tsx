
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart } from "lucide-react";

export default function OrdersSummary() {
  // Sample data - in a real app, this would come from an API
  const pendingOrders = 5;
  const completedOrders = 28;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-gradient-to-br from-farmer-yellow-light to-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-farmer-earth text-base font-semibold">Incoming Orders</CardTitle>
          <ShoppingCart className="h-5 w-5 text-farmer-earth" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-farmer-earth-light">{pendingOrders}</div>
          <p className="text-xs text-farmer-earth mt-1">Orders awaiting your action</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-farmer-green-light to-white">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-farmer-earth text-base font-semibold">Completed Orders</CardTitle>
          <Package className="h-5 w-5 text-farmer-earth" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-farmer-earth-light">{completedOrders}</div>
          <p className="text-xs text-farmer-earth mt-1">Successfully delivered</p>
        </CardContent>
      </Card>
    </div>
  );
}
