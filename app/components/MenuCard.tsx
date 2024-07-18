import { Card, Group, List, Stack, Text, Title } from "@mantine/core";
import { IconClock, IconClock2 } from "@tabler/icons-react";
import React from "react";

const MenuCard = () => {
  return (
    <Card withBorder>
      <Card.Section withBorder p={"md"}>
        <Stack gap={0}>
          <Title order={1}>Breakfast</Title>
          <Text c={"blue"}>
            <Group gap={5} align="center">
              <IconClock />
              7:00 AM - 9:15 AM
            </Group>
          </Text>
        </Stack>
      </Card.Section>
      <Card.Section>
        <List size="lg" withPadding>
          <List.Item>Clone or download repository from GitHub</List.Item>
          <List.Item>Install dependencies with yarn</List.Item>
          <List.Item>
            To start development server run npm start command
          </List.Item>
          <List.Item>
            Run tests to make sure your changes do not break the build
          </List.Item>
          <List.Item>Submit a pull request once you are done</List.Item>
        </List>
      </Card.Section>
    </Card>
  );
};

export default MenuCard;
