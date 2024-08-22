import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { TodoSchema } from "@/schemas";
import { Todo } from "@/types/todos.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { UPDATE_TODO } from "@/app/api/graphql/todo/mutation";
import { GET_TODOS } from "@/app/api/graphql/todo/queries";

type TodoEditDialogProps = {
  data: Todo;
  dialogEditOpen: boolean;
  setDialogEditOpen: (value: boolean) => void;
};

type TodoListProps = {
  todos: Todo[];
};

export default function TodoEditDialog({
  data,
  dialogEditOpen,
  setDialogEditOpen,
}: TodoEditDialogProps) {
  const form = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: data.title,
      content: data.content,
      priority: data.priority,
      status: data.status,
      dateStart: new Date(data.dateStart),
      dateEnd: new Date(data.dateEnd),
    },
  });
  const [editTodo, { loading: editLoading, error: editError }] = useMutation(
    UPDATE_TODO,
    {
      update(cache, { data: { updateTodo } }) {
        if (updateTodo.status) {
          const existingTodos = cache.readQuery({ query: GET_TODOS });
          if (existingTodos && (existingTodos as TodoListProps).todos) {
            cache.writeQuery({
              query: GET_TODOS,
              data: {
                todos: existingTodos,
              },
            });
          }
        }
      },
    }
  );

  const handleOnSubmitFormEdit = async (values: z.infer<typeof TodoSchema>) => {
    const validateFields = TodoSchema.safeParse(values);
    if (!validateFields.success) {
      toast({
        title: "Error Occurred",
        description: "Invalid fields validate",
        variant: "destructive",
        duration: 1000,
      });
      return;
    }
    try {
      const res = await editTodo({
        variables: { id: Number(data.id), input: validateFields.data },
      });
      if (res.data.updateTodo.message) {
        toast({
          title: "Action success!",
          description: "Updated todo action successfully!",
          variant: "success",
          duration: 1200,
        });

        setDialogEditOpen(false);
        return;
      } else {
        throw new Error(res.data.updateTodo.message);
      }
    } catch (error) {
      toast({
        title: "Error Occurred",
        description: "Invalid fields validate",
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  return (
    <>
      <Dialog open={dialogEditOpen} onOpenChange={setDialogEditOpen}>
        {/* <DialogTrigger asChild>
          <span className="relative hover:bg-zinc-800 hover:text-zinc-200 text-zinc-400 flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            Edit
          </span>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[600px] bg-zinc-950 border border-zinc-800 text-zinc-200">
          <DialogHeader>
            <DialogTitle>Edit</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleOnSubmitFormEdit)}
              className="flex flex-col items-center gap-4 mt-4"
            >
              <div className="flex flex-row items-center w-full">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <>
                      <FormLabel className="w-1/3">Title</FormLabel>
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Todo title..."
                          />
                        </FormControl>
                      </FormItem>
                    </>
                  )}
                />
              </div>
              <div className="flex flex-row items-center w-full">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <>
                      <FormLabel className="w-1/3">Content</FormLabel>
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Todo content..."
                          />
                        </FormControl>
                      </FormItem>
                    </>
                  )}
                />
              </div>
              <div className="flex flex-row items-center w-full">
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <>
                      <FormLabel className="w-1/3">Priority</FormLabel>
                      <FormItem className="w-full">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-[180px] bg-zin-950 border border-zinc-800">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-950 text-zinc-200 border border-zinc-800">
                              <SelectGroup>
                                <SelectLabel>Priority</SelectLabel>
                                <DropdownMenuSeparator className="border border-zinc-800" />
                                <SelectItem
                                  value="LOW"
                                  className="text-yellow-300 cursor-pointer"
                                >
                                  Low
                                </SelectItem>
                                <SelectItem
                                  value="MEDIUM"
                                  className="text-orange-300 cursor-pointer"
                                >
                                  Medium
                                </SelectItem>
                                <SelectItem
                                  value="HIGH"
                                  className="text-red-300 cursor-pointer"
                                >
                                  High
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    </>
                  )}
                />
              </div>
              <div className="flex flex-row items-center w-full">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <>
                      <FormLabel className="w-1/3">Status</FormLabel>
                      <FormItem className="w-full">
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-[180px] bg-zin-950 border border-zinc-800">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-950 text-zinc-200 border border-zinc-800">
                              <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <DropdownMenuSeparator className="border border-zinc-800" />
                                <SelectItem
                                  value="NOT_STARTED"
                                  className="text-red-300 cursor-pointer"
                                >
                                  Not started
                                </SelectItem>
                                <SelectItem
                                  value="IN_PROGRESS"
                                  className="text-orange-300 cursor-pointer"
                                >
                                  In progress
                                </SelectItem>
                                <SelectItem
                                  value="DONE"
                                  className="text-green-300 cursor-pointer"
                                >
                                  Done
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    </>
                  )}
                />
              </div>
              <div className="flex flex-row items-center w-full">
                <FormField
                  control={form.control}
                  name="dateStart"
                  render={({ field }) => (
                    <>
                      <FormLabel className="w-1/3">Date Start</FormLabel>
                      <FormItem className="w-full">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[280px] justify-start text-left font-normal bg-zinc-950 text-zinc-200 border border-zinc-800 hover:bg-zinc-700 hover:text-zinc-200",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-zinc-950 text-zinc-200">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date: any) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    </>
                  )}
                />
              </div>
              <div className="flex flex-row items-center w-full">
                <FormField
                  control={form.control}
                  name="dateEnd"
                  render={({ field }) => (
                    <>
                      <FormLabel className="w-1/3">Date End</FormLabel>
                      <FormItem className="w-full">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[280px] justify-start text-left font-normal bg-zinc-950 text-zinc-200 border border-zinc-800 hover:bg-zinc-700 hover:text-zinc-200",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-zinc-950 text-zinc-200">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date: any) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    </>
                  )}
                />
              </div>
              <DialogFooter className="flex w-full">
                <Button
                  disabled={editLoading}
                  type="submit"
                  className="bg-zinc-800 border border-zinc-800 hover:bg-zinc-600"
                >
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
