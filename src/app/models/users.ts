export interface Users {
    _id: string;
    name: string;
    number: string;
    city: string;
    country: string;
    email: string;
    password: string;
    birthdate: string;
    isBlocked: boolean;
    jobTitles: string[];
    languages: string[];
    tokens: any[];
    skills: any[];
    currentCareerlevel: {
      enum: any[];
    };
    jopType: {
      enum: any[];
    };
    currentEducationalLevel: {
      enum: any[];
    };
    OTP: string;
    __v: number;
  }
  