import { cloneElement } from "react";
import { PERMISSIONS } from "./PermissionMaps";
import jwt_decode from "jwt-decode";

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
  const token = localStorage.getItem(
    `@@auth0spajs@@::TU1HzLoMRbH5X4gA7FIFYji7hL88VXTi::https://test-api-agem.hasura.app/v1/graphql::openid profile email offline_access`
  );
  const role =
    jwt_decode(token)["https://hasura.io/jwt/claims"]["x-hasura-custom"];
  const permissions = PERMISSIONS[role];
  const permissionGranted = hasPermission({ permissions, scopes });

  if (!permissionGranted && !errorProps) return <RenderError />;

  if (!permissionGranted && errorProps)
    return cloneElement(children, { ...errorProps });

  return <>{children}</>;
}
