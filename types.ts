import type { ReactNode, ComponentProps } from 'react';

export interface Category {
  id: string;
  title: string;
  description: string;
  performer: string;
  performerBio: string;
  performerAvatarUrl: string;
  icon: (props: ComponentProps<'svg'>) => ReactNode;
  imageUrl: string;
  options: CategoryOption[];
  orderSteps: OrderStep[];
  faq?: { question: string; answer: string; }[];
}

export interface CategoryOption {
  id:string;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
}

export interface OrderStep {
  id: string;
  title: string;
  description: string;
  component: 'style' | 'upload' | 'details' | 'confirm';
}

export interface OrderDetails {
  categoryId?: string;
  selectedOptionId?: string;
  uploadedFile?: File;
  textDetails?: string;
  contactInfo?: string;
}