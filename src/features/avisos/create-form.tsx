import React from 'react'
import AvisoForm from './components/form'
import { z } from 'zod'
import { avisoFormSchema } from './form-schema'
import useNotices from './hooks/useAviso'
import { toast } from '@/hooks/use-toast'
import { useNavigate } from '@tanstack/react-router'

export default function AvisoCreateForm() {

    const { createNotice, error } = useNotices()
    const navigate = useNavigate()

    function onSubmit(values: z.infer<typeof avisoFormSchema>): void {
        createNotice(values).then(() => {
            toast({
                title: 'Aviso creado satisfactoriamente'
            })
            navigate({ to: '/' })
        }).catch((err) => {
            toast({
                title: 'Ocurrió un error al crear el aviso',
                description: err.message,
                variant: 'destructive'
            })
        })
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
