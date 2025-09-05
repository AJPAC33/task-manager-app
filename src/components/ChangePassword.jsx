import React from "react";
import { useForm } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { ModalWrapper } from "./ModalWrapper";
import { DialogTitle } from "@headlessui/react";
import { Button } from "./Button";
import { Loading } from "./Loader";
import { Textbox } from "./Textbox";

export const ChangePassword = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

  const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning("Las contraseñas no coinciden");
      return;
    }
    try {
      const res = await changeUserPassword(data).unwrap();
      toast.success("Contraseña cambiada con éxito");
      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };
  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <DialogTitle
            as="h2"
            className="text-base font-bold loading-6 text-gray-900 mb-4"
          >
            Cambiar contraseña
          </DialogTitle>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Nueva contraseña"
              type="password"
              name="password"
              label="Nueva contraseña"
              className="w-full rounded"
              register={register("password", {
                required: "Nueva contraseña requerida!",
              })}
              error={errors.password ? errors.password.message : ""}
            />
            <Textbox
              placeholder="Confirmar nueva contraseña"
              type="password"
              name="cpass"
              label="Confirmar nueva contraseña"
              className="w-full rounded"
              register={register("cpass", {
                required: "Nueva confirmación de contraseña requerida!",
              })}
              error={errors.cpass ? errors.cpass.message : ""}
            />
          </div>
          {isLoading ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-500"
                label="Cambiar contraseña"
              />
              <button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </button>
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};
