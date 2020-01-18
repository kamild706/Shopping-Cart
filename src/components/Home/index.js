import React from "react";
import { useSelector } from "react-redux";
import UnauthenticatedHomePage from "./UnauthenticatedHomePage";
import AuthenticatedHomePage from "./AuthenticatedHomePage";

export default function Home() {
  const isAuthenticated = useSelector(store => store.auth.isAuthenticated);
  if (isAuthenticated) {
    return <AuthenticatedHomePage />;
  } else {
    return <UnauthenticatedHomePage />;
  }
}
