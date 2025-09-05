import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ModalWrapper } from "./ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import { Textbox } from "./Textbox";
import { Loading } from "./Loader";
import { Button } from "./Button";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import { setCredentials } from "../redux/slices/authSlice";
import { toast } from "sonner";

export const AddUser = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const dispatch = useDispatch();
  const [addNewUser, { isLoading }] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const isEditingLoggedUser = Boolean(userData && userData._id === user._id);

  const handleOnSubmit = async (data, isEditingLoggedUser = false) => {
    try {
      if (userData) {
        const result = await updateUser(data).unwrap();
        toast.success("Perfil actualizado con éxito");
        if (isEditingLoggedUser) {
          dispatch(setCredentials({ ...result.user }));
        }
      } else {
        await addNewUser({ ...data, password: data.email });
        toast.success("Usuario creado con éxito");
      }
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      toast.error("Error al crear el usuario");
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form
          onSubmit={handleSubmit((data) =>
            handleOnSubmit(data, isEditingLoggedUser)
          )}
          className=""
        >
          <DialogTitle
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {userData ? "ACTUALIZAR PERFIL" : "AGREGAR NUEVO USUARIO"}
          </DialogTitle>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Nombre completo"
              type="text"
              name="name"
              label="Nombre completo"
              className="w-full rounded"
              register={register("name", {
                required: "Nombre completo requerido!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder="Título"
              type="text"
              name="title"
              label="Título"
              className="w-full rounded"
              register={register("title", {
                required: "Título requerido!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder="Email"
              type="email"
              name="email"
              label="Email"
              className="w-full rounded"
              register={register("email", {
                required: "Dirección email requerida!",
              })}
              error={errors.email ? errors.email.message : ""}
            />

            <Textbox
              placeholder="Rol"
              type="text"
              name="role"
              label="Rol"
              className="w-full rounded"
              register={register("role", {
                required: "Rol requerido!",
              })}
              error={errors.role ? errors.role.message : ""}
            />
          </div>

          {isLoading || isUpdating ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                label="Enviar"
              />

              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label="Cancelar"
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};
