import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdGridView,
  MdDashboard,
  MdTaskAlt,
  MdOutlinePendingActions,
} from "react-icons/md";

import {
  FaTasks,
  FaTrashAlt,
  FaUsers,
  FaBug,
  FaThumbsUp,
  FaUser,
  FaList,
} from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import { RxActivityLog } from "react-icons/rx";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";

export const NOTIFICATIONICONS = {
  alert: (
    <HiBellAlert className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" />
  ),
  message: (
    <BiSolidMessageRounded className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" />
  ),
};

export const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

export const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tareas",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "Completado",
    link: "completed/completadas",
    icon: <MdTaskAlt />,
  },
  {
    label: "En Progreso",
    link: "in-progress/en progreso",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Pendiente",
    link: "todo/pendientes",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Equipo",
    link: "team",
    icon: <FaUsers />,
  },
  {
    label: "Papelera",
    link: "trashed",
    icon: <FaTrashAlt />,
  },
];

export const STAGE_LABELS = {
  todo: "PENDIENTE",
  "in-progress": "EN PROGRESO",
  completed: "COMPLETADO",
};

export const PRIORITY_LABELS = {
  high: "ALTA",
  medium: "MEDIA",
  normal: "NORMAL",
  low: "BAJA",
};

export const PRIORITY_MIN_LABELS = {
  high: "Alta",
  medium: "Media",
  normal: "Normal",
  low: "Baja",
};

// Traducción de stage
export const STAGE_MAP = {
  PENDIENTE: "todo",
  "EN PROGRESO": "in-progress",
  COMPLETADO: "completed",
};

// Traducción de priority
export const PRIORITY_MAP = {
  ALTA: "high",
  MEDIA: "medium",
  NORMAL: "normal",
  BAJA: "low",
};

export const LABELS_MAP = {
  restore: "Restaurar",
  restoreAll: "Restaurar todos",
  deleteAll: "Eliminar todos",
  delete: "Eliminar",
};

export const STAGE_OPTIONS = [
  { value: "todo", label: "PENDIENTE" },
  { value: "in-progress", label: "EN PROGRESO" },
  { value: "completed", label: "COMPLETADO" },
];

export const PRIORITY_OPTIONS = [
  { value: "high", label: "ALTA" },
  { value: "medium", label: "MEDIA" },
  { value: "low", label: "BAJA" },
];

export const bgColor = {
  high: "bg-red-200",
  medium: "bg-yellow-200",
  low: "bg-blue-200",
};

export const TABS = [
  { title: "Detalle de Tarea", icon: <FaTasks /> },
  { title: "Actividades/Linea de tiempo", icon: <RxActivityLog /> },
];

export const TASKTABS = [
  { title: "Vista de Tabla", icon: <MdGridView /> },
  { title: "Vista de Lista", icon: <FaList /> },
];

export const TASKTYPEICON = {
  commented: (
    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
      <MdOutlineMessage />,
    </div>
  ),
  started: (
    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
      <FaThumbsUp size={20} />
    </div>
  ),
  assigned: (
    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white">
      <FaUser size={14} />
    </div>
  ),
  bug: (
    <div className="text-red-600">
      <FaBug size={24} />
    </div>
  ),
  completed: (
    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  "in-progress": (
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white">
      <GrInProgress size={16} />
    </div>
  ),
};

export const ACT_TYPES = [
  "Comenzado",
  "Completado",
  "En Progreso",
  "Comentado",
  "Error",
  "Asignado",
];

export const ACT_TYPES_MAP = {
  Comenzado: "started",
  Completado: "completed",
  "En Progreso": "in-progress",
  Bug: "bug",
  Comentado: "commented",
  Error: "error",
  Asignado: "assigned",
};

export const ACT_TYPES_LABELS = {
  started: "Comenzado",
  completed: "Completado",
  "in-progress": "En Progreso",
  bug: "Bug",
  commented: "Comentado",
  error: "Error",
  assigned: "Asignado",
};

export const PRIORITYSTYLES = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-blue-600",
};

export const TASK_TYPE = {
  todo: "bg-blue-600",
  "in-progress": "bg-yellow-600",
  completed: "bg-green-600",
};

export const BGS = [
  "bg-blue-600",
  "bg-yellow-600",
  "bg-red-600",
  "bg-green-600",
];
