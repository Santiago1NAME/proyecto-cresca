import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export type ColumnDef<T> = {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
};

type DataTableProps<T> = {
    data: T[];
    columns: ColumnDef<T>[];
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
};

export function DataTable<T extends { id: string | number }>({
    data,
    columns,
    page,
    totalPages,
    onPageChange,
    onLimitChange,
}: DataTableProps<T>) {
    const pagesToShow = 10;
    let startPage = Math.max(page - Math.floor(pagesToShow / 2), 1);
    let endPage = Math.min(startPage + pagesToShow - 1, totalPages);
    if (endPage === totalPages) startPage = Math.max(endPage - pagesToShow + 1, 1);
    const visiblePages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    );

    return (
        <div>
            <div className="flex justify-between mb-2">
                <Select onValueChange={(v) => onLimitChange(Number(v))}>
                    <SelectTrigger className="w-full max-w-20">
                        <SelectValue placeholder="10" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Cantidad</SelectLabel>
                            {[10, 15, 20, 25].map((n) => (
                                <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Field className="max-w-70">
                    <Input type="text" placeholder="Buscador" />
                </Field>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((col, i) => (
                            <TableHead key={i}>{col.header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            {columns.map((col, i) => (
                                <TableCell key={i}>
                                    {typeof col.accessor === "function"
                                        ? col.accessor(row)
                                        : String(row[col.accessor] ?? "")}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-end">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href=""
                                onClick={(e) => { e.preventDefault(); if (page > 1) onPageChange(page - 1); }}
                            />
                        </PaginationItem>
                        {visiblePages.map((p) => (
                            <PaginationItem key={p}>
                                <PaginationLink
                                    href=""
                                    isActive={p === page}
                                    onClick={(e) => { e.preventDefault(); onPageChange(p); }}
                                >{p}</PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href=""
                                onClick={(e) => { e.preventDefault(); if (page < totalPages) onPageChange(page + 1); }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}