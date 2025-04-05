import {
  Box,
  Card,
  Flex,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MANGA } from "@consumet/extensions";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export default function PopularMangaList() {
  const [data, setData] = useState();
  const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
  const navigat = useNavigate();
  const handleclick = (id) => {
    navigat(`/manga/${id}`);
  };
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
      {data?.results?.length ? (
        <Stack direction={"row"} justify={"space-between"}>
          <Heading size={"2xl"}>Popular manga</Heading>
          <Link>More</Link>
        </Stack>
      ) : (
        <Skeleton height="5" width="100%" />
      )}
      <Stack direction={"row"} overflow={"scroll"}>
        {/* {console.log(data)} */}
        {data?.results?.length
          ? data?.results?.map((manga) => (
              <Card.Root
                key={manga?.id}
                cursor="pointer"
                border="none"
                maxHeight={450}
                minW="200px"
                overflow="hidden"
                onClick={() => handleclick(manga?.id)}
              >
                <Image
                  aspectRatio={3 / 4}
                  src={manga?.image}
                  alt={manga?.title}
                />
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
            ))
          : numbers.map((num) => (
              <Card.Root
                border="none"
                key={num}
                maxHeight={450}
                minW="200px"
                overflow="hidden"
              >
                <Skeleton aspectRatio={3 / 4} Height="450px" W="200px" />
              </Card.Root>
            ))}
      </Stack>
    </Stack>
  );
}
