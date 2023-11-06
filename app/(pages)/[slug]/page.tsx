"use client"
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"

const update = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const supabase = createClient();
  const [title, setTitle] = useState<string>('');
  const [method, setMethod] = useState<string>('');
  const [rating, setRating] = useState<number>();
  const [formError, setformError] = useState<string | null>(null);

  const handlesubmit = async (e: any) => {
    e.preventDefault();
    if (!title || !method || !rating) {
      setformError("Please fill all the fields correctly");
      return
    }

    const { data, error } = await supabase
      .from('smoothies')
      .update({ title, method, rating })
      .eq('id', params.slug)
      .select();

      if(error){
        setformError("Something went wrong in db")       
      }
      console.log(data)
      if(data){
        setformError(null);
        console.log("New Data: "+data)
        router.push('/');
      }
  }

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select()
        .eq('id', params.slug)
        .single()

      if (error) {
        router.push('/');
      }

      if (data) {
        setTitle(data.title!);
        setMethod(data.method!);
        setRating(data.rating!)
      }

    }

    fetchSmoothie();
  }, [params.slug, router])

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <form className='flex flex-col mt-20 p-10 bg-slate-200 rounded-xl' onSubmit={handlesubmit}>
        <h1 className='text-center font-extrabold text-2xl'>Smoothies Recipe</h1>
        <label className='font-bold mt-8'>Title</label>
        <input
          type="text"
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border-2 p-2 rounded mt-3'
        />
        <label className='font-bold mt-8'>Method</label>
        <input
          type="text"
          id='method'
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className='border-2 p-2 rounded mt-3'
        />
        <label className='font-bold mt-8'>Rating</label>
        <input
          type="number"
          id='rating'
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className='border-2 p-2 rounded mt-3'
        />
        <button type='submit' className='bg-green-200 p-3 mt-5 rounded-lg font-bold'>Update Smoothie Recipe</button>
        {/* {formError && (<p className='mt-3 text-red-500'>{formError}</p>)} */}
      </form>
    </div>
  )
}

export default update