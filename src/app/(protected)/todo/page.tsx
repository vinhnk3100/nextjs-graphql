// components/TodoComponents.server.tsx
import { todoColumns, TodoDataTable } from "@/components/todos";
import TodoService from "@/app/api/services/todo.services";
import { auth } from "@/auth";
import { Suspense } from "react";
import { Todo } from "@/types/todos.type";

export default async function TodoPage() {
  const session = await auth();
  const todos = await TodoService.getMany();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {todos && (
        <div className="bg-zinc-950 mt-10">
          <TodoDataTable columns={todoColumns} data={todos as Todo[]} />
        </div>
      )}
    </Suspense>
  );
}
