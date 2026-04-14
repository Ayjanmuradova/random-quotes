 export interface Quote {
    quote: string;
    author: string;
    likedBy: string[];
    _id?: string;
    userId?: string;
    createdAt?: string;
    updatedAt?: string;
  }

  export interface NewQuoteInput {
    quote: string;
    author: string;
  }