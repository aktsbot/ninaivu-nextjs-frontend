import { useState, useContext } from "react";
import { useRouter } from "next/router";

import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Layout from "@/page-components/Layout";
import { AppContext } from "@/contexts/AppContext";

export default function NewMessage() {
  const router = useRouter();
  const { addAlert } = useContext(AppContext);

  const [message, setMessage] = useState({
    content: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const name = target.name;

    setMessage((prev) => ({
      ...prev,
      [name]: target.value,
    }));
  }

  const postData = async () => {
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      addAlert({
        message: "Message has been added",
        type: "success",
      });
      router.push("/messages");
    } catch (error) {
      addAlert({
        message: "Failed to add message",
        type: "error",
      });
    }
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(message);
    postData();
  }

  return (
    <Layout title="Add a message">
      <Typography variant="h4" component="h1" mt={2}>
        Add a message
      </Typography>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        mt={2}
        onSubmit={handleSubmit}
      >
        <TextField
          id="message-content"
          label="Message content"
          multiline
          rows={4}
          fullWidth
          name="content"
          onChange={handleChange}
        />

        <Box mt={2}>
          <Button
            variant="contained"
            type="submit"
            disabled={message.content.length === 0}
          >
            Create message
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}
