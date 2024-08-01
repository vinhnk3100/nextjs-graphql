// components/TodoComponents.server.tsx
import React, { Suspense } from "react";
import TodoService from "../api/services/todo.services";
import { todoColumns, TodoDataTable } from "@/components/todos";

export default async function TodoPage() {
  const todos = await TodoService.getMany();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-zinc-950 mt-10">
        <TodoDataTable columns={todoColumns} data={todos} />
      </div>
    </Suspense>
  );
}
