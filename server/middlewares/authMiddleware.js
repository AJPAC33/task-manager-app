import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token decodificado:", decodedToken);

      const resp = await User.findById(decodedToken.userId).select(
        "isAdmin email name"
      );
      console.log("Usuario encontrado:", resp);

      req.user = {
        email: resp.email,
        isAdmin: resp.isAdmin,
        userId: decodedToken.userId,
        name: resp.name,
      };

      next();
    } else {
      return res.status(401).json({
        status: false,
        message: "No autorizado. Intente autenticarse de nuevo.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      status: false,
      message: "No aurizado. Intente autenticarse de nuevo.",
    });
  }
};

// const protectRoute = async (req, res, next) => {
//   try {
//     const token = req.cookies?.token;

//     if (!token) {
//       return res.status(401).json({
//         status: false,
//         message: "No autorizado. Inicie sesión de nuevo.",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.userId).select("isAdmin email");
//     if (!user) {
//       return res.status(401).json({
//         status: false,
//         message: "Usuario no encontrado.",
//       });
//     }

//     req.user = {
//       userId: user._id,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     };

//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({
//       status: false,
//       message: "Token inválido o expirado.",
//     });
//   }
// };

const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message:
        "No autorizado como administrador. Intente autenticarse como administrador.",
    });
  }
};

export { isAdminRoute, protectRoute };
