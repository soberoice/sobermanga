import { Stack, Skeleton } from "@chakra-ui/react";
import React from "react";

export default function VideoLoader() {
  const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <Stack spacing={6}>
      <Skeleton flex="1" height="5" variant="shine" />
      {numbers.map((num) => (
        <Skeleton flex="1" height="5" variant="shine" />
      ))}
    </Stack>
  );
}
