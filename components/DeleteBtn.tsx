"use client"
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';


const DeleteBtn = (id:number) => {
    const supabase = createClient();
    const router = useRouter();
    const handleDelete = async (id: number) => {
        const { data, error } = await supabase
            .from('smoothies')
            .delete()
            .eq('id', id)
            .select();

        if (error) {
            console.log(error);
        }

        if (data) {
            router.refresh();
            console.log(data);
        }
    }
    return (
        <button onClick={()=>handleDelete(id)}>Delete</button>
    )
}

export default DeleteBtn