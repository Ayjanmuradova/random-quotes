'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useActionState } from 'react';
import { addQuote, type NewQuoteFormState } from '@/app/actions/quoteActions';
import  Link from 'next/link';

const initialState: NewQuoteFormState = {
  success: false,
};

export default function NewQuotePage() {
  const [state, formAction, isPending] = useActionState(addQuote, initialState);

  
  if (state.success) {
    return (
      <div className="container max-w-2xl py-20 text-center">
        <h1 className="text-3xl font-bold text-black-500 mb-4">Quote added successfully! 🎉</h1>
        
        <Button className="mt-6" asChild>
           <Link href="/user/quotes">Go to Quotes</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold mb-8">Create New Quote</h1>
      
      <form action={formAction} className="space-y-6">
        
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="author-input">Author</Label>
          <Input 
            id="author-input"
            name="author" 
            required
            placeholder="Evil Rabbit"
            defaultValue={state.data?.author}
            maxLength={50}
            aria-describedby='author-error'
          />
          
          {state.errors?.author && (
            <p id="author-error" className="text-sm text-red-500">{state.errors.author.join(', ')}</p>
          )}
        </div>

        
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="quote-textarea">Quote</Label>
          <Textarea 
            id="quote-textarea"
            name="quote" 
            placeholder="Enter the quote here..."
            className="resize-none"
            defaultValue={state.data?.quote}
            maxLength={300}
            required
          />
          {state.errors?.quote && (
            <p className="text-sm text-red-500">{state.errors.quote.join(', ')}</p>
          )}
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save Quote'}
          </Button>
          <Button type="reset" variant="outline" disabled={isPending}>
            Clear
          </Button>
        </div>

      </form>
    </div>
  );
}