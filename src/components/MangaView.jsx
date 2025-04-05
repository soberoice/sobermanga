import { Switch, Box, Image, Stack, Text, Center } from "@chakra-ui/react";
import { MANGA } from "@consumet/extensions";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import MangaEpisodeDrower from "./MangaEpisodeDrower";

export default function MangaView() {
  const [data, setData] = useState();
  const [chapters, setChapters] = useState();

  const [isHorizontal, setIsHorizontal] = useState(false);
  const { id, chapter, title, mangaid } = useParams();
  const getData = async () => {
    const mangadex = new MANGA.MangaDex();
    const result = await mangadex.fetchChapterPages(`${id}`);
    setData(result);
  };
  const getChapters = async () => {
    const mangadex = new MANGA.MangaDex();
    const result = await mangadex.fetchMangaInfo(`${mangaid}`);
    setChapters(result);
  };
  useEffect(() => {
    setData([]);
    setChapters([]);
    getChapters();
    getData();
  }, [id]);
  return (
    <Center flexDir={"column"}>
      <Stack
        position={"sticky"}
        top={"50px"}
        bg={"black"}
        w={"full"}
        h="70px"
        p={2}
        direction={"row"}
        margin={4}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        {console.log(chapters)}
        <Text>
          {chapter}: {title}
        </Text>
        <Switch.Root
          checked={isHorizontal}
          onCheckedChange={(e) => setIsHorizontal(e.checked)}
        >
          <Switch.HiddenInput />
          <Switch.Label>vertical</Switch.Label>
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>horizontal</Switch.Label>
        </Switch.Root>
        {chapters && (
          <MangaEpisodeDrower mangaid={mangaid} episodes={chapters?.chapters} />
        )}
      </Stack>

      <Stack
        direction={isHorizontal ? "row-reverse" : "column"}
        overflow={isHorizontal ? "auto" : "unset"}
        maxH={isHorizontal ? "100%" : "unset"}
        maxW={
          isHorizontal
            ? { base: "100%", md: "55%", lg: "30%" }
            : { base: "100%", md: "55%", lg: "30%" }
        }
        whiteSpace={isHorizontal ? "nowrap" : "normal"}
        flexShrink={0}
      >
        {console.log(data)}
        {data?.map((page, index) => (
          <Image
            key={index}
            alt={`Page ${index + 1}`}
            maxW={isHorizontal ? "100%" : "800px"}
            objectFit="contain"
            src={page.img}
          />
        ))}
      </Stack>
    </Center>
  );
}
