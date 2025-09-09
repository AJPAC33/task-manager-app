import React, { useState } from "react";
import { ModalWrapper } from "../ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import { Textbox } from "../Textbox";
import { useForm } from "react-hook-form";
import { BiImages } from "react-icons/bi";
import { Button } from "../Button";
import { UserList } from "./UserList";
import { SelectList } from "../SelectList";
import {
  useCreateTaskMutation,
  useUpdateTaskMutation,
} from "../../redux/slices/api/taskApiSlice";
import { toast } from "sonner";
import { formatDateForInput } from "../../utils";
import { STAGE_OPTIONS, PRIORITY_OPTIONS } from "../../utils/data";

const uploadedFileURLs = [];

export const AddTask = ({ open, setOpen, task }) => {
  const defaultValues = {
    title: task?.title || "",
    date: formatDateForInput(task?.date || new Date()),
    team: [],
    stage: STAGE_OPTIONS[0].value,
    priority: PRIORITY_OPTIONS[2].value,
    assets: [],
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });
  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage || STAGE_OPTIONS[0].value);
  const [priority, setPriority] = useState(
    task?.priority || PRIORITY_OPTIONS[2].value
  );
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const URLS = task?.assets ? [...task.assets] : [];

  const submitHandler = async (data) => {
    for (const file of assets) {
      setUploading(true);
      try {
        const uploadedUrl = await uploadFile(file);
        uploadedFileURLs.push(uploadedUrl); // acumulas las URLs de Cloudinary
      } catch (error) {
        console.error("Error al subir el archivo:", error.message);
        return;
      } finally {
        setUploading(false);
      }
    }

    try {
      const newData = {
        ...data,
        stage: stage,
        priority: priority,
        team,
        assets: [...URLS, ...uploadedFileURLs], // array de URLs subidas
      };
      const res = task?._id
        ? await updateTask({ ...newData, _id: task._id }).unwrap()
        : await createTask(newData).unwrap();
      toast.success(res.message);
      setTimeout(() => {
        setOpen(false);
        window.location.reload();
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  const handleSelect = (e) => {
    const files = Array.from(e.target.files);
    setAssets(files);
  };

  // const uploadFile = async (file) => {
  //   const storage = getStorage(app);
  //   const name = new Date().getTime() + file.name;
  //   const storageRef = ref(storage, name);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   return new Promise((resolve, reject) => {
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         console.log("Subiendo");
  //       },
  //       (error) => {
  //         reject(error);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref)
  //           .then((url) => resolve(url))
  //           .catch((error) => {
  //             reject(error);
  //           });
  //       }
  //     );
  //   });
  // };

  const uploadFile = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/ajpac33/image/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "task_manager_app");

    const res = await fetch(url, { method: "POST", body: formData });
    const data = await res.json();
    return data.secure_url;
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <DialogTitle
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {task ? "ACTUALIZAR TAREA" : "AÑADIR TAREA"}
          </DialogTitle>

          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Task Title"
              type="text"
              name="title"
              label="Título de la Tarea"
              className="w-full rounded"
              register={register("title", { required: "Title is required" })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList setTeam={setTeam} team={team} />

            <div className="flex gap-4">
              <SelectList
                label="Estado de la Tarea"
                options={STAGE_OPTIONS}
                selected={stage}
                setSelected={setStage}
              />

              <div className="w-full">
                <Textbox
                  placeholder="Date"
                  type="date"
                  name="date"
                  label="Fecha de la Tarea"
                  className="w-full rounded"
                  register={register("date", {
                    required: "Date is required!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <SelectList
                label="Nivel de Prioridad"
                options={PRIORITY_OPTIONS}
                selected={priority}
                setSelected={setPriority}
              />

              <div className="w-full flex items-center justify-center mt-4">
                <label
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4"
                  htmlFor="imgUpload"
                >
                  <input
                    type="file"
                    className="hidden"
                    id="imgUpload"
                    onChange={(e) => handleSelect(e)}
                    accept=".jpg, .png, .jpeg"
                    multiple={true}
                  />
                  <BiImages />
                  <span>Añadir Recursos</span>
                </label>
              </div>
            </div>
            {/* Mostrar los nombres */}
            <div className="flex flex-col gap-1 mt-2 w-full max-w-sm">
              {assets.map((file, index) => (
                <span key={index} className="text-sm text-gray-700">
                  {file.name}
                </span>
              ))}
            </div>

            <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
              {uploading ? (
                <span className="text-sm py-2 text-red-500">
                  Subiendo archivos...
                </span>
              ) : (
                <Button
                  label="Enviar"
                  type="submit"
                  className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                />
              )}

              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label="Cancelar"
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};
