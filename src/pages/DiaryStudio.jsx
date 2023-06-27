import React, { useState, useEffect } from 'react';
import {
  Accordion,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Notification,
  NumberInput,
  Paper,
  Stack,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { IconDroplet, IconBolt, IconRun, IconCheck } from '@tabler/icons-react';
import { isInRange, useForm } from '@mantine/form';
import { useUser } from '../hooks/useUser';
import { diaryLogController } from '../utils/controller';

function DiaryStudio() {
  const { user } = useUser();
  const [notificationVisible, setNotificationVisibility] = useState(false);
  const [todayDone, setTodayDone] = useState(null);

  const diaryLogMessage = (
    <Notification
      mt={30}
      icon={<IconCheck size="1.2rem" />}
      color="teal"
      radius="md"
      title="Yayyy!🥳 Your day was logged into your diary"
      onClose={() => setNotificationVisibility(false)}
    >
      You're writing history as we know it, keep it up
    </Notification>
  );

  const form = useForm({
    initialValues: {
      foodIntake: '',
      calorieIntake: 0,
      waterIntake: 0,
      caloriesBurnt: 0,
    },
    validate: {
      calorieIntake: isInRange(
        { min: 0, max: 20000 },
        'You need to input a reasonable caloric intake',
      ),
      waterIntake: isInRange(
        { min: 0, max: 20 },
        'You need to input a reasonable water intake',
      ),
      caloriesBurnt: isInRange(
        { min: 0, max: 20000 },
        'You need to input a reasonable caloric value',
      ),
    },
  });

  useEffect(() => {
    if (user?.diaries) {
      const diaryDates = Object.keys(user.diaries).sort(
        (a, b) => Number(a) - Number(b),
      );
      if (diaryDates.length >= 1) {
        const lastDate = diaryDates[diaryDates.length - 1];

        const obj = user.diaries[lastDate];

        const formattedLastDate = new Date(obj.createdAt).toDateString();
        const formattedTodayDate = new Date().toDateString();

        if (formattedTodayDate === formattedLastDate) {
          form.setFieldValue('calorieIntake', obj.calorieIntake);
          form.setFieldValue('caloriesBurnt', obj.caloriesBurnt);
          form.setFieldValue('foodIntake', obj.foodIntake);
          form.setFieldValue('waterIntake', obj.waterIntake);

          setTodayDone(obj.createdAt);
        } else {
          setTodayDone(null);
        }
      }
    }
  }, [user]);
  const feedingPlaceholder =
    '8:00 Breakfast\nBaked beans on toast, with eggs & sausages (850 Kcal)\n\n14:00 Lunch\nSpaghetti with meatball (750 Kcal)\n\n20:00 Dinner\nChicken Salad (400 Kcal)\n\n20:45 Dessert\nGreek yoghurt with frozen berries (400 Kcal)\n\nExercises';

  const handleSubmit = values => {
    diaryLogController(
      values,
      user.id,
      () => {
        setNotificationVisibility(true);
      },
      todayDone,
    );
  };

  return (
    <div>
      <Container>
        <Title order={2} ta="center" mt="sm">
          Log your stats for today!
        </Title>
        <Paper withBorder p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Card>
              <Textarea
                label="Food intake / Exercises"
                description="Log in your feeding & exercises for the day"
                placeholder={feedingPlaceholder}
                autosize
                minRows={13}
                {...form.getInputProps('foodIntake')}
              />
            </Card>
            <Card>
              <NumberInput
                label="Total calorie intake"
                description="The total amount of calories you have eaten today"
                placeholder="2000 kcal"
                min={0}
                max={20000}
                step={100}
                stepHoldDelay={500}
                stepHoldInterval={t => Math.max(1000 / t ** 2, 100)}
                parser={value => value.replace(/$\s?|(,*)/g, '')}
                icon={<IconBolt size="1rem" />}
                {...form.getInputProps('calorieIntake')}
              />
            </Card>
            <Card>
              <NumberInput
                label="Total water intake"
                description="The total amount of water you drank today in Litres"
                placeholder="2 litres"
                precision={1}
                min={0}
                step={0.5}
                max={20}
                icon={<IconDroplet size="1rem" />}
                {...form.getInputProps('waterIntake')}
              />
            </Card>
            <Card>
              <NumberInput
                label="Total calories burnt"
                description="The total amount of calories you have burnt doing exercise"
                placeholder="200 kcal"
                min={0}
                max={20000}
                step={50}
                stepHoldDelay={500}
                stepHoldInterval={t => Math.max(1000 / t ** 2, 100)}
                parser={value => value.replace(/$\s?|(,*)/g, '')}
                icon={<IconRun size="1rem" />}
                {...form.getInputProps('caloriesBurnt')}
              />
            </Card>
            <Flex justify="center" align="center">
              <Box w={400}>
                <Button mt="xl" size="md" fullWidth type="submit">
                  Save
                </Button>
              </Box>
            </Flex>
          </form>
          {notificationVisible && diaryLogMessage}
        </Paper>
      </Container>
      <Container mt="xl" pt="xl">
        <Title order={3} ta="center" mt="sm">
          Look through your past logs
        </Title>
        <Paper withBorder p={30} mt={30} radius="md">
          <Accordion variant="separated" defaultValue="customization">
            {user !== null &&
              user.diaries &&
              Object.keys(user.diaries)
                .sort((a, b) => Number(a) - Number(b))
                .map(key => {
                  const obj = user.diaries[key];

                  const createdAt = new Intl.DateTimeFormat('en-GB', {
                    dateStyle: 'full',
                    timeStyle: 'short',
                  }).format(new Date(obj.createdAt));

                  return (
                    <Accordion.Item
                      key={obj.createdAt}
                      value={`${obj.createdAt}`}
                    >
                      <Accordion.Control>{createdAt}</Accordion.Control>
                      <Accordion.Panel>
                        <Stack>
                          <Textarea
                            value={obj.foodIntake}
                            label="Food intake / Exercises:"
                            readOnly
                            minRows={8}
                          />
                          <TextInput
                            label="Total calorie intake:"
                            readOnly
                            value={obj.calorieIntake}
                          />
                          <TextInput
                            label="Total water intake:"
                            readOnly
                            value={obj.waterIntake}
                          />
                          <TextInput
                            label="Total calories burnt:"
                            readOnly
                            value={obj.caloriesBurnt}
                          />
                        </Stack>
                      </Accordion.Panel>
                    </Accordion.Item>
                  );
                })}
          </Accordion>
        </Paper>
      </Container>
    </div>
  );
}

export default DiaryStudio;
