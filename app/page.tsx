"use client";
import { Carousel } from "@mantine/carousel";
import MenuCard from "./components/MenuCard";
import { useQuery } from "@tanstack/react-query";
import Shell from "./components/Shell";
import { Center, Loader, Paper, Stack, Text, Title } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconChefHatOff } from "@tabler/icons-react";

export default function Home() {
  const [hostel, setHostel] = useLocalStorage({
    key: "hostel",
    defaultValue: "1",
  });
  const [mess, setMess] = useLocalStorage({ key: "mess", defaultValue: "1" });
  const { data, isError, isFetching } = useQuery({
    queryKey: ["getMenu"],
    queryFn: () =>
      fetch(`/api?hostel=${hostel}&mess=${mess}`).then((resp) => resp.json()),
  });
  let date = new Date();
  if (isFetching) {
    return (
      <Shell>
        <Center style={{ height: "80vh" }}>
          <Loader color="blue" size="xl" type="bars" />
        </Center>
      </Shell>
    );
  } else {
    return (
      <Shell>
        {data["menu"] == undefined ? (
          <Paper className="w-full h-full">
            <Center>
              <Stack align="center" gap={"lg"} my={"xl"} p={"xl"}>
                <IconChefHatOff size={100} />
                <Stack align="center" gap={"xs"}>
                  <Title order={2}>No Menu Available</Title>
                  <Text c="dimmed" ta={"center"} size="xs">
                    Its takes 2-3 days for the menu to be updated at the start
                    of every month.
                  </Text>
                </Stack>
              </Stack>
            </Center>
          </Paper>
        ) : (
          <Carousel
            slideSize="85%"
            slideGap="xs"
            align={"center"}
            initialSlide={date.getDate() - 1}
          >
            {data["menu"].map((menuDay: any) => {
              if (menuDay) {
                return (
                  <Carousel.Slide>
                    <MenuCard date={menuDay["date"]} menu={menuDay["menu"]} />
                  </Carousel.Slide>
                );
              }
            })}
          </Carousel>
        )}
      </Shell>
    );
  }
}
