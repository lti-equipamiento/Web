import { cloneElement } from "react";
import { PERMISSIONS } from "./PermissionMaps";
import { useGetRole } from "./useGetRole";

const hasPermission = ({ permissions, scopes }) => {
  const scopesMap = {};
  scopes.forEach((scope) => {
    scopesMap[scope] = true;
  });

  return permissions.some((permission) => scopesMap[permission]);
};

export default function PermissionsGate({
  children,
  RenderError = () => <></>,
  errorProps = null,
  scopes = [],
}) {
  // const { role } = useGetRole();
  const permissions = PERMISSIONS["normal"];

  const permissionGranted = hasPermission({ permissions, scopes });

  if (!permissionGranted && !errorProps) return <RenderError />;

  if (!permissionGranted && errorProps)
    return cloneElement(children, { ...errorProps });

  return <>{children}</>;
}
