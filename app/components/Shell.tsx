import {
  ActionIcon,
  Button,
  Divider,
  Drawer,
  Group,
  SegmentedControl,
  Stack,
  Title,
  Image
} from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import {
  IconAdjustments,
  IconCircleFilled,
  IconTriangleFilled,
  IconStarFilled,
  IconAdjustmentsCheck,
} from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const Shell = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const [opened, { open, close }] = useDisclosure(false);
    const queryClient = useQueryClient()
    const [hostel,setHostel] = useLocalStorage({key:'hostel',defaultValue:'1'})
    const [mess,setMess] = useLocalStorage({key:'mess',defaultValue:'1'})
  return (
    <>
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
              onChange={setHostel}
              value={hostel}
                p={"sm"}
                data={[
                  {
                    value: '1',
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
              onClick={()=>{
                close()
                queryClient.invalidateQueries()
              }}
            >
              Save Prefrences
            </Button>
          </Stack>
        }
      </Drawer>
      {children}
    </>
  );
};

export default Shell;
