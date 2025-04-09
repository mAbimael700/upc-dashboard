import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Aviso } from "../types"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, DotsVerticalIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from '@tanstack/react-router'
import useNotices from "../hooks/useAviso"
import { toast } from "@/hooks/use-toast"


interface AvisoCardProps {
    aviso: Aviso
}


export default function AvisoCard({ aviso }: AvisoCardProps) {
    const { name, description, creationDate, endDate, startDate, fijado } = aviso
    const { deleteNotice, fixNotice } = useNotices()
    const navigate = useNavigate()

    const handleGoToEdit = (aviso: Aviso) => {
        // Redirige a la ruta deseada
        if (aviso.id)
            navigate({ to: '/avisos/edit/$id', params: { id: aviso.id.toString() } })
    }

    const handleFixNotice = (aviso: Aviso) => {
        fixNotice(aviso).then(
            () => {
                toast({
                    title: 'Aviso fijado',
                    description: 'El aviso se mostrará en la pantalla principal de la universidad.'
                })
            }
        ).catch((err) => {
            toast({
                title: 'Ocurrió un error al eliminar el aviso',
                description: err.message,
                variant: 'destructive'
            })
        })
    }

    const handleDeleteNotice = (id: number) => {
        deleteNotice(id)
            .catch((err) => {
                toast({
                    title: 'Ocurrió un error al eliminar el aviso',
                    description: err.message,
                    variant: 'destructive'
                })
            })
            .then(() => {
                toast({
                    title: 'El aviso eliminado'
                })
            })
    }

    return (
        <Card className="rounded-sm  shadow-sm">
            <CardHeader className="p-4 relative">

                <CardTitle>{name}</CardTitle>
                <div className="absolute top-1 right-1 flex items-center gap-2">
                    {fijado && <Badge className="h-5">Fijado</Badge>}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} size={"icon"} >
                                <DotsVerticalIcon></DotsVerticalIcon>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mr-2">
                            <DropdownMenuItem onSelect={() => handleGoToEdit(aviso)}>Editar</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => handleFixNotice(aviso)}>Fijar</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive" onSelect={() => aviso.id && handleDeleteNotice(aviso.id)}>Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <CardDescription>{description}</CardDescription>




            </CardHeader>
            <CardFooter className="px-4 pb-4 text-xs flex gap-4 items-center justify-between">
                <div>
                    <div className="font-semibold">
                        Fecha de creación
                    </div>
                    {format(creationDate, 'PPP', { locale: es })}
                </div>

                <div >

                    <div className="font-semibold pb-0.5">
                        Vigencia
                    </div>
                    <div className="flex gap-2">
                        <CalendarIcon></CalendarIcon>
                        <div>
                            {format(startDate, 'PPP', { locale: es })}
                        </div>
                        -
                        <div>
                            {format(endDate, 'PPP', { locale: es })}
                        </div>
                    </div>
                </div>

            </CardFooter>
        </Card>

    )
}
