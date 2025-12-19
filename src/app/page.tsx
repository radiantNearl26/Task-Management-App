"use client";

import * as React from "react";
import {
  MoreHorizontal,
  Search,
  ArrowUpDown,
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
import { Input } from "@/components/ui/input";
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

type Task = {
  id: string;
  title: string;
  status: string;
  label: string;
  priority: string;
};

const initialTasks: Task[] = [
  {
    id: "TASK-8782",
    title:
      "You can't compress the program without bypassing the redundant neural bandwidth matrix",
    status: "in progress",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-7878",
    title:
      "Try to calculate the EXE feed, maybe it will index the multi-byte pixel array",
    status: "in progress",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-7839",
    title: "We need to bypass the neural TCP card!",
    status: "in progress",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-5562",
    title:
      "The SAS interface is down, bypass the open-source pixel so we can backup the PNG bandwidth",
    status: "in progress",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-8686",
    title:
      "I'll parse the wireless SSL protocol, that should driver the API panel",
    status: "in progress",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-1280",
    title: "Use the digital TLS panel, then you can transmit the haptic alarm!",
    status: "in progress",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-7262",
    title:
      "The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall",
    status: "in progress",
    label: "feature",
    priority: "high",
  },
  {
    id: "TASK-1138",
    title:
      "Generating the driver won't do anything, we need to quantify the 1080p LDL pixel!",
    status: "in progress",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-7184",
    title: "We need to program the back-end THX pixel!",
    status: "in progress",
    label: "feature",
    priority: "low",
  },
  {
    id: "TASK-5160",
    title:
      "Calculating the bus won't do anything, we need to navigate the cross-platform JSON interface!",
    status: "in progress",
    label: "documentation",
    priority: "high",
  },
  // Generated Tasks
  {
    id: "TASK-9102",
    title:
      "Synthesizing the optical drive won't do anything, we need to transmit the bluetooth AGP interface!",
    status: "todo",
    label: "feature",
    priority: "high",
  },
  {
    id: "TASK-3421",
    title:
      "The RAM port is down, override the 1080p bus so we can quantify the SDD firewall!",
    status: "backlog",
    label: "bug",
    priority: "medium",
  },
  {
    id: "TASK-6754",
    title:
      "I'll navigate the multi-byte COM interface, that should feed the RSS array!",
    status: "done",
    label: "documentation",
    priority: "low",
  },
  {
    id: "TASK-8901",
    title:
      "If we compress the monitor, we can get to the SSD hard drive through the auxiliary XSS port!",
    status: "canceled",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-2345",
    title: "Use the mobile VGA protocol, then you can hack the primary alarm!",
    status: "in progress",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-6789",
    title: "We need to bypass the solid state HDD bus!",
    status: "todo",
    label: "feature",
    priority: "low",
  },
  {
    id: "TASK-1234",
    title:
      "Connecting the system won't do anything, we need to input the mobile IP alarm!",
    status: "backlog",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-9876",
    title:
      "The XML interface is down, compress the 1080p pixel so we can parse the IB capacitor!",
    status: "done",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-4567",
    title:
      "Try to back up the JSON interface, maybe it will input the mobile bandwith!",
    status: "in progress",
    label: "feature",
    priority: "low",
  },
  {
    id: "TASK-8765",
    title:
      "I'll transmit the neural JBOD card, that should driver the HEX feed!",
    status: "canceled",
    label: "documentation",
    priority: "medium",
  },
  {
    id: "TASK-3210",
    title:
      "If we program the capacitor, we can get to the RAM pixel through the online SAS application!",
    status: "todo",
    label: "bug",
    priority: "high",
  },
  {
    id: "TASK-6543",
    title: "We need to hack the multi-byte HDD bus!",
    status: "backlog",
    label: "feature",
    priority: "medium",
  },
  {
    id: "TASK-5432",
    title:
      "Compiling the interface won't do anything, we need to compress the online SDD driver!",
    status: "done",
    label: "bug",
    priority: "low",
  },
  {
    id: "TASK-7654",
    title:
      "The CSS card is down, navigate the open-source sensor so we can calculate the RAM panel!",
    status: "in progress",
    label: "documentation",
    priority: "high",
  },
  {
    id: "TASK-2109",
    title:
      "I'll index the auxiliary IP feed, that should system the COM firewall!",
    status: "todo",
    label: "feature",
    priority: "medium",
  },
];

export default function TaskPage() {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredTasks, setFilteredTasks] =
    React.useState<Task[]>(initialTasks);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  // Filter tasks based on searchQuery
  React.useEffect(() => {
    let result = tasks;
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = tasks.filter((task) =>
        task.title.toLowerCase().includes(lowerQuery),
      );
    }
    setFilteredTasks(result);
    setCurrentPage(1); // Reset to first page on search
  }, [searchQuery, tasks]);

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
      <div className="flex flex-col gap-8 p-8 max-w-[1400px] mx-auto w-full text-foreground text-[15px]">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-[15px]">
              Task Management System
            </h1>
            {searchQuery ? (
              <p className="text-muted-foreground text-[15px]">
                {filteredTasks.length} results found
              </p>
            ) : (
              <p className="text-muted-foreground text-[15px]">
                {tasks.filter((t) => t.status !== "done").length} tasks pending.{" "}
                {tasks.filter((t) => t.status === "done").length} tasks
                completed..
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
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Filter tasks..."
                className="pl-9 w-[250px] lg:w-[350px] text-[15px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              className="border-dashed h-8 text-[15px]"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Status
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-dashed h-8 text-[15px]"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Priority
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 lg:px-3 text-[15px]"
              onClick={() => setSearchQuery("")}
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex text-[15px]"
            >
              <Settings2 className="mr-2 h-4 w-4" />
              View
            </Button>
            <Button size="sm" className="h-8 text-[15px]">
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
                <TableHead className="w-[50px] pl-4 text-[15px]">
                  <Checkbox />
                </TableHead>
                <TableHead className="w-[100px] text-[15px]">Task</TableHead>
                <TableHead className="text-[15px]">Title</TableHead>
                <TableHead className="w-[150px] text-[15px]">Status</TableHead>
                <TableHead className="w-[100px] text-[15px]">
                  Priority
                </TableHead>
                <TableHead className="w-[50px] text-[15px]"></TableHead>
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
                  <TableCell className="font-medium text-[15px]">
                    {task.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="mr-2 uppercase text-[10px] font-normal text-muted-foreground shrink-0"
                      >
                        {task.label}
                      </Badge>
                      <span className="font-medium truncate min-w-0 flex-1 text-[15px]">
                        {task.title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex w-[100px] items-center gap-2 text-[15px]">
                      {getStatusIcon(task.status)}
                      <span className="capitalize text-muted-foreground">
                        {task.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-[15px]">
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
          <div className="flex-1 text-[15px] text-muted-foreground">
            {selectedCount} of {filteredTasks.length} row(s) selected.
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-[15px] font-medium">Rows per page</p>
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
            <div className="flex w-[100px] items-center justify-center text-[15px] font-medium">
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
