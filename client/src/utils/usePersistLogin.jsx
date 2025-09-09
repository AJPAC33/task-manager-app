import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout, setCredentials } from "../redux/slices/authSlice.js";
import { Loading } from "../components/Loader.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { useCheckSessionQuery } from "../redux/slices/api/authApiSlice.js";

export const PersistLogin = () => {
  const [checking, setChecking] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useCheckSessionQuery();

  useEffect(() => {
    if (!isLoading) {
      if (data?.status && data.user) {
        dispatch(setCredentials(data.user));
      } else {
        dispatch(logout());
        navigate("/login", { replace: true });
      }
      setChecking(false);
    }
  }, [data, isLoading, dispatch, navigate]);

  if (checking)
    return (
      <div className="py-10">
        <Loading />
      </div>
    );

  return <Outlet />;
};
