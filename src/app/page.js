'use client';
import { useState } from 'react';
import {quotes as initialQuotes} from '@/quotes';
import QuoteCard from '@/components/QuoteCard'; 

const quotesWithLikes = initialQuotes.map(quote => ({
  ...quote,
  likeCount: 0 
}));

function getRandomIndex(currentIndex, arraysLength){
  const random = () => Math.floor(Math.random() * arraysLength);
  const result = random();
  if (result === currentIndex) {
    return getRandomIndex(currentIndex, arraysLength);
  } else {
    return result;
  }
}

export default function Home() {
  const[quotes, setQuotes]=useState(quotesWithLikes);
  const[currentIndex, setCurrentIndex]=useState(0);

function handleLikeClick(){
  console.log('like button is clicked');
  const updatedQuotes = quotes.map((quote, index) => {
    if(index === currentIndex){
      return {
        ...quote,
        likeCount: quote.likeCount + 1
      };
    }
    return quote;
  });
  setQuotes(updatedQuotes);
}

function handleNextClick(){
  console.log('next Quote is clicked');
  const nextIndex = getRandomIndex(currentIndex, quotes.length);
  setCurrentIndex(nextIndex);
}

  return <main className='min-h-dvh flex items-center bg-slate-900 p-4'>
    <QuoteCard 
      quote={quotes[currentIndex]} 
      onLike={handleLikeClick} 
      onNext={handleNextClick} 
    />  
  </main>;
}
