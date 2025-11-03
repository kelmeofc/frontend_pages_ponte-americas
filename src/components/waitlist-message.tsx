import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Instagram, ExternalLink } from 'lucide-react';

interface WaitlistMessageProps {
  onClose?: () => void;
  className?: string;
}

export function WaitlistMessage({ onClose, className = '' }: WaitlistMessageProps) {
  const handleInstagramClick = () => {
    // Apenas abre o Instagram — nenhuma submissão registrada
    window.open('https://instagram.com/ponteamericas', '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className={`w-full max-w-md mx-auto ${className}`}>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-orange-100 p-3">
            <Clock className="h-6 w-6 text-orange-600" />
          </div>
        </div>
        <CardTitle className="text-orange-800">Inscrições em Breve</CardTitle>
        <CardDescription>
          As inscrições para o curso estão temporariamente pausadas
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="text-center space-y-3">
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">
                Lista de Espera Ativa
              </span>
            </div>
            <p className="text-xs text-orange-700">
              Você está na nossa lista de espera e será notificado assim que as inscrições reabrirem.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Enquanto isso, acompanhe nossas novidades:
            </p>
            
            <Button
              onClick={handleInstagramClick}
              variant="outline"
              className="w-full border-pink-300 text-pink-700 hover:bg-pink-50"
            >
              <Instagram className="h-4 w-4 mr-2" />
              Seguir no Instagram
              <ExternalLink className="h-3 w-3 ml-2" />
            </Button>
          </div>

          {onClose && (
            <Button
              onClick={onClose}
              variant="secondary"
              className="w-full mt-4"
            >
              Entendi
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}