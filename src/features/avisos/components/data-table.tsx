import { DataTable } from '@/components/datatable/data-table'
import { avisoColumnDefinition } from './column-definition'
import useNotices from '../hooks/useAviso'
import AsyncHandler from '@/components/async-handler';

export default function AvisoDataTable() {

    const { avisos, loading, error, } = useNotices();
    
    return (
        <AsyncHandler loading={loading} error={error}>
            {avisos ? (
                <DataTable columns={avisoColumnDefinition} data={avisos} />
            ) : (
                <p>No hay avisos fijos actualmente</p>
            )}
        </AsyncHandler>


    )
}
