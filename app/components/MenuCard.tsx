import {
  Badge,
  Card,
  Grid,
  Group,
  List,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconClock, IconClock2 } from "@tabler/icons-react";
import React from "react";

const Times = [
  { label: "Breakfast", timeing: "7 - 9AM" },
  { label: "Lunch", timeing: "12:30 - 2:30PM" },
  { label: "Snacks", timeing: "4:30 - 6PM" },
  { label: "Dinner", timeing: "7 - 9PM" },
];

const DayColor:any = {
  monday: "blue",
  tuesday: "cyan",
  wednesday: "teal",
  thursday: "green",
  friday: "lime",
  saturday: "yellow",
  sunday: "orange",
};

const MenuCard = ({date,menu}:{date:string,menu:Array<{type:number,menu:string}>}) => {
  let dateObj = new Date(date)
  const month = dateObj.toLocaleString('default', { month: 'long' })
  const day = dateObj.toLocaleString('default', { weekday: 'long' })
  return (
    <Card withBorder style={{'height':'100%'}}>
      <Card.Section withBorder p={"sm"}>
        <Group justify="space-between" align="center">
          <Text size="xl" fw={700}>{month} {dateObj.getDate()}</Text>
          <Badge color={DayColor[day.toLowerCase()]} size="lg">
            {day}
          </Badge>
        </Group>
      </Card.Section>
      {menu.map((time, index) => {
        let timeData = Times[time.type -1]
        return (
          <Card.Section withBorder p={"sm"} key={index}>
            <Stack gap={0}>
              <Title order={1}>{timeData.label}</Title>
              <Text c={"blue"}>
                <Group gap={5} align="center">
                  <IconClock />
                  {timeData.timeing}
                </Group>
              </Text>
            </Stack>
            <Text mt={'md'}>{time.menu}</Text>
          </Card.Section>
        );
      })}
    </Card>
  );
};

export default MenuCard;
