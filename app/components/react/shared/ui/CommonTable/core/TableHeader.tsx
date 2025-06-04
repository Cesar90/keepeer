import { TableHeaderProps } from '../type';

const TableHeader = <T, K extends keyof T>({ columns }: TableHeaderProps<T, K>): JSX.Element => {
    const headers = columns.map((column, index) => {
        return (
            <th
                key={`headCell-${index}`}
            >
                {column.header}
            </th>
        );
    });

    return (
        <thead>
            <tr>{headers}</tr>
        </thead>
    );
};

export default TableHeader;
