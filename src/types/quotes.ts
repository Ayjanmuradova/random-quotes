 export interface Quote {
    quote: string;
    author: string;
    likedBy: number;
    _id?: string;
    userId?: string;
  }

  export interface NewQuoteInput {
    quote: string;
    author: string;
  }