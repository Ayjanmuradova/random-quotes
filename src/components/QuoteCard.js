import { Subtitle } from "./Subtitle";  
import { Body2 } from "./Body2";  
import { Button } from "./Button";

export default function QuoteCard ({ quote, onLike, onNext }) {
  return (
    <div className='w-md mx-auto bg-slate-700 p-10 rounded-md flex flex-col gap-4 text-white'>
      <Subtitle title={quote.quote} />
      <Body2>--{quote.author}</Body2>
      <div className="text-sm font-bold text-emerald-400 mt-2">
        Likes: {quote.likeCount}
      </div>
      <div className="flex gap-4">
        <Button onClick={onLike}>Like </Button>
        <Button onClick={onNext}>Next Quote</Button>
      </div>
    </div>
  );
}