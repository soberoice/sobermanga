import { Card, Center, Heading, Image, Stack } from "@chakra-ui/react";
import { MANGA } from "@consumet/extensions";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

export default function RecentlyAdded() {
  const [data, setData] = useState();
  const getData = async () => {
    const mangadex = new MANGA.MangaDex();
    const result = await mangadex.fetchRecentlyAdded(1, 20);
    setData(result);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Center>
      <Stack mt={10} p={4}>
        {/* {console.log(data)} */}
        {data?.results?.length && (
          <Stack direction={"row"} justify={"space-between"}>
            <Heading size={"2xl"}>RecentlyAdded</Heading>
            <Link>More</Link>
          </Stack>
        )}
        {data?.results?.map((manga) => {
          if (manga?.contentRating === "safe") {
            return (
              <Card.Root
                flexDirection="row"
                cursor="pointer"
                overflow="hidden"
                size={"sm"}
                maxW="100%"
                maxH={100}
                cursore={"pointer"}
                // onClick={() => handleclick(anime.iD)}
                key={manga?.id}
              >
                <Image
                  objectFit="cover"
                  minW="100px"
                  src={manga?.image}
                  alt={manga?.title}
                />
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
          }
        })}
      </Stack>
    </Center>
  );
}
