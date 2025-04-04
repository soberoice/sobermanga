import { Box, Card, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { MANGA } from "@consumet/extensions";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

export default function PopularMangaList() {
  const [data, setData] = useState();
  const getData = async () => {
    const mangadex = new MANGA.MangaDex();
    const result = await mangadex.fetchPopular(1, 20);
    setData(result);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Stack mt={10} p={4}>
      {data?.results?.length && (
        <Stack direction={"row"} justify={"space-between"}>
          <Heading size={"2xl"}>Popular manga</Heading>
          <Link>More</Link>
        </Stack>
      )}
      <Stack direction={"row"} overflow={"scroll"}>
        {/* {console.log(data)} */}
        {data?.results?.map((manga) => (
          <Card.Root
            key={manga?.id}
            cursor="pointer"
            border="none"
            maxHeight={450}
            minW="200px"
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
    </Stack>
  );
}
