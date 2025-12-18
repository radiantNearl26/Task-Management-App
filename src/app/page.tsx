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
];

export default function TaskPage() {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredTasks, setFilteredTasks] =
    React.useState<Task[]>(initialTasks);

  // Filter tasks based on searchQuery
  React.useEffect(() => {
    if (!searchQuery) {
      setFilteredTasks(tasks);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      setFilteredTasks(
        tasks.filter((task) => task.title.toLowerCase().includes(lowerQuery)),
      );
    }
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

  // Count selected (done) rows within the filtered set
  const selectedCount = filteredTasks.filter((t) => t.status === "done").length;

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div className="flex flex-col gap-8 p-8 max-w-[1400px] mx-auto w-full text-foreground text-[15px]">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">
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
              {filteredTasks.map((task) => (
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
                      <span className="font-medium truncate max-w-[300px] lg:max-w-[500px] text-[15px]">
                        {task.title}
                      </span>
                      <Badge
                        variant="outline"
                        className="ml-2 uppercase text-[10px] font-normal text-muted-foreground shrink-0"
                      >
                        {task.label}
                      </Badge>
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
              <Select value="10" onValueChange={() => {}}>
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 50, 75].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-[15px] font-medium">
              Page 1 of 1
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex">
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="h-8 w-8 p-0">
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="h-8 w-8 p-0">
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex">
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
