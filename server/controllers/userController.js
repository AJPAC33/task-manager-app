import Notice from "../models/notification.js";
import User from "../models/user.js";
import { createJWT } from "../utils/index.js";

export const checkSession = async (req, res) => {
  try {
    return res.status(200).json({
      status: true,
      user: {
        email: req.user.email,
        isAdmin: req.user.isAdmin,
        userId: req.user.userId,
        name: req.user.name,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: false,
      message: "No se pudo verificar la sesión",
    });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin, role, title } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        status: false,
        message: "El usuario ya existe",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
      isAdmin,
      role,
      title,
    });

    if (user) {
      isAdmin ? createJWT(res, user._id) : null;
      user.password = undefined;
      res.status(201).json(user);
    } else {
      return res
        .status(400)
        .json({ status: false, message: "Datos de usuario inválidos" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Email o contraseña incorrectos",
      });
    }

    if (!user?.isActive) {
      return res.status(401).json({
        status: false,
        message: "Usuario deshabilitado, contactar con el adminstrador",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (user && isMatch) {
      createJWT(res, user._id);
      user.password = undefined;
      res.status(200).json(user);
    } else {
      return res.status(401).json({
        status: false,
        message: "Email o contraseña incorrectos",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      htttpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Cierre de sesion exitoso" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getTeamList = async (req, res) => {
  try {
    const users = await User.find().select("name title role email isActive");

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const getNotificationsList = async (req, res) => {
  try {
    const { userId } = req.user;

    const notice = await Notice.find({
      team: userId,
      isRead: { $nin: [userId] },
    }).populate("task", "title");

    res.status(201).json(notice);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { userId, isAdmin } = req.user;
    const { _id } = req.body;

    const id =
      isAdmin && userId === _id
        ? userId
        : isAdmin && userId !== _id
        ? _id
        : userId;

    const user = await User.findById(id);

    if (user) {
      user.name = req.body.name || user.name;
      user.title = req.body.title || user.title;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;

      const updatedUser = await user.save();

      user.password = undefined;

      res.status(201).json({
        status: true,
        message: "Perfil actualizado exitosamente.",
        user: updatedUser,
      });
    } else {
      res.status(404).json({ status: false, message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { userId } = req.user;

    const { isReadType, id } = req.query;

    if (isReadType === "all") {
      await Notice.updateMany(
        { team: userId, isRead: { $nin: [userId] } },
        { $push: { isRead: userId } },
        { new: true }
      );
    } else {
      await Notice.findOneAndUpdate(
        { _id: id, isRead: { $nin: [userId] } },
        { $push: { isRead: userId } },
        { new: true }
      );
    }

    res.status(201).json({ status: true, message: "Hecho" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const changeUserPassword = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);

    if (user) {
      user.password = req.body.password;

      await user.save();

      user.password = undefined;

      res.status(201).json({
        status: true,
        message: `Contraseña actualizada con éxito.`,
      });
    } else {
      res
        .status(404)
        .json({ status: false, message: "Usuario no encontrado." });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const activateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (user) {
      user.isActive = req.body.isActive; //!user.isActive

      await user.save();

      res.status(201).json({
        status: true,
        message: `La cuenta de usuario ha sido ${
          user?.isActive ? "activada" : "desactivada"
        }`,
      });
    } else {
      res.status(404).json({ status: false, message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res
      .status(200)
      .json({ status: true, message: "Usuario eliminado con éxito." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
