import clsx from "clsx";
import React from "react";
import { useState } from "react";
import { BiMessageDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdAttachFile } from "react-icons/md";
import { useSelector } from "react-redux";
import { dateFormatter } from "../utils";
import { UserInfo } from "./UserInfo";
import { TaskDialog } from "./task/TaskDialog";
import { AddSubTask } from "./task/AddSubTask";
import {
  BGS,
  ICONS,
  PRIORITY_MIN_LABELS,
  PRIORITYSTYLES,
  TASK_TYPE,
} from "../utils/data";

export const TaskCard = ({ task }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="w-full h-fit bg-whitee shadow-md p-4 rounded">
        <div className="w-full flex justify-between">
          <div
            className={clsx(
              "flex flex-1 gap-1 items-center text-sm font-medium",
              PRIORITYSTYLES[task?.priority]
            )}
          >
            <span className="text-lg">{ICONS[task?.priority]}</span>
            <span className="uppercase">
              Prioridad {PRIORITY_MIN_LABELS[task?.priority]}
            </span>
          </div>
          {user?.isAdmin && <TaskDialog task={task} />}
        </div>
        <div className="flex items-center gap-2">
          <div
            className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.stage])}
          />
          <h4 className="line-clamp-1 text-black">{task?.title}</h4>
        </div>
        <span className="text-sm text-gray-600">
          {dateFormatter(new Date(task?.date))}
        </span>
        <div className="w-full border-t border-gray-200 my-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="flex gap-1 items-center text-sm text-gray-600">
                <BiMessageDetail />
                <span>{task?.activities?.length}</span>
              </div>
              <div className="flex gap-1 items-center text-sm text-gray-600 ">
                <MdAttachFile />
                <span>{task?.assets?.length}</span>
              </div>
              <div className="flex gap-1 items-center text-sm text-gray-600 ">
                <FaList />
                <span>{task?.subTask?.length}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse">
            {task?.team?.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm mr-1",
                  BGS[index % BGS?.length]
                )}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div>
        </div>
        {/* sub tasks */}
        {task?.subTask?.length > 0 ? (
          <div className="py-4 border-t border-gray-200">
            <h5 className="text-base line-clamp-1 text-black">
              {task?.subTask[0].title}
            </h5>
            <div className="p-4 space-x-8">
              <span className="text-sm text-gray-600">
                {dateFormatter(new Date(task?.subTask[0]?.date))}
              </span>
              <span className="bg-blue-600/10 px-3 py-1 text-blue-700 font-medium">
                {task?.subTask[0].tag}
              </span>
            </div>
          </div>
        ) : (
          <div className="py-4 border-t border-gray-200">
            <span className="text-gray-500">Sin subtarea</span>
          </div>
        )}
        <div className="w-full pb-2">
          <button
            disabled={user.isAdmin ? false : true}
            className="w-full flex gap-4 items-center text-sm text-gray-500 font-semibold disabled:cursor-not-allowed disabled:text-gray-300"
            onClick={() => setOpen(true)}
          >
            <IoMdAdd className="text-lg" />
            <span>AGREGAR SUBTAREA</span>
          </button>
        </div>
      </div>

      <AddSubTask open={open} setOpen={setOpen} id={task?._id} />
    </>
  );
};
