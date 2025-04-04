import { MANGA } from "@consumet/extensions";
import React, { useEffect, useState } from "react";
import PopularManga from "../components/PopularManga";
import PopularMangaList from "../components/PopularMangaList";
import { Box, Heading, Stack } from "@chakra-ui/react";
import RecentlyAdded from "../components/RecentlyAdded";
import Navbar from "../components/Navbar";
import MangaList from "../components/MangaList";
import { Link } from "react-router";

export default function HomePage() {
  const [data, setData] = useState();
  const getData = async () => {
    const mangadex = new MANGA.MangaDex();
    const result = await mangadex.fetchPopular(2, 20);
    setData(result);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <PopularManga />
      <Stack w={"full"} direction={"row"}>
        <Box w="70%">
          <PopularMangaList />
          {data?.results?.length && (
            <Stack p={4} direction={"row"} justify={"space-between"}>
              <Heading size={"2xl"}>More Popular </Heading>
              <Link>More</Link>
            </Stack>
          )}
          <MangaList data={data} width={"200px"} size={"full"} />
        </Box>
        <Box w={"30%"}>
          <RecentlyAdded />
        </Box>
      </Stack>
    </div>
  );
}
