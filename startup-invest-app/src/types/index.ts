export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  type: 'investor' | 'startup';
  verified: boolean;
  bio?: string;
  location?: string;
  joinedDate: Date;
  followers: number;
  following: number;
}

export interface Investor extends User {
  type: 'investor';
  investmentRange: {
    min: number;
    max: number;
  };
  sectors: string[];
  totalInvestments: number;
  successfulInvestments: number;
  portfolio: Investment[];
}

export interface Startup extends User {
  type: 'startup';
  companyName: string;
  industry: string;
  stage: 'idea' | 'mvp' | 'early' | 'growth' | 'expansion';
  fundingGoal: number;
  currentFunding: number;
  fundingRaised: number;
  valuation?: number;
  teamSize: number;
  foundedDate: Date;
  foundedYear: number;
  website?: string;
  pitch: StartupPitch;
  description: string;
  businessModel?: string;
  competitiveAdvantage?: string;
  investors: number;
}

export interface StartupPitch {
  id: string;
  startupId: string;
  videoUrl: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: number;
  views: number;
  likes: number;
  comments: Comment[];
  createdAt: Date;
  tags: string[];
  fundingGoal: number;
  currentFunding: number;
  minInvestment: number;
  equity?: number;
}

export interface Investment {
  id: string;
  investorId: string;
  startupId: string;
  amount: number;
  date: Date;
  status: 'pending' | 'completed' | 'cancelled';
  equity?: number;
  terms?: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  createdAt: Date;
  likes: number;
  replies?: Comment[];
}

export interface Notification {
  id: string;
  userId: string;
  type: 'investment' | 'comment' | 'like' | 'follow' | 'update';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export interface InvestmentOpportunity {
  id: string;
  startup: Startup;
  pitch: StartupPitch;
  trending: boolean;
  featured: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  expectedReturn?: number;
  timeframe?: string;
}