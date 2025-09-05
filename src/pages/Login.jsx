import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Textbox } from "../components/Textbox";
import { Button } from "../components/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { Loading } from "../components/Loader";

export const Login = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (data) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  };

  useEffect(() => {
    user && navigate("/dashboard");
  }, [user]);
  return (
    <div className="w-full min-h-screen flex items-center justify-center flex-col lg-flex-row bg-[#f3f4f6]">
      <div className="w-full md:w-auto flex gap-0 md:gap-40 flex-col md:flex-row items-center justify-center">
        {/* left side */}
        <div className="h-full w-full lg:w-2/3 flex flex-col items-center justify-center">
          <div className="w-full md:max-w-lg 2xl:max-w-3xl flex flex-col items-center justify-center gap-5 md:gap-y-10 2xl:mt-20">
            <span className="flex gap-1 py-1 px-3 border rounded-full text-sm md:text-base border-gray-300 text-gray-600">
              Gestiona todas tus tareas en un solo lugar!
            </span>
            <p className="flex flex-col gap-0 md:gap-4 text-4xl md:text-6xl 2xl:text-7xl font-black text-center text-blue-700">
              <span>Basado en la nube</span>
              <span>Administrador de tareas</span>
            </p>
            <div>
              <div className="circle rotate-in-up-left"></div>
            </div>
          </div>
        </div>
        {/* right side */}
        <div className="w-full md:w-1/3 p-4 md:p-1 flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="form-container w-full md:w-[400px] flex flex-col gap-y-8 bg-white px-10 pt-14 pb-14"
          >
            <div className="">
              <p className="text-blue-600 text-3xl font-bold text-center">
                Bienvenido de nuevo!
              </p>
              <span className="text-center text-base text-gray-700">
                Manten todas tus credenciales seguras
              </span>
            </div>
            <div className="flex flex-col gap-y-5">
              <Textbox
                placeholder="email@example.com"
                type="email"
                name="email"
                label="Email"
                className="w-full rounded-full"
                register={register("email", {
                  required: "Direccion de email requerida!",
                })}
                error={errors.email ? errors.email.message : ""}
              />
              <Textbox
                placeholder="Tu contraseña"
                type="password"
                name="password"
                label="Password"
                className="w-full rounded-full"
                register={register("password", {
                  required: "Contraseña requerida!",
                })}
                error={errors.password ? errors.password.message : ""}
              />
              <span className="text-sm text-gray-500 hover:text-blue-600 hover:underline cursor-pointer">
                Olvidaste la contraseña?
              </span>
              {isLoading ? (
                <Loading />
              ) : (
                <Button
                  type="submit"
                  label="Inciar sesión"
                  className="w-full h-10 bg-blue-700 text-white"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
