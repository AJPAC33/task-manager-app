import React, { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import { MdAttachFile } from "react-icons/md";
import { dateFormatter } from "../../utils";
import clsx from "clsx";
import { FaList } from "react-icons/fa";
import { UserInfo } from "../UserInfo";
import { Button } from "../Button";
import { ConfirmationDialog } from "../ConfirmationDialog";
import { useTrashTaskMutation } from "../../redux/slices/api/taskApiSlice";
import { AddTask } from "./AddTask";
import { toast } from "sonner";
import {
  BGS,
  ICONS,
  PRIORITY_MIN_LABELS,
  PRIORITYSTYLES,
  TASK_TYPE,
} from "../../utils/data";

export const Table = ({ tasks }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleteTask] = useTrashTaskMutation();

  const deleteClick = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const deleteHandler = async () => {
    try {
      const res = await deleteTask({
        id: selected,
        isTrashed: "trash",
      }).unwrap();
      toast.success(res?.message);
      setTimeout(() => {
        setOpenDialog(false);
        window.location.reload();
      }, 500);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const TableHeader = () => (
    <thead className="w-full border-b border-gray-300">
      <tr className="w-full text-black  text-left">
        <th className="py-2">Titulo</th>
        <th className="py-2">Prioridad</th>
        <th className="py-2 line-clamp-1">Creado en</th>
        <th className="py-2">Activos</th>
        <th className="py-2">Equipo</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-300/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <p className="w-full line-clamp-2 text-base text-black">
            {task?.title}
          </p>
        </div>
      </td>

      <td className="py-2">
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", PRIORITYSTYLES[task?.priority])}>
            {ICONS[task?.priority]}
          </span>
          <span className="capitalize line-clamp-1">
            Prioridad {PRIORITY_MIN_LABELS[task?.priority]}
          </span>
        </div>
      </td>

      <td className="py-2">
        <span className="text-sm text-gray-600">
          {dateFormatter(new Date(task?.date))}
        </span>
      </td>

      <td className="py-2">
        <div className="flex items-center gap-3">
          <div className="flex gap-1 items-center text-sm text-gray-600">
            <BiMessageAltDetail />
            <span>{task?.activities?.length}</span>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400">
            <MdAttachFile />
            <span>{task?.assets?.length}</span>
          </div>
          <div className="flex gap-1 items-center text-sm text-gray-600 dark:text-gray-400">
            <FaList />
            <span>{task?.subTask?.length}</span>
          </div>
        </div>
      </td>

      <td className="py-2">
        <div className="flex">
          {task?.team?.map((m, index) => (
            <div
              key={m._id}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                BGS[index % BGS?.length]
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      <td className="py-2 flex gap-2 md:gap-4 justify-end">
        <Button
          className="text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base"
          label="Editar"
          type="button"
          onClick={() => editClick(task)}
        />

        <Button
          className="text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base"
          label="Eliminar"
          type="button"
          onClick={() => deleteClick(task?._id)}
        />
      </td>
    </tr>
  );

  const editClick = (task) => {
    setSelected(task);
    setOpenEdit(true);
  };

  return (
    <>
      <div className="bg-white  px-2 md:px-4 pt-4 pb-9 shadow-md rounded">
        <div className="overflow-x-auto">
          <table className="w-full ">
            <TableHeader />
            <tbody>
              {tasks.map((task, index) => (
                <TableRow key={index} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={selected}
        key={new Date().getTime()}
      />

      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};
