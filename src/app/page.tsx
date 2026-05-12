
import HomeClient from "./HomeClient";

export default async function Home() {
  return (
    <main className='min-h-[80vh] flex flex-col items-center justify-center gap-6'>
        <HomeClient />
    </main>
  );
}
