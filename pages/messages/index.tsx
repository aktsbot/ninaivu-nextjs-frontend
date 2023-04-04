import { useEffect, useState } from "react";
import Link from "next/link";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";

import Stack from "@mui/material/Stack";
import MessageIcon from "@mui/icons-material/Message";

import Pagination from "@mui/material/Pagination";
import Layout from "@/page-components/Layout";
import MessageListTable from "@/page-components/MessageListTable";
import { IMessage } from "@/types/Message";

export default function Messages() {
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const [doSearch, setDoSearch] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    count: 0,
    allCount: 0,
    limit: 0,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function getMessages() {
      const query = new URLSearchParams({
        page: pagination.page.toString(),
      });
      try {
        const res = await fetch("/api/messages?" + query, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          signal: signal,
        }).then((r) => r.json());

        setAllMessages((prev) => [...prev, ...res.data.records]);
        setPagination((prev) => ({
          ...prev,
          totalPages: res.data.totalPages,
          count: res.data.count,
          allCount: res.data.allCount,
          limit: res.data.limit,
        }));
      } catch (error) {
        console.log(error);
      } finally {
        setDoSearch(false);
      }
    }
    if (pagination.page && doSearch) {
      getMessages();

      return () => {
        controller.abort();
      };
    }
  }, [pagination.page, doSearch]);

  useEffect(() => {
    setDoSearch(true);

    return () => setDoSearch(false);
  }, []);

  const handlePagination = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setAllMessages([]);
    setPagination((prev) => ({ ...prev, page: value }));
    setDoSearch(true);
  };

  return (
    <Layout title="Messages">
      <Typography variant="h4" component="h1" mt={2}>
        All messages
        <Box component="span" ml={1}>
          <Badge badgeContent={pagination.allCount} color="info">
            <MessageIcon color="action" />
          </Badge>
        </Box>
      </Typography>

      <Box mt={2}>
        {pagination.allCount === 0 && !doSearch ? (
          <Stack>
            <Typography component="p" mb={2}>
              No messages found.
            </Typography>
            <Link href="/messages/new" passHref>
              <Button size="small" variant="outlined">
                Create a message
              </Button>
            </Link>
          </Stack>
        ) : (
          <>
            <Box
              mb={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Stack>
                <Pagination
                  count={pagination.totalPages}
                  page={pagination.page}
                  onChange={handlePagination}
                />
              </Stack>
            </Box>
            <MessageListTable messages={allMessages} />
          </>
        )}
      </Box>

      <Box mb={4} />
    </Layout>
  );
}
