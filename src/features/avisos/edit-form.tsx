import React from 'react'
import AvisoForm from './components/form'
import { avisoFormSchema } from './form-schema'
import { z } from 'zod'
import { useNavigate, useParams } from '@tanstack/react-router'
import useNotices from './hooks/useAviso'
import AsyncHandler from '@/components/async-handler'
import { toast } from '@/hooks/use-toast'
import { Separator } from '@/components/ui/separator'


export default function AvisoEditForm() {

    const { selectedAviso, fetchById, loading, createNotice } = useNotices()
    const navigate = useNavigate()
    const params = useParams({
        from: '/_authenticated/avisos/edit/$id'  // Debe coincidir exactamente con el path de la ruta
    })

    const { id } = params;  // Ahora sí puedes desestructurar id

    // Como los parámetros de URL son strings, necesitarás parsearlos
    function onSubmit(values: z.infer<typeof avisoFormSchema>): void {
        createNotice(values)
            .then(() => {
                toast({
                    title: 'El aviso ha sido actualizado',
                    description: 'Ahora el aviso tendrá los datos correspondientes.'
                })
                navigate({ to: '/' })
            }).catch((err) => {
                toast({
                    title: 'Ocurrió un error en el servidor:',
                    description: err.message,
                    variant: 'destructive'
                })
            }
            )
    }


    React.useEffect
        (() => {
            fetchById(parseInt(id))
        }, [id])


    return (
        <div className='p-4 pt-10 space-y-4'>

            <div>
                <div className='text-xl font-bold'>Editar el aviso</div>
                <div className='text-sm text-muted-foreground'>Cambia la información del aviso seleccionado</div>
            </div>

            <Separator />
            <div className='w-3/4'>

                <AsyncHandler loading={loading}>
                    {
                        selectedAviso &&
                        <AvisoForm onSubmit={onSubmit} defaultValues={selectedAviso} />
                    }
                </AsyncHandler>
            </div>
        </div>
    )
}
