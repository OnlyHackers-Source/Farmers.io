
import React from 'react';
import { Translation } from '../utils/translations';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, MapPin, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileSectionProps {
  translations: Translation;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ translations }) => {
  // Mock profile data
  const profile = {
    name: 'Rajesh Kumar',
    avatar: '',
    email: 'rajesh.kumar@example.com',
    phone: '+91 9876543210',
    address: '123 Farm Lane, Amritsar, Punjab, India',
    farmSize: '15 acres',
    farmingType: 'Organic',
    memberSince: 'June 2022'
  };

  return (
    <div className="grid gap-6 animate-slide-in">
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-semibold">{translations.profile}</CardTitle>
          <CardDescription>
            {translations.personalInfo}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
            <Avatar className="h-24 w-24 border-2 border-primary/10">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="text-2xl bg-secondary">{profile.name.charAt(0)}{profile.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-2 text-center sm:text-left flex-1">
              <h3 className="text-xl font-medium">{profile.name}</h3>
              <p className="text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {profile.address}
                </span>
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {profile.farmingType}
                </div>
                <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                  {profile.farmSize}
                </div>
              </div>
            </div>
            <Button size="icon" variant="ghost" className="rounded-full self-start ml-auto">
              <Edit className="h-4 w-4" />
              <span className="sr-only">Edit Profile</span>
            </Button>
          </div>
          
          <Separator />
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">{translations.contactInfo}</p>
                <p>{profile.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">{translations.contactInfo}</p>
                <p>{profile.phone}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <Card className="bg-secondary/50">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <p className="text-sm text-muted-foreground">Member Since</p>
                <p className="font-medium">{profile.memberSince}</p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/50">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <p className="font-medium">₹143,500</p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/50 col-span-2 sm:col-span-1">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <p className="text-sm text-muted-foreground">Active Listings</p>
                <p className="font-medium">6 Crops</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSection;
