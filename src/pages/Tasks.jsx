import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../components/Loader";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { Tabs } from "../components/Tabs";
import { TaskTitle } from "../components/TaskTitle";
import { BoardView } from "../components/BoardView";
import { Table } from "../components/task/Table";
import { AddTask } from "../components/task/AddTask";
import { useGetAllTasksQuery } from "../redux/slices/api/taskApiSlice";
import { TASK_TYPE, TASKTABS } from "../utils/data";

export const Tasks = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);

  const name = params?.name || "";
  const status = params?.status || "";

  const { data, isLoading } = useGetAllTasksQuery({
    strQuery: status,
    isTrashed: "",
    search: "",
  });

  return isLoading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={name ? `Tareas ${name}` : "Tareas"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Crear Tarea"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
          />
        )}
      </div>

      <Tabs tabs={TASKTABS} setSelected={setSelected}>
        {!status && (
          <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
            <TaskTitle label="Pendientes" className={TASK_TYPE.todo} />
            <TaskTitle
              label="En progreso"
              className={TASK_TYPE["in-progress"]}
            />
            <TaskTitle label="Completados" className={TASK_TYPE.completed} />
          </div>
        )}

        {selected !== 1 ? (
          <BoardView tasks={data?.tasks} />
        ) : (
          <div className="w-full">
            <Table tasks={data?.tasks} />
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};
