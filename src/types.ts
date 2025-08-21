
// All services and user-generated content will use this type
export interface Service {
  id: string;
  title: string;
  description: string;
  imageUrl: string; // Base64 encoded string from upload
  performerName: string;
  performerBio: string;
  performerAvatarUrl: string; // Base64 encoded string from upload
  performerId: number; // Telegram User ID
  status: 'pending' | 'approved' | 'rejected';
  // New fields for more detailed services
  category?: string;
  tags?: string[];
  price?: number;
  turnaroundTime?: string;
}

export interface OrderDetails {
  serviceId?: string;
  uploadedFile?: File;
  textDetails?: string;
  contactInfo?: string;
}