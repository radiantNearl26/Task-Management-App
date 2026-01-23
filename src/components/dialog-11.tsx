"use client";

import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { createTask, updateTask, type Task } from "@/app/actions";

interface Dialog11Props {
  onTaskSaved?: () => void;
  taskToEdit?: Task | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
}

export default function Dialog11({
  onTaskSaved,
  taskToEdit,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  showTrigger = true,
}: Dialog11Props) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? setControlledOpen : setInternalOpen;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    try {
      if (taskToEdit) {
        // Edit Mode
        const updates = {
          title: formData.get("title") as string,
          label: formData.get("label") as string,
          priority: formData.get("priority") as string,
          status: formData.get("status") as string,
        };
        const result = await updateTask(taskToEdit.id, updates);
        if (result.success) {
          toast.success("Task updated successfully");
          setOpen?.(false);
          onTaskSaved?.();
        } else {
          toast.error(result.message || "Failed to update task");
        }
      } else {
        // Create Mode
        // Add default status since it's required by the backend but not in the form
        formData.append("status", "in progress");
        const result = await createTask(formData);
        if (result.success) {
          toast.success("Task created successfully");
          setOpen?.(false);
          onTaskSaved?.();
        } else {
          toast.error(result.message || "Failed to create task");
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {showTrigger && (
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="overflow-visible p-0 sm:max-w-2xl gap-0">
        <DialogHeader className="border-b px-6 py-4 mb-0">
          <DialogTitle>
            {taskToEdit ? "Edit Task" : "Create New Task"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} key={taskToEdit ? taskToEdit.id : "new"}>
          <div className="flex flex-col-reverse md:flex-row">
            <div className="flex flex-col justify-between md:w-80 md:border-r">
              <div className="flex-1 grow">
                <div className="border-t p-6 md:border-none">
                  <div className="flex items-center space-x-3">
                    <div className="inline-flex shrink-0 items-center justify-center rounded-sm bg-muted p-3">
                      <Plus
                        className="size-5 text-foreground"
                        aria-hidden={true}
                      />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-medium text-foreground">
                        {taskToEdit ? "Edit Task" : "New Task"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {taskToEdit
                          ? "Modify existing task details"
                          : "Add a new item to your list"}
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <h4 className="text-sm font-medium text-foreground">
                    Description
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {taskToEdit
                      ? "Update the task details below."
                      : "Fill out the form to add a new task to the database."}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t p-4">
                <DialogClose asChild>
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" size="sm" disabled={loading}>
                  {loading
                    ? taskToEdit
                      ? "Saving..."
                      : "Creating..."
                    : taskToEdit
                      ? "Save Changes"
                      : "Create"}
                </Button>
              </div>
            </div>

            <div className="flex-1 space-y-6 p-6 md:px-6 md:pb-8 md:pt-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="inline-flex size-6 items-center justify-center rounded-sm bg-muted text-sm text-foreground">
                    1
                  </div>
                  <Label
                    htmlFor="title"
                    className="text-sm font-medium text-foreground"
                  >
                    Enter task name
                  </Label>
                </div>
                <Textarea
                  id="title"
                  name="title"
                  placeholder="Task description..."
                  className="min-h-[100px] resize-y"
                  required
                  defaultValue={taskToEdit?.title}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="inline-flex size-6 items-center justify-center rounded-sm bg-muted text-sm text-foreground">
                    2
                  </div>
                  <Label
                    htmlFor="label"
                    className="text-sm font-medium text-foreground"
                  >
                    Choose appropriate tag
                  </Label>
                </div>
                <Select
                  defaultValue={taskToEdit?.label || "documentation"}
                  name="label"
                >
                  <SelectTrigger id="label" className="w-full">
                    <SelectValue placeholder="Select tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="documentation">Documentation</SelectItem>
                    <SelectItem value="bug">Bug</SelectItem>
                    <SelectItem value="feature">Feature</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="flex items-center space-x-3">
                  <div className="inline-flex size-6 items-center justify-center rounded-sm bg-muted text-sm text-foreground">
                    3
                  </div>
                  <Label
                    htmlFor="priority"
                    className="text-sm font-medium text-foreground"
                  >
                    Choose priority
                  </Label>
                </div>
                <Select
                  defaultValue={taskToEdit?.priority || "low"}
                  name="priority"
                >
                  <SelectTrigger id="priority" className="mt-4 w-full">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {taskToEdit && (
                <div>
                  <div className="flex items-center space-x-3">
                    <div className="inline-flex size-6 items-center justify-center rounded-sm bg-muted text-sm text-foreground">
                      4
                    </div>
                    <Label
                      htmlFor="status"
                      className="text-sm font-medium text-foreground"
                    >
                      Set status
                    </Label>
                  </div>
                  <Select
                    defaultValue={taskToEdit.status || "in progress"}
                    name="status"
                  >
                    <SelectTrigger id="status" className="mt-4 w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in progress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
