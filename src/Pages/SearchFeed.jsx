import { Center, Heading, Skeleton, Stack } from "@chakra-ui/react";
import { MANGA } from "@consumet/extensions";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
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
    setData({});
    getData();
  }, [searchterm]);
  return (
    <Stack mt={10} w={"full"}>
      {data?.results?.length ? (
        <Stack p={4} direction={"row"} justify={"space-between"}>
          <Heading size={"2xl"}>Search Results For {searchterm} </Heading>
        </Stack>
      ) : (
        <Skeleton p={4} height="10" width="70%" />
      )}
      <Center w={"full"}>
        <MangaList data={data} />
      </Center>
    </Stack>
  );
}
