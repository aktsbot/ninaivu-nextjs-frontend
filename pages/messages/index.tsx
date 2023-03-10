import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";

import MessageIcon from "@mui/icons-material/Message";

import Layout from "@/page-components/Layout";
import MessageListTable from "@/page-components/MessageListTable";

export default function Messages() {
  const messages = [
    {
      uuid: "1234",
      content: "This is a test sms",
      createdAt: "2023-03-10T19:23:31.961Z",
      updatedAt: "2023-03-10T19:23:31.961Z",
    },
    {
      uuid: "1235",
      content:
        "மார்கழி பூவே மார்கழி பூவே உன் மடி மேலே ஓர் இடம் வேண்டும் மெத்தை மேல் கண்கள் மூடவும் இல்லை உன்மடி சேர்ந்தால் கனவுகள் கொள்ளை",
      createdAt: "2023-03-09T19:23:31.961Z",
      updatedAt: "2023-03-09T19:23:31.961Z",
    },
  ];

  return (
    <Layout title="Messages">
      <Typography variant="h4" component="h1" mt={2}>
        All messages
        <Box component="span" ml={1}>
          <Badge badgeContent={messages.length} color="info">
            <MessageIcon color="action" />
          </Badge>
        </Box>
      </Typography>

      <Box mt={2} />
      <MessageListTable messages={messages} />

      <Box mb={4} />
    </Layout>
  );
}
