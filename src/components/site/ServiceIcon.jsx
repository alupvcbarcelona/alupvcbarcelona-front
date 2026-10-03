import {
  AppWindow, Blinds, Building2, Columns3, Construction, DoorOpen, Drill, Fence, Grid3x3, Hammer, House,
  Layers, Lock, PaintRoller, PanelsTopLeft, Ruler, ShieldCheck, Sparkles, Sun, Thermometer, Warehouse, Wrench,
} from "lucide-react";

// ICONOS DISPONIBLES PARA LOS SERVICIOS (SE ELIGEN DESDE EL PANEL)
export const SERVICE_ICONS = {
  AppWindow, Blinds, Grid3x3, Wrench, PanelsTopLeft, Hammer, DoorOpen, House, Building2, Columns3, Layers,
  Ruler, Drill, PaintRoller, Construction, Fence, Lock, ShieldCheck, Thermometer, Sun, Sparkles, Warehouse,
};

const ServiceIcon = ({ name, ...props }) => {
  const Icon = SERVICE_ICONS[name] || Wrench;
  return <Icon aria-hidden="true" {...props} />;
};

export default ServiceIcon;
