import { createColumnHelper } from "@tanstack/react-table";
import { Aviso } from "../types";
import AvisoCard from "./aviso-card";

const columnHelper = createColumnHelper<Aviso>()

export const avisoColumnDefinition = [
    columnHelper.accessor('name', {
        header: '',
        cell: ({ row }) => {
            const aviso = row.original

            return (
                <AvisoCard aviso={aviso} />
            )
        }
    })
]