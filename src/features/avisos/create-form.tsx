 import React from 'react';
import { z } from 'zod';
import { useNavigate } from '@tanstack/react-router';
import { toast } from '@/hooks/use-toast';
import AvisoForm from './components/form';
import { avisoFormSchema } from './form-schema';
import useNotices from './hooks/useAviso';


export default function AvisoCreateForm() {

    const { createNotice, error } = useNotices()
    const navigate = useNavigate()

    async function onSubmit(
      values: z.infer<typeof avisoFormSchema>
    ): Promise<void> {
      try {
        await createNotice(values)
        toast({
          title: 'Aviso creado satisfactoriamente',
        })
        navigate({ to: '/' })
      } catch {
        toast({
          title: 'Ocurrió un error al crear el aviso',
          variant: 'destructive',
        })
      }
    }


    React.useEffect(() => {
        if (error)
            toast({
                title: error.name,
                variant: "destructive"
            })
    }, [error])

    return (

        <div className='p-4 pt-10 space-y-4'>

            <div className='text-xl font-bold'>
                Publicar un nuevo aviso
            </div>

            <div className='w-3/4'>
                <AvisoForm onSubmit={onSubmit} ></AvisoForm>
            </div>
        </div>
    )
}
