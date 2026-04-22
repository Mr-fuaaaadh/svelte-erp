import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
  Download,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface RowAction<T> {
  label: string;
  icon?: React.ElementType;
  onClick: (row: T) => void;
  destructive?: boolean;
}

interface DataTableProps<T extends { id: string }> {
  data: T[];
  columns: Column<T>[];
  rowActions?: RowAction<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
  loading?: boolean;
  onExport?: () => void;
  className?: string;
  emptyMessage?: string;
}

type SortDir = "asc" | "desc" | null;

export default function DataTable<T extends { id: string }>({
  data,
  columns,
  rowActions,
  searchable = true,
  searchPlaceholder = "Search…",
  pageSize = 10,
  loading = false,
  onExport,
  className,
  emptyMessage = "No records found",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    if (!search) return data;
    const q = search.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.key as keyof T];
        return String(val ?? "")
          .toLowerCase()
          .includes(q);
      }),
    );
  }, [data, search, columns]);

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey as keyof T];
      const bv = b[sortKey as keyof T];
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av ?? "").localeCompare(String(bv ?? ""));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const pageData = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? null : "asc"));
      if (sortDir === "desc") setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const toggleAll = () => {
    if (selected.size === pageData.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(pageData.map((r) => r.id)));
    }
  };

  const toggleRow = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        {searchable && (
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              data-ocid="datatable.search_input"
              className="pl-9 h-8 text-sm"
            />
          </div>
        )}
        <div className="flex items-center gap-2 ml-auto">
          {selected.size > 0 && (
            <span className="text-xs text-muted-foreground">
              {selected.size} selected
            </span>
          )}
          {onExport && (
            <Button
              variant="outline"
              size="sm"
              onClick={onExport}
              data-ocid="datatable.export_button"
              className="h-8 text-xs gap-1.5"
            >
              <Download className="w-3 h-3" /> Export
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30">
              {rowActions && (
                <TableHead className="w-10 pr-0">
                  <Checkbox
                    checked={
                      pageData.length > 0 && selected.size === pageData.length
                    }
                    onCheckedChange={toggleAll}
                    data-ocid="datatable.select_all"
                    aria-label="Select all"
                  />
                </TableHead>
              )}
              {columns.map((col) => (
                <TableHead
                  key={String(col.key)}
                  className={cn("text-xs font-semibold", col.className)}
                >
                  {col.sortable !== false ? (
                    <button
                      type="button"
                      onClick={() => handleSort(String(col.key))}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      {col.header}
                      {sortKey === String(col.key) ? (
                        sortDir === "asc" ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )
                      ) : (
                        <ChevronsUpDown className="w-3 h-3 opacity-40" />
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </TableHead>
              ))}
              {rowActions && <TableHead className="w-12" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: pageSize }, (_, i) => i).map((i) => (
                <TableRow
                  key={`skeleton-${i}`}
                  data-ocid={`datatable.loading_state.${i + 1}`}
                >
                  {columns.map((col) => (
                    <TableCell key={String(col.key)}>
                      <Skeleton className="h-4 w-full rounded" />
                    </TableCell>
                  ))}
                  {rowActions && <TableCell />}
                </TableRow>
              ))
            ) : pageData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + (rowActions ? 2 : 0)}
                  className="text-center text-sm text-muted-foreground py-10"
                  data-ocid="datatable.empty_state"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              pageData.map((row, i) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "hover:bg-muted/30 transition-colors",
                    selected.has(row.id) && "bg-accent/5",
                  )}
                  data-ocid={`datatable.row.${i + 1}`}
                >
                  {rowActions && (
                    <TableCell className="pr-0">
                      <Checkbox
                        checked={selected.has(row.id)}
                        onCheckedChange={() => toggleRow(row.id)}
                        data-ocid={`datatable.checkbox.${i + 1}`}
                        aria-label={`Select row ${i + 1}`}
                      />
                    </TableCell>
                  )}
                  {columns.map((col) => {
                    const val = row[col.key as keyof T];
                    return (
                      <TableCell
                        key={String(col.key)}
                        className={cn("text-sm", col.className)}
                      >
                        {col.render ? col.render(val, row) : String(val ?? "—")}
                      </TableCell>
                    );
                  })}
                  {rowActions && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            data-ocid={`datatable.row_actions.${i + 1}`}
                            aria-label="Row actions"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-36">
                          {rowActions.map((action) => {
                            const ActionIcon = action.icon;
                            return (
                              <DropdownMenuItem
                                key={action.label}
                                onClick={() => action.onClick(row)}
                                className={cn(
                                  "text-xs cursor-pointer gap-2",
                                  action.destructive &&
                                    "text-destructive focus:text-destructive",
                                )}
                              >
                                {ActionIcon && (
                                  <ActionIcon className="w-3 h-3" />
                                )}
                                {action.label}
                              </DropdownMenuItem>
                            );
                          })}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {!loading && sorted.length > pageSize && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing {(page - 1) * pageSize + 1}–
            {Math.min(page * pageSize, sorted.length)} of {sorted.length}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              data-ocid="datatable.pagination_prev"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-3 h-3" />
            </Button>
            <span className="px-2">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              data-ocid="datatable.pagination_next"
              aria-label="Next page"
            >
              <ChevronRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
