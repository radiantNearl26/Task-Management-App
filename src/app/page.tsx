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
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

type Task = {
  id: string;
  title: string;
  status: string;
  label: string;
  priority: string;
};

const initialTasks: Task[] = [
  {
    id: "T-001",
    title:
      "You can't compress the program without bypassing the redundant neural bandwidth matrix",
    status: "in progress",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "T-002",
    title:
      "Try to calculate the EXE feed, maybe it will index the multi-byte pixel array",
    status: "in progress",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "T-003",
    title: "We need to bypass the neural TCP card!",
    status: "in progress",
    label: "bug",
    priority: "high",
  },
  {
    id: "T-004",
    title:
      "The SAS interface is down, bypass the open-source pixel so we can backup the PNG bandwidth",
    status: "in progress",
    label: "feature",
    priority: "medium",
  },
  {
    id: "T-005",
    title:
      "I'll parse the wireless SSL protocol, that should driver the API panel",
    status: "in progress",
    label: "feature",
    priority: "medium",
  },
  {
    id: "T-006",
    title: "Use the digital TLS panel, then you can transmit the haptic alarm!",
    status: "in progress",
    label: "bug",
    priority: "high",
  },
  {
    id: "T-007",
    title:
      "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall",
    status: "in progress",
    label: "feature",
    priority: "high",
  },
  {
    id: "T-008",
    title:
      "Generating the driver won't do anything, we need to quantify the 1080p LDL pixel!",
    status: "in progress",
    label: "feature",
    priority: "medium",
  },
  {
    id: "T-009",
    title: "We need to program the back-end THX pixel!",
    status: "in progress",
    label: "feature",
    priority: "low",
  },
  {
    id: "T-010",
    title:
      "Calculating the bus won't do anything, we need to navigate the cross-platform JSON interface!",
    status: "in progress",
    label: "documentation",
    priority: "high",
  },
  // Generated Tasks
  {
    id: "T-011",
    title:
      "Synthesizing the optical drive won't do anything, we need to transmit the bluetooth AGP interface!",
    status: "todo",
    label: "feature",
    priority: "high",
  },
  {
    id: "T-012",
    title:
      "The RAM port is down, override the 1080p bus so we can quantify the SDD firewall!",
    status: "backlog",
    label: "bug",
    priority: "medium",
  },
  {
    id: "T-013",
    title:
      "I'll navigate the multi-byte COM interface, that should feed the RSS array!",
    status: "done",
    label: "documentation",
    priority: "low",
  },
  {
    id: "T-014",
    title:
      "If we compress the monitor, we can get to the SSD hard drive through the auxiliary XSS port!",
    status: "canceled",
    label: "bug",
    priority: "high",
  },
  {
    id: "T-015",
    title: "Use the mobile VGA protocol, then you can hack the primary alarm!",
    status: "in progress",
    label: "feature",
    priority: "medium",
  },
  {
    id: "T-016",
    title: "We need to bypass the solid state HDD bus!",
    status: "todo",
    label: "feature",
    priority: "low",
  },
  {
    id: "T-017",
    title:
      "Connecting the system won't do anything, we need to input the mobile IP alarm!",
    status: "backlog",
    label: "bug",
    priority: "high",
  },
  {
    id: "T-018",
    title:
      "The XML interface is down, compress the 1080p pixel so we can parse the IB capacitor!",
    status: "done",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "T-019",
    title:
      "Try to back up the JSON interface, maybe it will input the mobile bandwith!",
    status: "in progress",
    label: "feature",
    priority: "low",
  },
  {
    id: "T-020",
    title:
      "I'll transmit the neural JBOD card, that should driver the HEX feed!",
    status: "canceled",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "T-021",
    title:
      "If we program the capacitor, we can get to the RAM pixel through the online SAS application!",
    status: "todo",
    label: "bug",
    priority: "high",
  },
  {
    id: "T-022",
    title: "We need to hack the multi-byte HDD bus!",
    status: "backlog",
    label: "feature",
    priority: "medium",
  },
  {
    id: "T-023",
    title:
      "Compiling the interface won't do anything, we need to compress the online SDD driver!",
    status: "done",
    label: "bug",
    priority: "low",
  },
  {
    id: "T-024",
    title:
      "The CSS card is down, navigate the open-source sensor so we can calculate the RAM panel!",
    status: "in progress",
    label: "documentation",
    priority: "high",
  },
  {
    id: "T-025",
    title:
      "I'll index the auxiliary IP feed, that should system the COM firewall!",
    status: "todo",
    label: "feature",
    priority: "medium",
  },
];

type SearchType = "title" | "status" | "priority";
type SortDirection = "asc" | "desc";
type SortConfig = {
  key: keyof Task;
  direction: SortDirection;
};

