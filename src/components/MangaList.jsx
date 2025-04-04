import {
  Card,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router";

export default function MangaList({ data, width, size }) {
  return (
    <Stack p={4} w={size} direction={"row"} wrap={"wrap"}>
      {/* {console.log(data)} */}
      {data?.results?.map((manga) => (
        <Card.Root
          key={manga?.id}
          cursor="pointer"
          border="none"
          maxHeight={450}
          maxW={width}
          overflow="hidden"
        >
          <Image aspectRatio={3 / 4} src={manga?.image} alt={manga?.title} />
          <Card.Body p="4">
            <Text truncate>{manga?.title}</Text>
            <Flex justify="space-between" fontWeight="light">
              <Text fontWeight="lighter" fontSize="xs">
                {manga?.releaseDate}
              </Text>
              <Text fontWeight="lighter" fontSize="xs">
                {manga?.status}
              </Text>
            </Flex>
          </Card.Body>
        </Card.Root>
      ))}
    </Stack>
  );
}
