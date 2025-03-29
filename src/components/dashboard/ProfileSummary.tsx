
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, MapPin, Phone, Star } from "lucide-react";

export default function ProfileSummary() {
  // Sample profile data - in a real app, this would come from an API
  const profile = {
    name: "Rajesh Singh",
    location: "Amritsar, Punjab",
    phone: "+91 98765 43210",
    rating: 4.8,
    experience: "10+ years",
    crops: ["Rice", "Wheat", "Vegetables"],
    description: "Experienced organic farmer specializing in sustainable farming practices. Providing high-quality produce directly to wholesalers."
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-farmer-earth">Profile Overview</CardTitle>
        <Button variant="outline" size="sm" className="border-farmer-green text-farmer-green hover:bg-farmer-green-light">
          <Edit className="h-4 w-4 mr-1" /> Edit Profile
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" />
              <AvatarFallback className="bg-farmer-green text-white text-xl">RS</AvatarFallback>
            </Avatar>
            <div className="mt-2 flex items-center text-sm">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="font-medium">{profile.rating}</span>
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{profile.name}</h3>
            
            <div className="mt-1 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1 text-farmer-earth" />
                {profile.location}
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-1 text-farmer-earth" />
                {profile.phone}
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-600">{profile.description}</p>
            </div>
            
            <div className="mt-4">
              <div className="text-sm font-medium">Specializations:</div>
              <div className="mt-1 flex flex-wrap gap-1">
                {profile.crops.map((crop, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-farmer-green-light text-farmer-green rounded-full">
                    {crop}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
