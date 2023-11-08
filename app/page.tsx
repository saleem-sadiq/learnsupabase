import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DeleteSmoothie from '@/components/DeleteSmoothie';
import { cookies } from 'next/headers';

export default async function Index() {
  const supabase = createClient(cookies());
  const { data } = await supabase.from("smoothies").select();

  return (
    <div className='w-full'>
      <div className="w-full flex items-center justify-center max-h-52 mt-10 gap-16">
        {data?.map((data) => (
          <div className='w-fit h-full flex flex-col justify-start py-10 px-20 bg-green-300 leading-loose'>
            <h2 className='my-5 font-bold text-2xl'>{data.title}</h2>
            <p>{data.method}</p>
            <p>Rating: {data.rating}</p>
            <Link href={"/" + data.id}>Update</Link>
            <DeleteSmoothie id={data.id} />
          </div>
        ))}
      </div>
    </div>
  )
}
