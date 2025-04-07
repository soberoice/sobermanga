import {
  Box,
  Card,
  Center,
  Heading,
  Image,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { MANGA } from "@consumet/extensions";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

export default function RecentlyAdded() {
  const [data, setData] = useState();
  const navigat = useNavigate();
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleclick = (id) => {
    navigat(`/manga/${id}`);
  };
  const getData = async () => {
    const mangadex = new MANGA.MangaDex({
      url: "https://corsproxy-psi.vercel.app/api/proxy?url=",
    });
    const result = await encodeURIComponent(mangadex.fetchRecentlyAdded(1, 5));
    setData(result);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Center>
      <Stack mt={10} p={4}>
        {/* {console.log(data)} */}
        {data?.results?.length ? (
          <Stack direction={"row"} justify={"space-between"}>
            <Heading size={"2xl"}>RecentlyAdded</Heading>
            <Link>More</Link>
          </Stack>
        ) : (
          <Skeleton height="5" width="100%" />
        )}
        {data?.results?.length
          ? data?.results?.map((manga) => {
              if (manga?.contentRating === "safe") {
                return (
                  <Card.Root
                    flexDirection="row"
                    cursor="pointer"
                    overflow="hidden"
                    maxW="100%"
                    maxH={150}
                    cursore={"pointer"}
                    onClick={() => handleclick(manga?.id)}
                    key={manga?.id}
                  >
                    {console.log(manga?.image)}
                    <Box w={"200px"}>
                      <Image
                        objectFit="cover"
                        minW="100px"
                        src={`https://corsproxy-psi.vercel.app/api/proxy?url=${manga?.image}`}
                        alt={manga?.title}
                      />
                    </Box>
                    <Stack direction={"row"} w="full">
                      <Card.Body>
                        <Card.Title mb="2" lineClamp={1}>
                          {manga?.title}
                        </Card.Title>
                        <Card.Description lineClamp={1}>
                          {manga?.altTitles[0]?.ja ||
                            manga?.altTitles[2]?.ja ||
                            manga?.altTitles[0]?.ko ||
                            manga?.altTitles[0]?.zh ||
                            manga?.altTitles[1]?.ja}
                        </Card.Description>
                      </Card.Body>
                      {/* <Card.Footer marginLeft={"auto"}>
                    <Text fontWeight={"bold"} fontSize={"4xl"}>
                      {manga.title}
                    </Text>
                  </Card.Footer> */}
                    </Stack>
                  </Card.Root>
                );
              } else {
                return;
              }
            })
          : numbers.map((num) => (
              <Card.Root
                flexDirection="row"
                cursor="pointer"
                overflow="hidden"
                size={"sm"}
                w="full"
                h={150}
                key={num}
              >
                <Skeleton aspectRatio={4 / 1.4} Height="100%" W="100%" />
              </Card.Root>
            ))}
      </Stack>
    </Center>
  );
}
