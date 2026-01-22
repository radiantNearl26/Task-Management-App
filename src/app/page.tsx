"use client";

import * as React from "react";
import {
  MoreHorizontal,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  Circle,
  HelpCircle,
  Timer,
  PlusCircle,
  Settings2,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  OctagonAlert,
  CalendarClock,
} from "lucide-react";

import { SpinnerCustom } from "@/components/ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { toast } from "sonner";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { Skeleton } from "@/components/ui/skeleton";
import { getTasks, createTask, deleteTask, type Task } from "./actions";

type SortDirection = "asc" | "desc";
type SortConfig = {
  key: keyof Task;
  direction: SortDirection;
};

export default function TaskPage() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadingMessage, setLoadingMessage] = React.useState("");

  React.useEffect(() => {
    const messages = [
      "Running command 'rm -rf /*' on server...",
      "Downloading more RAM...",
      "Decrypting the matrix...",
      "Asking the server nicely...",
      "Compiling coffee into code...",
      "Deleting production database...",
      "Generating tasks from thin air...",
    ];
    setLoadingMessage(messages[Math.floor(Math.random() * messages.length)]);

    setIsLoading(true);
    getTasks().then((data) => {
      setTasks(data);
      setIsLoading(false);
    });
  }, []);
  const [searchQuery, setSearchQuery] = React.useState("");
  // const [searchType, setSearchType] = React.useState<SearchType>("title"); // functionality removed
  const [sortConfig, setSortConfig] = React.useState<SortConfig>({
    key: "id",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [taskToDelete, setTaskToDelete] = React.useState<string | null>(null);
  const [visibleColumns, setVisibleColumns] = React.useState<Set<string>>(
    new Set(["id", "label", "title", "status", "priority"]),
  );
  const [selectedTaskIds, setSelectedTaskIds] = React.useState<Set<string>>(
    new Set(),
  );
  const [statusFilters, setStatusFilters] = React.useState<Set<string>>(
    new Set(["in progress", "done"]),
  );
  const [priorityFilters, setPriorityFilters] = React.useState<Set<string>>(
    new Set(["low", "medium", "high"]),
  );

  const columns = [
    { id: "id", label: "Serial" },
    { id: "label", label: "Tags" },
    { id: "title", label: "Title" },
    { id: "status", label: "Status" },
    { id: "priority", label: "Priority" },
  ];

  // Keyboard Shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search on 'f'
      if (
        e.key.toLowerCase() === "f" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        document.activeElement !== searchInputRef.current
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }

      // Reset/Blur on 'Escape'
      if (e.key === "Escape") {
        if (document.activeElement === searchInputRef.current) {
          searchInputRef.current?.blur();
          setSearchQuery("");
        } else {
          setSearchQuery("");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchQuery]);

  // Derived State: Filters & Sorting
  const filteredTasks = React.useMemo(() => {
    let result = [...tasks];

    // Filter
    result = result.filter((task) => {
      const matchesTitle = searchQuery
        ? task.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesStatus = statusFilters.has(task.status);
      const matchesPriority = priorityFilters.has(task.priority);
      return matchesTitle && matchesStatus && matchesPriority;
    });

    // Sort
    const modifier = sortConfig.direction === "asc" ? 1 : -1;
    result.sort((a, b) => {
      let valueA: any = a[sortConfig.key];
      let valueB: any = b[sortConfig.key];

      // Custom Priority Sort
      if (sortConfig.key === "priority") {
        const priorityMap: Record<string, number> = {
          high: 3,
          medium: 2,
          low: 1,
        };
        valueA = priorityMap[a.priority] || 0;
        valueB = priorityMap[b.priority] || 0;
      }

      if (valueA < valueB) return -1 * modifier;
      if (valueA > valueB) return 1 * modifier;
      return 0;
    });

    return result;
  }, [tasks, searchQuery, sortConfig, statusFilters, priorityFilters]);

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortConfig, statusFilters, priorityFilters]);

  const toggleTaskSelection = (taskId: string, isChecked: boolean) => {
    setSelectedTaskIds((prev) => {
      const next = new Set(prev);
      if (isChecked) next.add(taskId);
      else next.delete(taskId);
      return next;
    });
  };

  const handleSort = (key: keyof Task) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIcon = (key: keyof Task) => {
    if (sortConfig.key !== key)
      return (
        <ArrowUpDown className="ml-2 h-3 w-3 text-muted-foreground opacity-50" />
      );
    if (sortConfig.direction === "asc")
      return <ArrowUp className="ml-2 h-3 w-3 text-foreground" />;
    return <ArrowDown className="ml-2 h-3 w-3 text-foreground" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "in progress":
        return <Timer className="h-3 w-3 text-muted-foreground" />;
      case "done":
        return <CheckCircle2 className="h-3 w-3 text-muted-foreground" />;
      default:
        return <Circle className="h-3 w-3 text-muted-foreground" />;
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredTasks.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

  const selectedCount = filteredTasks.filter((t) =>
    selectedTaskIds.has(t.id),
  ).length;

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div className="flex flex-col gap-8 p-8 max-w-[1400px] mx-auto w-full text-foreground">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold tracking-tight">
              Task Management System
            </h1>
            {isLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <SpinnerCustom />
                <p>{loadingMessage}</p>
              </div>
            ) : searchQuery ? (
              <p className="text-muted-foreground">
                {filteredTasks.length} results found for &quot;
                {searchQuery}&quot;
              </p>
            ) : (
              <p className="text-muted-foreground">
                {tasks.filter((t) => t.status !== "done").length} tasks pending.{" "}
                {tasks.filter((t) => t.status === "done").length} tasks
                completed.
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/avatar.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            <InputGroup className="w-[250px] lg:w-[350px] group">
              <InputGroupInput
                ref={searchInputRef}
                placeholder="Search tasks"
                className="pl-9 pr-10 hover:border-primary transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <InputGroupAddon className="pointer-events-none group-hover:text-foreground transition-colors">
                <Search className="h-4 w-4" />
              </InputGroupAddon>
              <InputGroupAddon
                align="inline-end"
                className="pointer-events-none"
              >
                <Kbd>F</Kbd>
              </InputGroupAddon>
            </InputGroup>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="lg"
                  variant={statusFilters.size < 2 ? "default" : "outline"}
                >
                  <CalendarClock className="" />
                  Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[150px]">
                <DropdownMenuLabel>Filter Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["In Progress", "Done"].map((status) => (
                  <DropdownMenuCheckboxItem
                    key={status}
                    checked={statusFilters.has(status.toLowerCase())}
                    onCheckedChange={(checked) => {
                      setStatusFilters((prev) => {
                        const next = new Set(prev);
                        if (checked) next.add(status.toLowerCase());
                        else next.delete(status.toLowerCase());
                        return next;
                      });
                    }}
                  >
                    {status}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="lg"
                  variant={priorityFilters.size < 3 ? "default" : "outline"}
                >
                  <OctagonAlert className="" />
                  Priority
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[150px]">
                <DropdownMenuLabel>Filter Priority</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {["Low", "Medium", "High"].map((priority) => (
                  <DropdownMenuCheckboxItem
                    key={priority}
                    checked={priorityFilters.has(priority.toLowerCase())}
                    onCheckedChange={(checked) => {
                      setPriorityFilters((prev) => {
                        const next = new Set(prev);
                        if (checked) next.add(priority.toLowerCase());
                        else next.delete(priority.toLowerCase());
                        return next;
                      });
                    }}
                  >
                    {priority}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="" size="lg">
                  <Settings2 className="" />
                  View
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[150px]">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {columns.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={visibleColumns.has(column.id)}
                    onCheckedChange={(checked) => {
                      setVisibleColumns((prev) => {
                        const next = new Set(prev);
                        if (checked) next.add(column.id);
                        else next.delete(column.id);
                        return next;
                      });
                    }}
                  >
                    {column.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={() => {
                const title = window.prompt("Enter task title");
                if (title) {
                  const formData = new FormData();
                  formData.append("title", title);
                  formData.append("status", "todo");
                  formData.append("priority", "medium");
                  formData.append("label", "feature");

                  toast.promise(
                    async () => {
                      // @ts-ignore - response type mismatch fix
                      const result = await createTask(formData);
                      if (result && !result.success) {
                        throw new Error(result.message);
                      }
                      setTasks(await getTasks());
                    },
                    {
                      loading: "Creating...",
                      success: "Task created",
                      error: (err) => err.message,
                    },
                  );
                }
              }}
            >
              <PlusCircle className="" />
              Add Task
            </Button>
          </div>
        </div>

        {/* Task List Table */}
        <div className="rounded-md border bg-card text-card-foreground shadow-sm">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[50px] pl-4">
                  <Checkbox />
                </TableHead>
                {visibleColumns.has("id") && (
                  <TableHead
                    className="w-[100px] cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center">
                      Serial
                      {getSortIcon("id")}
                    </div>
                  </TableHead>
                )}
                {visibleColumns.has("label") && (
                  <TableHead
                    className="w-[150px] cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => handleSort("label")}
                  >
                    <div className="flex items-center">
                      Tags
                      {getSortIcon("label")}
                    </div>
                  </TableHead>
                )}
                {visibleColumns.has("title") && (
                  <TableHead
                    className="cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => handleSort("title")}
                  >
                    <div className="flex items-center">
                      Title
                      {getSortIcon("title")}
                    </div>
                  </TableHead>
                )}
                {visibleColumns.has("status") && (
                  <TableHead
                    className="w-[150px] cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center">
                      Status
                      {getSortIcon("status")}
                    </div>
                  </TableHead>
                )}
                {visibleColumns.has("priority") && (
                  <TableHead
                    className="w-[150px] cursor-pointer hover:text-foreground transition-colors"
                    onClick={() => handleSort("priority")}
                  >
                    <div className="flex items-center">
                      Priority
                      {getSortIcon("priority")}
                    </div>
                  </TableHead>
                )}
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: 10 }).map((_, index) => (
                    <TableRow key={index} className="hover:bg-transparent h-12">
                      <TableCell className="pl-4">
                        <Skeleton className="h-4 w-4 rounded" />
                      </TableCell>
                      {visibleColumns.has("id") && (
                        <TableCell>
                          <Skeleton className="h-4 w-[70px]" />
                        </TableCell>
                      )}
                      {visibleColumns.has("label") && (
                        <TableCell>
                          <Skeleton className="h-4 w-[120px] rounded-full" />
                        </TableCell>
                      )}
                      {visibleColumns.has("title") && (
                        <TableCell>
                          <Skeleton className="h-4 w-[600px]" />
                        </TableCell>
                      )}
                      {visibleColumns.has("status") && (
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-[120px]" />
                          </div>
                        </TableCell>
                      )}
                      {visibleColumns.has("priority") && (
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-[120px]" />
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                : paginatedTasks.map((task) => (
                    <ContextMenu key={task.id}>
                      <ContextMenuTrigger asChild>
                        <TableRow
                          data-state={
                            selectedTaskIds.has(task.id)
                              ? "selected"
                              : undefined
                          }
                          className={
                            task.status === "done"
                              ? "opacity-50 bg-muted/40"
                              : ""
                          }
                        >
                          <TableCell className="pl-4">
                            <Checkbox
                              checked={selectedTaskIds.has(task.id)}
                              onCheckedChange={(checked) =>
                                toggleTaskSelection(task.id, checked as boolean)
                              }
                            />
                          </TableCell>
                          {visibleColumns.has("id") && (
                            <TableCell className="font-medium">
                              {task.id}
                            </TableCell>
                          )}
                          {visibleColumns.has("label") && (
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="uppercase text-[10px] font-normal text-muted-foreground"
                              >
                                {task.label}
                              </Badge>
                            </TableCell>
                          )}
                          {visibleColumns.has("title") && (
                            <TableCell>
                              <span className="font-medium truncate block">
                                {task.title}
                              </span>
                            </TableCell>
                          )}
                          {visibleColumns.has("status") && (
                            <TableCell>
                              <div className="flex w-[100px] items-center gap-2">
                                {getStatusIcon(task.status)}
                                <span className="capitalize text-muted-foreground">
                                  {task.status}
                                </span>
                              </div>
                            </TableCell>
                          )}
                          {visibleColumns.has("priority") && (
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {task.priority === "high" && (
                                  <ArrowUpDown className="h-3 w-3 text-muted-foreground rotate-180" />
                                )}
                                {task.priority === "medium" && (
                                  <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
                                )}
                                {task.priority === "low" && (
                                  <ArrowUpDown className="h-3 w-3 text-muted-foreground rotate-180 opacity-50" />
                                )}
                                <span className="capitalize text-muted-foreground">
                                  {task.priority}
                                </span>
                              </div>
                            </TableCell>
                          )}
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="w-[160px]"
                              >
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Make a copy</DropdownMenuItem>
                                <DropdownMenuItem>Favorite</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setTaskToDelete(task.id);
                                    setDeleteDialogOpen(true);
                                  }}
                                >
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="w-[160px]">
                        <ContextMenuItem>Edit</ContextMenuItem>
                        <ContextMenuItem>Make a copy</ContextMenuItem>
                        <ContextMenuItem>Favorite</ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem
                          onClick={() => {
                            setTaskToDelete(task.id);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          Delete
                        </ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  ))}
            </TableBody>
          </Table>
        </div>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will only move your task from the records to the trash bin.
                Clear the trash if you wish to delete it permanently.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setTaskToDelete(null);
                  setDeleteDialogOpen(false);
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (taskToDelete) {
                    toast.promise(
                      async () => {
                        await deleteTask(taskToDelete);
                        setTasks(await getTasks());
                      },
                      {
                        loading: "Deleting...",
                        success: `Task '${taskToDelete}' has been deleted`,
                        error: "Failed to delete task",
                      },
                    );
                  }
                  setDeleteDialogOpen(false);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Pagination */}
        <div className="flex items-center justify-between px-2">
          <div className="flex-1 text-muted-foreground">
            {selectedCount} of {filteredTasks.length} row(s) selected.
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="font-medium">Rows per page</p>
              <Select
                value={`${pageSize}`}
                onValueChange={(value: string) => {
                  setPageSize(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent side="top" position="popper" align="start">
                  {[10, 25, 50, 100].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center font-medium">
              Page {currentPage} of {totalPages || 1}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentPage((curr) => Math.max(1, curr - 1))}
                disabled={currentPage === 1}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() =>
                  setCurrentPage((curr) => Math.min(totalPages, curr + 1))
                }
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
