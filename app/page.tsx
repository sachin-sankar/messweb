"use client";
import { Carousel } from "@mantine/carousel";
import {
  ActionIcon,
  Button,
  Divider,
  Drawer,
  Group,
  Image,
  LoadingOverlay,
  SegmentedControl,
  Stack,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconAdjustments,
  IconAdjustmentsCheck,
  IconCircleFilled,
  IconStarFilled,
  IconTriangleFilled,
} from "@tabler/icons-react";
import MenuCard from "./components/MenuCard";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["getMenu"],
    queryFn: () => fetch("/api?hostel=1&mess=1").then((resp) => resp.json()),
  });
  return (
    <main>
      <Group justify="space-between" m={"md"}>
        <Title order={2}>MessWeb</Title>
        <ActionIcon
          variant="light"
          size="lg"
          aria-label="Settings"
          onClick={open}
        >
          <IconAdjustments
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
          />
        </ActionIcon>
      </Group>
      <Divider my="md" />
      <Drawer
        opened={opened}
        onClose={close}
        title="Prefrences"
        position="bottom"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        {
          <Stack>
            <Group justify="center" grow>
              <SegmentedControl
                p={"sm"}
                data={[
                  {
                    value: "men",
                    label: (
                      <Stack gap={0}>
                        <Image src={"man.svg"}></Image>
                        <Title order={4}>Men's Hostel</Title>
                      </Stack>
                    ),
                  },
                  {
                    value: "woman",
                    label: (
                      <Stack gap={0}>
                        <Image src={"woman.svg"}></Image>
                        <Title order={4}>Woman's Hostel</Title>
                      </Stack>
                    ),
                  },
                ]}
              />
            </Group>
            <Group justify="center" grow>
              <SegmentedControl
                data={[
                  {
                    value: "veg",
                    label: (
                      <Group justify="center" align="center">
                        <IconCircleFilled
                          className="border-2 border-spacing-2 border-green-600"
                          color="#16a34a"
                        />
                        <Title order={5}>Veg</Title>
                      </Group>
                    ),
                  },
                  {
                    value: "nonveg",
                    label: (
                      <Group justify="center" align="center">
                        <IconTriangleFilled
                          className="border-2 border-spacing-2 border-red-600"
                          color="#dc2626"
                        />
                        <Title order={6}>Non Veg</Title>
                      </Group>
                    ),
                  },
                  {
                    value: "special",
                    label: (
                      <Group justify="center" align="center">
                        <IconStarFilled
                          className="border-2 border-spacing-2 border-amber-600"
                          color="#d97706"
                        />
                        <Title order={6}>Special</Title>
                      </Group>
                    ),
                  },
                ]}
              />
            </Group>
            <Button
              fullWidth
              rightSection={<IconAdjustmentsCheck />}
              onClick={close}
            >
              Save Prefrences
            </Button>
          </Stack>
        }
      </Drawer>
      <LoadingOverlay
        visible={isLoading}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "blue", type: "bars" }}
      />
      <Carousel slideSize="85%" slideGap="xs" align={"center"}>
        {isLoading
          ? ""
          : data["menu"].map((menuDay: any) => {
              return (
                <Carousel.Slide>
                  <MenuCard date={menuDay["date"]} menu={menuDay["menu"]} />
                </Carousel.Slide>
              );
            })}
      </Carousel>
      
    </main>
  );
}
