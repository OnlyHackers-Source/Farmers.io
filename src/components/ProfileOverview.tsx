
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Phone, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Translation } from '../utils/translations';

interface ProfileOverviewProps {
  translations: Translation;
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({ translations }) => {
  // Mock user data
  const farmer = {
    name: 'Rajesh Singh',
    location: 'Amritsar, Punjab',
    phone: '+91 98765 43210',
    rating: 4.8,
    bio: 'Experienced organic farmer specializing in sustainable farming practices. Providing high-quality produce directly to wholesalers.',
    specializations: ['Rice', 'Wheat', 'Vegetables']
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <CardTitle>{translations.profileOverview}</CardTitle>
          <Button variant="outline" size="sm" className="text-green-600 border-green-200 hover:bg-green-50">
            <span className="mr-1">✏️</span> {translations.editProfile}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex gap-4 items-start">
          <Avatar className="h-20 w-20 border-2 border-green-100">
            <AvatarFallback className="bg-green-500 text-white text-xl">RS</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{farmer.name}</h3>
            
            <div className="flex items-center text-muted-foreground text-sm gap-2">
              <MapPin className="h-4 w-4" />
              <span>{farmer.location}</span>
            </div>
            
            <div className="flex items-center text-muted-foreground text-sm gap-2">
              <Phone className="h-4 w-4" />
              <span>{farmer.phone}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{farmer.rating}</span>
            </div>
          </div>
        </div>
        
        <p className="mt-4 text-muted-foreground">{farmer.bio}</p>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">{translations.specializations}:</h4>
          <div className="flex flex-wrap gap-2">
            {farmer.specializations.map((specialty, index) => (
              <Badge key={index} variant="outline" className="bg-green-50 text-green-800 border-green-200">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileOverview;
