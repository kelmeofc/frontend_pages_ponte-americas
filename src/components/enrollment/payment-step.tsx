import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, ArrowLeft } from 'lucide-react';
import { WaitlistMessage } from '@/components/waitlist-message';

interface PaymentStepProps {
  onBack?: () => void;
  onNext?: () => void;
  isLoading?: boolean;
  showWaitlist?: boolean;
}

export function PaymentStep({ onBack, onNext, isLoading = false, showWaitlist = true }: PaymentStepProps) {
  // Show waitlist message instead of payment form when enrollment is paused
  if (showWaitlist) {
    return (
      <div className="space-y-4">
        <WaitlistMessage />
      </div>
    );
  }

  // Original payment form (for future use)
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-primary/10 p-3">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription>
          Complete your enrollment with payment details
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Placeholder content */}
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Payment integration coming soon
          </p>
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm">
              This is a placeholder for the payment step. 
              Integration with payment providers will be implemented here.
            </p>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-3">
          {onBack && (
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isLoading}
              className="flex-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          
          {onNext && (
            <Button
              onClick={onNext}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Processing...' : 'Continue'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}