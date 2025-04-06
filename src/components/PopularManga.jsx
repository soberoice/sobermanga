import { MANGA } from "@consumet/extensions";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {
  Box,
  Button,
  Heading,
  IconButton,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaBookOpen, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router";

// Custom arrows
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      position="absolute"
      right="10px"
      top="90%"
      transform="translateY(-50%)"
      zIndex="2"
      colorScheme="teal"
      aria-label="Next"
    >
      <FaChevronRight />
    </IconButton>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      position="absolute"
      right="70px"
      top="90%"
      transform="translateY(-50%)"
      zIndex="2"
      colorScheme="teal"
      aria-label="Previous"
    >
      <FaChevronLeft />
    </IconButton>
  );
};

export default function PopularManga() {
  const [data, setData] = useState();
  const navigat = useNavigate();
  const handleclick = (id) => {
    navigat(`/manga/${id}`);
  };
  const getData = async () => {
    // Define the proxy configuration
    const proxyConfig = "https://corsproxy-psi.vercel.app/api/proxy?url=";

    // Create a new MangaDex instance with the proxyConfig
    const mangadex = new MANGA.MangaDex(proxyConfig);

    try {
      // Fetch popular manga using the proxy
      const result = await mangadex.fetchPopular(1, 5); // You can adjust the page/limit as needed
      setData(result);
    } catch (error) {
      console.error("Error fetching manga:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <Box
      w="full"
      maxW="full"
      mx="auto"
      overflow="visible"
      pb={10}
      position="relative"
    >
      {console.log(data)}

      {data ? (
        <Slider {...settings}>
          {data?.results?.map((manga) => (
            <Stack
              flexDir={"row"}
              key={manga?.id}
              bgImage={manga?.image}
              h={"500px"}
              position="relative"
              w={"full"}
            >
              <Image
                src={manga?.image}
                alt={manga?.title}
                h="500px"
                w={"full"}
                zIndex="-1"
                position="relative"
              />
              <Box
                w="100%"
                color="white"
                flexDir="column"
                mt={"-200px"}
                px={4}
                zIndex="1"
                bgGradient="to-t"
                gradientFrom="black"
                gradientTo="transparent"
              >
                <Heading truncate w="50%" fontSize="2xl">
                  {manga?.title}
                </Heading>
                <Text lineClamp={3} w="50%" fontSize="lg" mt={2}>
                  {manga?.description}...
                </Text>
                <Button
                  mt={4}
                  colorScheme="teal"
                  size="lg"
                  onClick={() => handleclick(manga?.id)}
                >
                  <FaBookOpen />
                  Read now
                </Button>
              </Box>
            </Stack>
          ))}
        </Slider>
      ) : (
        <Skeleton height="500px" width="100%" />
      )}
    </Box>
  );
}
