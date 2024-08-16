import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

interface UserDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function UserDataTable<TData, TValue>({
  columns,
  data,
}: UserDataTableProps<TData, TValue>) {
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data,
    columns,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex items-center py-4">
        <div className="w-full">
          <Input
            placeholder="Filter title..."
            value={
              (table.getColumn("username")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("username")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="flex gap-2">{/* <TodoAddDialog /> */}</div>
      </div>
      <div className="rounded-sm border border-zinc-600">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel()?.rows?.length ? (
              table?.getRowModel()?.rows?.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="text-zinc-200">No Data</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <span className={cn(navigationMenuTriggerStyle())}>
          Page {pagination.pageIndex + 1} of {pagination.pageSize}
        </span>
        <Button
          className="bg-zinc-950 border rounded-sm border-zinc-600"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <RiArrowLeftSLine className="text-lg" />
        </Button>
        <Button
          className="bg-zinc-950 border rounded-sm border-zinc-600"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <RiArrowRightSLine className="text-lg" />
        </Button>
      </div>
    </div>
  );
}