export default function TaskPage() {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchType, setSearchType] = React.useState<SearchType>("title");
  const [sortConfig, setSortConfig] = React.useState<SortConfig>({
    key: "id",
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

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
        if (
          document.activeElement === searchInputRef.current &&
          searchQuery.length > 0
        ) {
          setSearchQuery("");
        } else if (document.activeElement === searchInputRef.current) {
          searchInputRef.current?.blur();
        } else if (searchQuery.length > 0) {
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
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter((task) => {
        if (searchType === "title")
          return task.title.toLowerCase().includes(lowerQuery);
        if (searchType === "status")
          return task.status.toLowerCase().includes(lowerQuery);
        if (searchType === "priority")
          return task.priority.toLowerCase().includes(lowerQuery);
        return false;
      });
    }

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
  }, [tasks, searchQuery, searchType, sortConfig]);

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, searchType, sortConfig]);

  const toggleTaskStatus = (taskId: string, isChecked: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            status: isChecked ? "done" : "in progress",
          };
        }
        return task;
      }),
    );
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
      case "backlog":
        return <HelpCircle className="h-3 w-3 text-muted-foreground" />;
      case "todo":
        return <Circle className="h-3 w-3 text-muted-foreground" />;
      case "in progress":
        return <Timer className="h-3 w-3 text-muted-foreground" />;
      case "done":
        return <CheckCircle2 className="h-3 w-3 text-muted-foreground" />;
      case "canceled":
        return <Circle className="h-3 w-3 text-muted-foreground opacity-50" />;
      default:
        return <Circle className="h-3 w-3 text-muted-foreground" />;
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredTasks.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

  // Count selected (done) rows within the filtered set
  const selectedCount = filteredTasks.filter((t) => t.status === "done").length;

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div className="flex flex-col gap-8 p-8 max-w-[1400px] mx-auto w-full text-foreground">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              Task Management System
            </h1>
            {searchQuery ? (
              <p className="text-muted-foreground">
                {filteredTasks.length} results found for "{searchQuery}" in{" "}
                {searchType}
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
            <Avatar>
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
                placeholder={`Filter via ${searchType}...`}
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

            <Button
              variant={searchType === "status" ? "default" : "outline"}
              onClick={() =>
                setSearchType(searchType === "status" ? "title" : "status")
              }
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Status
            </Button>
            <Button
              variant={searchType === "priority" ? "default" : "outline"}
              onClick={() =>
                setSearchType(searchType === "priority" ? "title" : "priority")
              }
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Priority
            </Button>
            <Button
              variant="outline"
              className="px-2 lg:px-3"
              onClick={() => {
                setSearchQuery("");
                setSearchType("title");
              }}
            >
              Reset
              <Kbd className="ml-2">Esc</Kbd>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="ml-auto hidden lg:flex">
              <Settings2 className="mr-2 h-4 w-4" />
              View
            </Button>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>

        {/* Task List Table */}
        <div className="rounded-md border bg-card text-card-foreground shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[50px] pl-4">
                  <Checkbox />
                </TableHead>
                <TableHead
                  className="w-[100px] cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center">
                    Serial
                    {getSortIcon("id")}
                  </div>
                </TableHead>
                <TableHead
                  className="w-[100px] cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("label")}
                >
                  <div className="flex items-center">
                    Tags
                    {getSortIcon("label")}
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("title")}
                >
                  <div className="flex items-center">
                    Title
                    {getSortIcon("title")}
                  </div>
                </TableHead>
                <TableHead
                  className="w-[150px] cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    {getSortIcon("status")}
                  </div>
                </TableHead>
                <TableHead
                  className="w-[150px] cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("priority")}
                >
                  <div className="flex items-center">
                    Priority
                    {getSortIcon("priority")}
                  </div>
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTasks.map((task) => (
                <TableRow
                  key={task.id}
                  data-state={task.status === "done" ? "selected" : undefined}
                >
                  <TableCell className="pl-4">
                    <Checkbox
                      checked={task.status === "done"}
                      onCheckedChange={(checked) =>
                        toggleTaskStatus(task.id, checked as boolean)
                      }
                    />
                  </TableCell>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="uppercase text-[10px] font-normal text-muted-foreground"
                    >
                      {task.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium truncate block">
                      {task.title}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex w-[100px] items-center gap-2">
                      {getStatusIcon(task.status)}
                      <span className="capitalize text-muted-foreground">
                        {task.status}
                      </span>
                    </div>
                  </TableCell>
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
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Make a copy</DropdownMenuItem>
                        <DropdownMenuItem>Favorite</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

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
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
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
