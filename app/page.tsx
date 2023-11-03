import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { useEffect, useState } from 'react';

export default async function Index() {

  const [smoothies, setSmoothies] = useState<object|null>(null);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()

        if(error){
          setError('Could not fetch the data');
          setSmoothies(null);
          console.log(error);
          
        }
        if(smoothies){
          setSmoothies(data);
          setError(null);
        }
    }

    fetchSmoothies();
  }, [])

  const supabase = createClient(cookies());
  const { data: notes } = await supabase.from("notes").select();

  return (
    <div className='w-full'>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
    </div>
  )
}
