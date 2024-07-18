"use client";
import { Carousel } from "@mantine/carousel";
import MenuCard from "./components/MenuCard";
import { useQuery } from "@tanstack/react-query";
import Shell from "./components/Shell";
import { Center, Loader } from "@mantine/core";

export default function Home() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["getMenu"],
    queryFn: () => fetch("/api?hostel=1&mess=1").then((resp) => resp.json()),
  });
  let date = new Date();
  if (isLoading) {
    return (
      <Shell>
        <Center style={{height:'80vh'}}><Loader color="blue" size="xl" type="bars" /></Center>
      </Shell>
    );
  } else {
    return (
      <Shell>
        <Carousel
          slideSize="85%"
          slideGap="xs"
          align={"center"}
          initialSlide={date.getDate() - 1}
        >
          {data["menu"].map((menuDay: any) => {
            return (
              <Carousel.Slide>
                <MenuCard date={menuDay["date"]} menu={menuDay["menu"]} />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </Shell>
    );
  }
}
