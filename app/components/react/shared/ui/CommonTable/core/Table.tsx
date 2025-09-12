import { TableProps } from '../type';
import TableHeader from './TableHeader';
import TableRows from './TableRows';

const Table = <T, K extends keyof T>({ data, columns }: TableProps<T, K>): JSX.Element => {
    return (
        <table>
            <TableHeader columns={columns} />
            <TableRows
                data={data}
                columns={columns}
            />
        </table>
    );
};

export default Table;
