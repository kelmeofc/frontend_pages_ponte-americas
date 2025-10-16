import { create } from 'zustand';

type ModalType = 'success' | 'error' | 'warning' | 'info';

interface ModalData {
  isOpen: boolean;
  title: string;
  description: string;
  type: ModalType;
}

interface ModalStore {
  modal: ModalData;
  openModal: (data: Omit<ModalData, 'isOpen'>) => void;
  closeModal: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  modal: {
    isOpen: false,
    title: '',
    description: '',
    type: 'info',
  },
  openModal: (data) => set({ modal: { ...data, isOpen: true } }),
  closeModal: () => set((state) => ({ modal: { ...state.modal, isOpen: false } })),
}));