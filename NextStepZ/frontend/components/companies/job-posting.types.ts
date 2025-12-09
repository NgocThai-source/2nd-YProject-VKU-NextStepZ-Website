export interface JobPosting {
  id: string;
  companyName: string;
  companyLogo?: string;
  tags: string[];
  description: string;
  mission: string;
  vision: string;
  companyHistory: {
    year: string;
    milestone: string;
  }[];
  address: string;
  phone: string;
  email: string;
  website: string;
  jobPositions: {
    title: string;
    minSalary: number;
    maxSalary: number;
  }[];
  workingHours: string;
  offDays: number;
  vacationDays: number;
  insurances: string[];
  salaryBenefits: string[];
  allowances: string[];
  benefits: string[];
  galleryImages: string[];
  createdAt: string;
  postedBy: string;
}
