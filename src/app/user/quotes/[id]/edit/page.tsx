'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useActionState, useEffect, useState } from 'react';
import { FormError } from '@/components/FormError';
import { useRouter, useParams } from 'next/navigation';
import { editQuote, getQuote } from '@/app/actions/quoteActions';
import { NewQuoteSchema } from '@/lib/schemas';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Quote } from '@/types/quotes';

export type EditQuoteFormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
  data?: Partial<Quote>;
};

const initialState: EditQuoteFormState = { success: false };
type EditQuoteInput = z.infer<typeof NewQuoteSchema>;

export default function EditQuotePage() {
  const router = useRouter();
  const params = useParams();
  const quoteId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  
  const updateActionWithId = editQuote.bind(null, quoteId);
  const [state, formAction, isPending] = useActionState(updateActionWithId, initialState);

  const {
    register,
    setValue,
    formState: { errors: clientFormErrors, isValid: isFormValid },
  } = useForm<EditQuoteInput>({
    mode: 'onChange', 
    resolver: zodResolver(NewQuoteSchema), 
  });

  useEffect(() => {
    getQuote(quoteId).then((data) => {
      if (data) {
        setValue('author', data.author, { shouldValidate: true });
        setValue('quote', data.quote, { shouldValidate: true });
      } else {
        router.push('/user/quotes'); 
      }
      setIsLoading(false);
    });
  }, [quoteId, setValue, router]);

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        router.push('/user/quotes');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.success, router]);

  if (isLoading) {
    return <div className="py-20 text-center animate-pulse text-slate-500">Loading quote details...</div>;
  }

  if (state.success) {
    return (
      <div className="container max-w-2xl py-20 text-center space-y-4">
        <h1 className="text-3xl font-bold text-emerald-500 mb-4">Quote updated successfully!</h1>
        <div className="p-6 bg-slate-100 dark:bg-slate-800 rounded-lg italic">
          "{state.data?.quote}"
        </div>
        <p className="font-semibold">- {state.data?.author}</p>
        <p className="text-sm text-slate-500 mt-4 animate-pulse">Redirecting to quotes page...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="text-3xl font-bold mb-8">Edit Quote</h1>
      
      {state.message && (
        <div className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-900/30 dark:text-red-400 font-medium">
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-6">
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="author-input">Author</Label>
          <Input 
            id="author-input"
            aria-describedby='author-error'
            {...register('author')}
          />
          <FormError id="author-error" error={clientFormErrors?.author?.message || state.errors?.author} />
        </div>

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="quote-textarea">Quote</Label>
          <Textarea 
            id="quote-textarea"
            className="resize-none"
            rows={5}
            aria-describedby='quote-error'
            {...register('quote')}
          />
          <FormError id="quote-error" error={clientFormErrors?.quote?.message || state.errors?.quote} />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={!isFormValid || isPending}>
            {isPending ? 'Updating...' : 'Update Quote'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isPending}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}