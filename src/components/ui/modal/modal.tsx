'use client'

import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useModal } from './use-modal';
import { CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
} as const;

const iconColors = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
} as const;

export const Modal = () => {
  const { modal, closeModal } = useModal();

  if (!modal.isOpen) return null;

  const IconComponent = iconMap[modal.type];
  const iconColor = iconColors[modal.type];

  return (
    <Dialog open={modal.isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center gap-3">
            <IconComponent className={`h-6 w-6 ${iconColor}`} />
            <DialogTitle className="title-4 text-center">{modal.title}</DialogTitle>
          </div>
          <DialogDescription className="text-4">{modal.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={closeModal} className="btn btn-primary">
            Continuar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};