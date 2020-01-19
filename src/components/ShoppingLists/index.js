import Typography from "@material-ui/core/Typography";
import React from "react";
import NewListForm from "./NewListForm";

export default function ShoppingList() {
  const lists = null;

  return (
    <>
      <NewListForm />
      {lists === null && (
        <Typography component="p">You don't have any lists yet.</Typography>
      )}
    </>
  );
}
