import React, { useState } from 'react';
import { Translation } from '../utils/translations';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, Tractor } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface RentalFormProps {
  translations: Translation;
}

const RentalForm: React.FC<RentalFormProps> = ({ translations }) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    equipmentType: '',
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    purpose: '',
    contactNumber: '',
    deliveryAddress: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.equipmentType || !formData.startDate || !formData.endDate || !formData.purpose) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    console.log('Form submitted:', formData);
    toast({
      title: "Rental Request Submitted",
      description: "Your equipment rental request has been received.",
    });
    
    setFormData({
      equipmentType: '',
      startDate: undefined,
      endDate: undefined,
      purpose: '',
      contactNumber: '',
      deliveryAddress: '',
    });
  };

  return (
    <div className="animate-slide-in">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Tractor className="h-6 w-6 text-primary" />
            <CardTitle>{translations.rentEquipment}</CardTitle>
          </div>
          <CardDescription>
            Rent farming equipment for your agricultural needs
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="equipment-type">{translations.equipmentType}</Label>
              <Select
                value={formData.equipmentType}
                onValueChange={(value) => setFormData({...formData, equipmentType: value})}
              >
                <SelectTrigger id="equipment-type">
                  <SelectValue placeholder={translations.selectEquipment} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tractor">{translations.tractor}</SelectItem>
                  <SelectItem value="harvester">{translations.harvester}</SelectItem>
                  <SelectItem value="sprayer">{translations.sprayer}</SelectItem>
                  <SelectItem value="plow">{translations.plow}</SelectItem>
                  <SelectItem value="other">{translations.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">{translations.startDate}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? (
                        format(formData.startDate, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => setFormData({...formData, startDate: date})}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="end-date">{translations.endDate}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? (
                        format(formData.endDate, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date) => setFormData({...formData, endDate: date})}
                      initialFocus
                      disabled={(date) => 
                        (formData.startDate ? date < formData.startDate : false) ||
                        date < new Date()
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="purpose">{translations.purpose}</Label>
              <Textarea 
                id="purpose"
                value={formData.purpose}
                onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                placeholder="Describe why you need this equipment"
                className="resize-none"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact">Contact Number</Label>
                <Input 
                  id="contact"
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                  placeholder="+91 9876543210"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery">Delivery Address</Label>
                <Input 
                  id="delivery"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({...formData, deliveryAddress: e.target.value})}
                  placeholder="Address for equipment delivery"
                />
              </div>
            </div>
            
            <div className="rounded-lg border border-border p-4 bg-muted/30">
              <h4 className="font-medium mb-2">Rental Terms</h4>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc pl-5">
                <li>Minimum rental period is 1 day</li>
                <li>Security deposit required before delivery</li>
                <li>The renter is responsible for any damages</li>
                <li>Cancellation must be made 24 hours in advance</li>
                <li>Delivery and pickup services available for additional fee</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setFormData({
              equipmentType: '',
              startDate: undefined,
              endDate: undefined,
              purpose: '',
              contactNumber: '',
              deliveryAddress: '',
            })}>
              Reset
            </Button>
            <Button type="submit">{translations.submit}</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RentalForm;
