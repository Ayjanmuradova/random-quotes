'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useActionState } from 'react';
import { addQuote, type NewQuoteFormState } from '@/app/actions/quoteActions';
import { NewQuoteSchema } from '@/lib/schemas';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const initialState: NewQuoteFormState = {
  success: false,
};

type NewQuoteInput = z.infer<typeof NewQuoteSchema>;

export default function NewQuotePage() {
  
  const [state, formAction, isPending] = useActionState(addQuote, initialState);

  const {
    register,
    formState: { errors: clientFormErrors, isValid: isFormValid },
  } = useForm<NewQuoteInput>({
    mode: 'onChange', 
    resolver: zodResolver(NewQuoteSchema), 
  });

  if (state.success) {
    return (
      <div className="container max-w-2xl py-20 text-center">
        <h1 className="text-3xl font-bold text-emerald-500 mb-4">Quote added successfully!</h1>
        <Button asChild>
           <Link href="/">Go to Home Page</Link>
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
            placeholder="Evil Rabbit"
            defaultValue={state.data?.author}
            aria-describedby='author-error'
            {...register('author')}
          />
        
          {(clientFormErrors?.author || state.errors?.author) && (
            <p id="author-error" className="text-sm text-red-500 font-medium">
              {clientFormErrors?.author?.message || state.errors?.author?.join('; ')}
            </p>
          )}
        </div>

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="quote-textarea">Quote</Label>
          <Textarea 
            id="quote-textarea"
            placeholder="Enter the quote here..."
            className="resize-none"
            defaultValue={state.data?.quote}
            rows={5}
            aria-describedby='quote-error'
            {...register('quote')}
          />
         
          {(clientFormErrors?.quote || state.errors?.quote) && (
            <p id="quote-error" className="text-sm text-red-500 font-medium">
              {clientFormErrors?.quote?.message || state.errors?.quote?.join('; ')}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={!isFormValid || isPending}>
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