export interface ICreateEbookLead {
  name: string;
  email: string;
  phone: string;
  source: string;
  route: string;
  country?: string;
  city?: string;
  userAgent?: string;
}

export interface IEbookLead {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: string;
  route: string;
  country?: string;
  city?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}
