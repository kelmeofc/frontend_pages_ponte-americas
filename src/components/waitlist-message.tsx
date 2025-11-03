import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Link from 'next/link';
import { Users, Instagram, ExternalLink, TriangleAlert } from 'lucide-react';

interface WaitlistMessageProps {
  className?: string;
}

export function WaitlistMessage({ className = '' }: WaitlistMessageProps) {
  return (
    <Dialog open onOpenChange={() => {}}>
      <DialogContent className={`max-w-md mx-auto [&>button]:hidden ${className}`}>
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-orange-100 p-3">
              <TriangleAlert className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <DialogTitle className="text-orange-800 text-center"><h2 className="text-2xl">Atenção!</h2></DialogTitle>
          <DialogDescription className="text-sm text-center text-gray-600">As inscrições para o curso estão temporariamente pausadas devido ao grande número de matrículas para esta turma.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-center">
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Lista de Espera Ativa</span>
            </div>
            <p className="text-xs text-orange-700">Você está na nossa lista de espera e será notificado assim que as inscrições reabrirem.</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">Enquanto isso, acompanhe nossas novidades:</p>
            <Link href="https://instagram.com/ponteamericas" target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center border border-pink-300 text-pink-700 hover:bg-pink-50 rounded-md px-3 py-2">
              <Instagram className="h-4 w-4 mr-2" />
              Acompanhar no Instagram
              <ExternalLink className="h-3 w-3 ml-2" />
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}