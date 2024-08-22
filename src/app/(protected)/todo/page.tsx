"use client";

// components/TodoComponents.server.tsx
import { todoColumns, TodoDataTable } from "@/components/todos";
import { Todo } from "@/types/todos.type";
import { useQuery } from "@apollo/client";
import { GET_TODOS } from "@/app/api/graphql/todo/queries";

export default function TodoPage() {
  const { loading, error, data } = useQuery(GET_TODOS);

  return (
    <>
      {loading ? (
        <div className="bg-zinc-950 mt-10 text-white">
          <TodoDataTable columns={todoColumns} data={[] as Todo[]} />{" "}
        </div>
      ) : (
        <div className="bg-zinc-950 mt-10 text-white">
          <TodoDataTable columns={todoColumns} data={data?.todos as Todo[]} />{" "}
        </div>
      )}
    </>
  );
}
