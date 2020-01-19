import { useInput } from "../../utils/useInput";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

const HELPER_TEXT = "Name must be at least 3-characters long";

export default function NewListForm() {
  const name = useInput("");
  const [nameValid, setNameValid] = useState(true);

  function isNameValid() {
    return name.value.length >= 3;
  }

  function handleSubmit() {
    if (isNameValid()) {
    } else {
      setNameValid(false);
    }
  }

  function handleKeyUp() {
    if (!nameValid && isNameValid()) {
      setNameValid(true);
    }
  }

  return (
    <>
      <Container component="main" maxWidth="sm">
        <TextField
          margin="normal"
          fullWidth
          name="listname"
          label="Listname"
          type="text"
          error={!nameValid}
          helperText={!nameValid && HELPER_TEXT}
          id="listname"
          {...name.bind}
          onKeyUp={handleKeyUp}
        />
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Add new list
        </Button>
      </Container>
    </>
  );
}
