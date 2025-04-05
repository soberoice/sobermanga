import {
  Badge,
  Box,
  Breadcrumb,
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Separator,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MANGA } from "@consumet/extensions";
import React, { useEffect, useState } from "react";
import { FaBookOpen } from "react-icons/fa";
import { useParams } from "react-router";
import MangaExtraDetails from "../components/MangaExtraDetails";
import MangaList from "../components/MangaList";
import MangaEpisodeDrower from "../components/MangaEpisodeDrower";

export default function MangaDetails() {
  const [data, setData] = useState();
  const [more, setMore] = useState();
  const { id } = useParams();
  const getData = async () => {
    const mangadex = new MANGA.MangaDex();
    const result = await mangadex.fetchMangaInfo(`${id}`);
    setData(result);
  };
  const getRelivant = async () => {
    const mangadex = new MANGA.MangaDex();
    const result = await mangadex.fetchLatestUpdates();
    setMore(result);
  };
  useEffect(() => {
    setData({});
    setMore({});
    getData();
    getRelivant();
  }, [id]);
  return (
    <Box w={"100%"}>
      <Box
        backgroundImage={`url(${data?.image})`}
        position={"fixed"}
        zIndex={-10}
        w={"100%"}
        h={"100vh"}
        backgroundSize={"cover"}
      ></Box>
      <Stack
        direction={{ base: "column", lg: "row" }}
        background={"rgba(31, 31, 31, 0.42)"}
        backdropFilter="blur(20px)"
        p={10}
      >
        <Stack
          w={{ base: "100%", lg: "80%" }}
          gap={10}
          direction={{ base: "column", md: "row" }}
        >
          {console.log(data)}

          <Center w={{ base: "100%", lg: "25%" }}>
            {data && (
              <Box
                background={"rgba(0, 0, 0, 0.56)"}
                p={5}
                rounded={"2xl"}
                backdropFilter="blur(20px)"
              >
                <Image
                  src={`${data?.image}`}
                  rounded={"lg"}
                  alt={data?.title}
                  maxH={"400px"}
                />
              </Box>
            )}
          </Center>
          <Center w={{ base: "100%", lg: "65%" }}>
            <Stack w={"full"}>
              <Heading>{data?.title}</Heading>
              {data && (
                <Breadcrumb.Root size={"lg"}>
                  <Breadcrumb.List>
                    <Breadcrumb.Item>
                      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator />
                    <Breadcrumb.Item>
                      <Breadcrumb.CurrentLink>
                        {data?.title}
                      </Breadcrumb.CurrentLink>
                    </Breadcrumb.Item>
                  </Breadcrumb.List>
                </Breadcrumb.Root>
              )}
              <HStack wrap={"wrap"}>
                {data?.themes?.map((theme) => (
                  <Badge size={"lg"} cursor={"pointer"}>
                    {theme}
                  </Badge>
                ))}
              </HStack>
              <Box h={"200px"} w={"full"} overflow={"scroll"}>
                <Text>{data?.description?.en}</Text>
              </Box>
              {data && (
                <MangaEpisodeDrower mangaid={id} episodes={data?.chapters} />
              )}
            </Stack>
          </Center>
        </Stack>
        <Separator orientation={{ base: "horizontal", lg: "vertical" }} />

        <Center w={{ base: "100%", lg: "20%" }}>
          <MangaExtraDetails data={data} />
        </Center>
      </Stack>
      <Stack py={10} px={{ base: 5, lg: 10 }} w={"100%"} bgColor={"black"}>
        {more?.results?.length ? (
          <Stack p={4} direction={"row"} justify={"space-between"}>
            <Heading size={"2xl"}>Read More </Heading>
          </Stack>
        ) : (
          <Skeleton p={4} height="15" width="20%" />
        )}

        <MangaList data={more} />
      </Stack>
    </Box>
  );
}
