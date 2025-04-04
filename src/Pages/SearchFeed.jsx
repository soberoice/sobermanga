import {
  Box,
  Card,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MANGA } from "@consumet/extensions";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import MangaList from "../components/MangaList";

export default function SearchFeed() {
  const [data, setData] = useState();
  const { searchterm } = useParams();
  const getData = async () => {
    const mangadex = new MANGA.MangaDex();
    const result = await mangadex.search(`${searchterm}`);
    setData(result);
  };
  useEffect(() => {
    getData();
  }, [searchterm]);
  return (
    <Stack mt={10}>
      {data?.results?.length && (
        <Stack p={4} direction={"row"} justify={"space-between"}>
          <Heading size={"2xl"}>Search Results For {searchterm} </Heading>
        </Stack>
      )}
      <Center w={"100%"}>
        <MangaList data={data} width={"170px"} size={"90%"} />
      </Center>
    </Stack>
  );
}
