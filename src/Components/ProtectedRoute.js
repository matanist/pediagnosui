import React from "react";
import { Redirect, Route } from "react-router";

export default function ProtectedRoute({
  component: Component,
  ...restOfProps
}) {
  const rol = localStorage.getItem("role");
  return (
    <Route
      {...restOfProps}
      render={(props) => {
        if (restOfProps.roles.filter((r) => r === rol).length > 0) {
          return <Component {...restOfProps} {...props} />;
        } else {
          return <Redirect to="/signin" />;
        }
      }}
    />
  );
}
