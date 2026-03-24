
import HomeClient from "./HomeClient";

export default async function Home() {
  return (
    <main className='min-h-[80vh] flex flex-col items-center justify-center gap-6'>
      <div className="action-card w-full max-w-2xl">
        <HomeClient />
      </div> 
    </main>
  );
}
