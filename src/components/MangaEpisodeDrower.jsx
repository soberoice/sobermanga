import {
  Box,
  Button,
  Center,
  CloseButton,
  Drawer,
  HStack,
  Image,
  Portal,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { FaBookOpen } from "react-icons/fa";
import { useNavigate } from "react-router";

export default function MangaEpisodeDrower({ episodes, mangaid }) {
  const navigate = useNavigate();
  const handleClick = (id, mangaid, chapter, title) => {
    navigate(`/read/${mangaid}/${id}/${chapter}/${title}`);
  };
  return (
    <Drawer.Root>
      {console.log(episodes)}
      <Drawer.Trigger asChild>
        <Button
          mt={4}
          colorScheme="teal"
          size="md"
          w={10}
          // onClick={() => handleclick(manga?.id)}
        >
          <FaBookOpen />
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Episodes</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body w="90%">
              <HStack w="full" wrap={"wrap"}>
                {episodes?.map((episode) => (
                  <Button
                    onClick={() =>
                      handleClick(
                        episode.id,
                        mangaid,
                        episode.chapterNumber,
                        episode.title
                      )
                    }
                    w="45px"
                    key={episode?.id}
                  >
                    {episode?.chapterNumber}
                  </Button>
                ))}
              </HStack>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="md" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
