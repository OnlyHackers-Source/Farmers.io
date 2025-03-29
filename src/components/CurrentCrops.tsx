
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { Translation } from '../utils/translations';
import { Link } from 'react-router-dom';

interface CurrentCropsProps {
  translations: Translation;
}

interface CropItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  currency: string;
  image: string;
  status: 'available' | 'low';
}

const CurrentCrops: React.FC<CurrentCropsProps> = ({ translations }) => {
  // Mock data for available crops
  const crops: CropItem[] = [
    {
      id: 1,
      name: 'Organic Rice',
      quantity: 500,
      unit: 'kg',
      price: 30,
      currency: '₹',
      image: '/lovable-uploads/9bf6714b-4f1b-4f28-a6c6-ecf57fe2e79f.png',
      status: 'available'
    },
    {
      id: 2,
      name: 'Fresh Tomatoes',
      quantity: 200,
      unit: 'kg',
      price: 25,
      currency: '₹',
      image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?q=80&w=2340&auto=format&fit=crop',
      status: 'low'
    },
    {
      id: 3,
      name: 'Green Chilies',
      quantity: 50,
      unit: 'kg',
      price: 40,
      currency: '₹',
      image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=2340&auto=format&fit=crop',
      status: 'available'
    }
  ];





  const getStoredProducts = () => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
  };

  const products = getStoredProducts();

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <CardTitle>{translations.currentAvailableCrops}</CardTitle>
          <Link to={"/add-product"}>
            <Button className="bg-green-600 hover:bg-green-700">

              <Plus className="h-4 w-4 mr-1" /> {translations.addCrop}
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {products.map((product: any) => {
            return (
              <div key={product.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="h-16 w-16 rounded overflow-hidden">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.quantity} {product.unit} · {product.currency}{product.price}/{product.unit}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={product.status === 'available'
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                    }
                  >
                    {product.status === 'available' ? translations.available : translations.lowStock}
                  </Badge>
                  <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50">
                    {translations.edit}
                  </Button>
                </div>
              </div>
            );
          })}
          {crops.map((crop) => (
            <div key={crop.id} className="flex items-center justify-between border-b pb-4 last:border-0">
              <div className="flex items-center gap-3">
                <div className="h-16 w-16 rounded overflow-hidden">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{crop.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {crop.quantity} {crop.unit} · {crop.currency}{crop.price}/{crop.unit}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  className={crop.status === 'available'
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                  }
                >
                  {crop.status === 'available' ? translations.available : translations.lowStock}
                </Badge>
                <Button variant="outline" size="sm" className="border-gray-200 hover:bg-gray-50">
                  {translations.edit}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentCrops;
