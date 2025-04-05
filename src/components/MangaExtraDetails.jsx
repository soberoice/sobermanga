import { Box, Stack, Tag, Text } from "@chakra-ui/react";
import React from "react";

export default function MangaExtraDetails({ data }) {
  return (
    <Box
      px="4"
      py="8"
      textAlign="left"
      gap={4}
      justifyContent="center"
      display="flex"
      flexDir="column"
    >
      {/* <Stack direction={"row"} gap={2} textAlign="left">
        {" "}
        {data?.infoX[1].japanese}
      </Stack> */}
      {/* <Stack direction={"row"} gap={2} textAlign="left">
        <Text fontWeight={"bold"}>Mal Score:</Text> {data?.infoX[1].malscore}
      </Stack> */}

      {data && (
        <Stack direction={"row"}>
          <Text fontWeight={"bold"}>Genre:</Text>
          <Stack direction="row" gap="1" px="4" wrap={"wrap"}>
            {data?.genres?.map((tag) => (
              <Tag.Root colorPalette={"white"} key={tag} cursor={"pointer"}>
                <Tag.Label>{tag}</Tag.Label>
              </Tag.Root>
            ))}
          </Stack>
        </Stack>
      )}

      {data && (
        <Stack direction={"row"} gap={2} textAlign="left">
          <Text fontWeight={"bold"}>Relesed:</Text> {data?.releaseDate}
        </Stack>
      )}
      {data && (
        <Stack direction={"row"} gap={2} textAlign="left">
          <Text fontWeight={"bold"}>Status:</Text> {data?.status}
        </Stack>
      )}
    </Box>
  );
}
