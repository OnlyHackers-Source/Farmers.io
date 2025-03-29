
import React, { useState } from 'react';
import { Translation } from '../utils/translations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CropData {
  id: string;
  name: string;
  type: string;
  quantity: number;
  price: number;
  image: string;
  description: string;
  harvestDate: string;
}

interface CropsSectionProps {
  translations: Translation;
}

const CropsSection: React.FC<CropsSectionProps> = ({ translations }) => {
  const [crops, setCrops] = useState<CropData[]>([
    {
      id: '1',
      name: 'Basmati Rice',
      type: 'Grain',
      quantity: 500,
      price: 85,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?q=80&w=2070&auto=format&fit=crop',
      description: 'Premium quality Basmati Rice, organically grown.',
      harvestDate: '2023-10-15'
    },
    {
      id: '2',
      name: 'Wheat',
      type: 'Grain',
      quantity: 750,
      price: 45,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1bdca0998?q=80&w=2072&auto=format&fit=crop',
      description: 'High yield wheat variety, suitable for bread making.',
      harvestDate: '2023-11-10'
    },
    {
      id: '3',
      name: 'Tomatoes',
      type: 'Vegetable',
      quantity: 200,
      price: 30,
      image: 'https://images.unsplash.com/photo-1592924357229-3d986a9da58c?q=80&w=2070&auto=format&fit=crop',
      description: 'Fresh red tomatoes, perfect for salads and cooking.',
      harvestDate: '2023-09-20'
    },
    {
      id: '4',
      name: 'Potatoes',
      type: 'Vegetable',
      quantity: 350,
      price: 25,
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?q=80&w=2070&auto=format&fit=crop',
      description: 'Medium-sized potatoes, good for multiple cooking purposes.',
      harvestDate: '2023-09-05'
    }
  ]);

  const [newCrop, setNewCrop] = useState<Omit<CropData, 'id'>>({
    name: '',
    type: '',
    quantity: 0,
    price: 0,
    image: '',
    description: '',
    harvestDate: ''
  });

  const handleAddCrop = () => {
    setCrops([...crops, { ...newCrop, id: Date.now().toString() }]);
    setNewCrop({
      name: '',
      type: '',
      quantity: 0,
      price: 0,
      image: '',
      description: '',
      harvestDate: ''
    });
  };

  return (
    <div className="animate-slide-in">
      <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-amber-500/90 to-orange-600/90">
        <img 
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop" 
          alt="Crop field" 
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
        />
        <div className="relative z-10 px-6 py-8 text-white">
          <h1 className="text-3xl font-bold mb-2">{translations.availableCrops}</h1>
          <p className="text-white/80 max-w-2xl">Manage your harvest inventory, set prices, and make your produce available to wholesalers across the country.</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 items-center">
          <Avatar className="h-10 w-10 border-2 border-amber-200">
            <AvatarImage src="https://images.unsplash.com/photo-1592847867553-7726481279e7?q=80&w=2070&auto=format&fit=crop" alt="Farmer" />
            <AvatarFallback>FM</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{translations.availableCrops}</h2>
            <p className="text-sm text-muted-foreground">Manage your crop inventory</p>
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700">
              <Plus className="h-4 w-4" />
              {translations.addCrop}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{translations.addCrop}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">{translations.cropName}</Label>
                <Input 
                  id="name" 
                  value={newCrop.name} 
                  onChange={(e) => setNewCrop({...newCrop, name: e.target.value})} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="quantity">{translations.quantity}</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    value={newCrop.quantity} 
                    onChange={(e) => setNewCrop({...newCrop, quantity: Number(e.target.value)})} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">{translations.price}</Label>
                  <Input 
                    id="price" 
                    type="number" 
                    value={newCrop.price} 
                    onChange={(e) => setNewCrop({...newCrop, price: Number(e.target.value)})} 
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Input 
                  id="type" 
                  value={newCrop.type} 
                  onChange={(e) => setNewCrop({...newCrop, type: e.target.value})} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input 
                  id="image" 
                  value={newCrop.image} 
                  onChange={(e) => setNewCrop({...newCrop, image: e.target.value})} 
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={newCrop.description} 
                  onChange={(e) => setNewCrop({...newCrop, description: e.target.value})} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="harvestDate">Harvest Date</Label>
                <Input 
                  id="harvestDate" 
                  type="date" 
                  value={newCrop.harvestDate} 
                  onChange={(e) => setNewCrop({...newCrop, harvestDate: e.target.value})} 
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddCrop}>Save Crop</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map((crop) => (
          <Card key={crop.id} className="overflow-hidden transition-all hover:shadow-md border-amber-100">
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={crop.image || 'https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=2574&auto=format&fit=crop'} 
                alt={crop.name}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{crop.name}</CardTitle>
                  <CardDescription>{crop.type}</CardDescription>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-sm text-muted-foreground mb-2">{crop.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">{translations.quantity}</p>
                  <p className="font-medium">{crop.quantity} kg</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{translations.price}</p>
                  <p className="font-medium text-lg">₹{crop.price}/kg</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <p className="text-sm text-muted-foreground">
                Harvested: {new Date(crop.harvestDate).toLocaleDateString()}
              </p>
              <Button variant="outline" size="sm" className="border-amber-200 hover:bg-amber-50">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CropsSection;
