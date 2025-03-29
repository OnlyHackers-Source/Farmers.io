import React from 'react';
import { Translation } from '../utils/translations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Download, CheckCircle2, XCircle, Clock } from 'lucide-react';

interface Order {
  id: string;
  date: string;
  buyer: {
    name: string;
    location: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  status: 'completed' | 'pending' | 'cancelled';
  amount: number;
  paid: boolean;
}

interface OrdersSectionProps {
  translations: Translation;
  type: 'previous' | 'incoming';
}

const OrdersSection: React.FC<OrdersSectionProps> = ({ translations, type }) => {
  const previousOrders: Order[] = [
    {
      id: 'ORD-2023-001',
      date: '2023-10-15',
      buyer: { name: 'Punjab Wholesalers', location: 'Amritsar, Punjab' },
      items: [
        { name: 'Basmati Rice', quantity: 200, price: 85 },
        { name: 'Wheat', quantity: 100, price: 45 }
      ],
      status: 'completed',
      amount: 21500,
      paid: true
    },
    {
      id: 'ORD-2023-002',
      date: '2023-10-05',
      buyer: { name: 'Green Harvest Ltd.', location: 'Delhi, Delhi' },
      items: [
        { name: 'Tomatoes', quantity: 150, price: 30 }
      ],
      status: 'completed',
      amount: 4500,
      paid: true
    },
    {
      id: 'ORD-2023-003',
      date: '2023-09-28',
      buyer: { name: 'Metro Grocers', location: 'Chandigarh, Punjab' },
      items: [
        { name: 'Potatoes', quantity: 250, price: 25 },
        { name: 'Tomatoes', quantity: 50, price: 30 }
      ],
      status: 'cancelled',
      amount: 7750,
      paid: false
    }
  ];

  const incomingOrders: Order[] = [
    {
      id: 'ORD-2023-004',
      date: '2023-11-15',
      buyer: { name: 'Fresh Foods Co.', location: 'Jaipur, Rajasthan' },
      items: [
        { name: 'Basmati Rice', quantity: 150, price: 85 }
      ],
      status: 'pending',
      amount: 12750,
      paid: false
    },
    {
      id: 'ORD-2023-005',
      date: '2023-11-10',
      buyer: { name: 'Organic Life', location: 'Mumbai, Maharashtra' },
      items: [
        { name: 'Wheat', quantity: 300, price: 45 },
        { name: 'Potatoes', quantity: 100, price: 25 }
      ],
      status: 'pending',
      amount: 16000,
      paid: true
    }
  ];

  const orders = type === 'previous' ? previousOrders : incomingOrders;
  const title = type === 'previous' ? translations.previousOrders : translations.incomingOrders;

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 hover:bg-green-600"><CheckCircle2 className="h-3 w-3 mr-1" /> Completed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" /> Cancelled</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="animate-slide-in">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {type === 'previous' 
              ? 'View your completed orders and history.' 
              : 'Manage your incoming orders and requests.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="details">Detailed View</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{translations.orderID}</TableHead>
                      <TableHead>{translations.orderDate}</TableHead>
                      <TableHead>{translations.buyer}</TableHead>
                      <TableHead>{translations.status}</TableHead>
                      <TableHead className="text-right">{translations.amount}</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div>
                            <p>{order.buyer.name}</p>
                            <p className="text-sm text-muted-foreground">{order.buyer.location}</p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell className="text-right">₹{order.amount.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8">
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="details">
              <div className="space-y-6">
                {orders.map((order) => (
                  <Card key={order.id} className="overflow-hidden">
                    <div className="border-b border-border bg-muted/40 px-4 py-2 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{order.id}</span>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">{translations.buyer}</h4>
                          <p>{order.buyer.name}</p>
                          <p className="text-sm text-muted-foreground">{order.buyer.location}</p>
                        </div>
                        <div className="text-right">
                          <h4 className="text-sm font-medium mb-1">Payment Status</h4>
                          {order.paid ? (
                            <Badge variant="outline" className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Paid</Badge>
                          ) : (
                            <Badge variant="outline" className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20">Unpaid</Badge>
                          )}
                        </div>
                      </div>
                      
                      <h4 className="text-sm font-medium mb-2">Order Items</h4>
                      <div className="rounded-md border mb-4">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Item</TableHead>
                              <TableHead className="text-right">Quantity</TableHead>
                              <TableHead className="text-right">Price</TableHead>
                              <TableHead className="text-right">Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {order.items.map((item, index) => (
                              <TableRow key={index}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell className="text-right">{item.quantity} kg</TableCell>
                                <TableCell className="text-right">₹{item.price}/kg</TableCell>
                                <TableCell className="text-right">₹{(item.quantity * item.price).toLocaleString()}</TableCell>
                              </TableRow>
                            ))}
                            <TableRow>
                              <TableCell colSpan={3} className="text-right font-medium">Total Amount</TableCell>
                              <TableCell className="text-right font-medium">₹{order.amount.toLocaleString()}</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download Invoice
                        </Button>
                        <Button size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersSection;
