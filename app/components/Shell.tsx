"use client";
import {
  ActionIcon,
  Button,
  Divider,
  Drawer,
  Group,
  SegmentedControl,
  Stack,
  Title,
  Image,
  Text,
  Paper,
  Avatar,
  Flex,
} from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import {
  IconAdjustments,
  IconCircleFilled,
  IconTriangleFilled,
  IconStarFilled,
  IconAdjustmentsCheck,
  IconBrandGithubFilled,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";

const HostelMap: any = {
  "1": (
    <Text size="md" c={"blue"}>
      Men's Hostel
    </Text>
  ),
  "2": (
    <Text size="md" c={"pink"}>
      Woman's Hostel
    </Text>
  ),
};
const MessMap: any = {
  "1": (
    <IconStarFilled
      className="border-2 border-spacing-2 border-amber-600"
      color="#d97706"
    />
  ),
  2: (
    <IconTriangleFilled
      className="border-2 border-spacing-2 border-red-600"
      color="#dc2626"
    />
  ),
  3: (
    <IconCircleFilled
      className="border-2 border-spacing-2 border-green-600"
      color="#16a34a"
    />
  ),
};
const Shell = ({ children }: { children: React.ReactNode }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const [hostel, setHostel] = useLocalStorage({
    key: "hostel",
  });
  const [mess, setMess] = useLocalStorage({ key: "mess" });
  const [firstTime, setFirstTime] = useLocalStorage({
    key: "firstTime",
    defaultValue: true,
  });
  return (
    <>
      <Group justify="space-between" m={"md"}>
        <Title order={2}>MessWeb</Title>
        <Group gap={"xs"}>
          {HostelMap[hostel]}
          {MessMap[mess]}

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
      </Group>
      <Divider my="md" />
      <Drawer
        opened={opened || firstTime}
        onClose={close}
        title="Prefrences"
        position="bottom"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        {
          <Stack>
            <Group justify="center" grow>
              <SegmentedControl
                onChange={setHostel}
                value={hostel}
                p={"sm"}
                data={[
                  {
                    value: "1",
                    label: (
                      <Stack gap={0}>
                        <Image src={"man.svg"}></Image>
                        <Title order={4}>Men's Hostel</Title>
                      </Stack>
                    ),
                  },
                  {
                    value: "2",
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
                onChange={setMess}
                value={mess}
                data={[
                  {
                    value: "3",
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
                    value: "2",
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
                    value: "1",
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
              onClick={() => {
                close();
                queryClient.invalidateQueries();
                setFirstTime(false);
              }}
            >
              Save Prefrences
            </Button>
          </Stack>
        }
      </Drawer>
      {children}
      <Divider my={'md'}/>
      <Paper px={"sm"} pb={'xs'}>
        <Stack gap={0}>
          <Group justify="center" align="center" gap={"xs"}>
            <Text>Built by</Text>
            <Flex
              gap={0}
              bg={"gray"}
              px={"sm"}
              py={2}
              justify={"center"}
              align={"center"}
              style={{ borderRadius: "80px" }}
              onClick={()=>{
                window.open('https://bento.me/sachinsankar','_blank')
              }}
            >
              <Avatar
                radius="xl"
                src={"https://avatars.githubusercontent.com/u/73470743"}
              ></Avatar>
              <Text>Sachin Sankar</Text>
            </Flex>
          </Group>
          <Group justify="center" align="center" gap={"xs"}>
            <Text>Fully Open Source. Source Code available in </Text>
            <ActionIcon
              variant="default"
              size="lg"
              radius="xl"
              aria-label="Settings"
              onClick={()=>{
                window.open('https://github.com/sachin-sankar/messweb','_blank')
              }}
            >
              <IconBrandGithubFilled
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Stack>
      </Paper>
    </>
  );
};

export default Shell;
