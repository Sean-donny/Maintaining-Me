import React, { useEffect, useState } from 'react';
import {
  createStyles,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  Group,
  RingProgress,
  Paper,
  TypographyStylesProvider,
  Notification,
} from '@mantine/core';
import {
  IconNotebook,
  IconAward,
  IconRun,
  IconCheck,
} from '@tabler/icons-react';
import { useUser } from '../hooks/useUser';
import { userProgressGenerator } from '../utils/helper';
import { useNavigate } from 'react-router-dom';

const dashData = [
  {
    title: 'Food/Exercise Diary',
    description: 'Log in your daily food, water & exercise intake',
    icon: IconNotebook,
    href: '/diarystudio',
  },
  {
    title: 'Awards',
    description: 'Take a look at all your achievements',
    icon: IconAward,
    href: '/awardstudio',
  },
  {
    title: 'Exercise Studio',
    description: 'Hit a workout',
    icon: IconRun,
    href: '/exercisestudio',
  },
];

const useStyles = createStyles(theme => ({
  title: {
    fontSize: rem(34),
    fontWeight: 900,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(24),
    },
  },

  description: {
    maxWidth: 600,
    margin: 'auto',

    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  card: {
    border: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.blue[1],
    },
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: theme.fn.primaryColor(),
      width: rem(45),
      height: rem(2),
      marginTop: theme.spacing.sm,
    },
  },
}));

function Dashboard() {
  const { user } = useUser();
  const [userProgress, setUserProgress] = useState(0);
  const [notificationVisible, setNotificationVisibility] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserProgress(
        userProgressGenerator(user?.weight, () => {
          setNotificationVisibility(true);
        }),
      );
    }
  }, [user]);
  const userSuccessMessage = (
    <Notification
      mt={30}
      icon={<IconCheck size="1.2rem" />}
      color="teal"
      radius="md"
      title="Yayyy!🥳 You met your target!"
      onClose={() => setNotificationVisibility(false)}
    >
      You worked hard & it paid off! This is one for the history books, keep up
      the good work.
    </Notification>
  );

  const { classes, theme } = useStyles();
  const features = dashData.map(feature => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
      component="a"
      onClick={() => navigate(`${feature.href}`)}
    >
      <feature.icon size={rem(50)} stroke={2} color={theme.fn.primaryColor()} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        Welcome back {user?.name}!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Group spacing="xs">
          <RingProgress
            sections={[
              {
                value: userProgress,
                color: userProgress === 100 ? 'teal' : 'blue',
              },
            ]}
            label={
              <Text
                color={userProgress === 100 ? 'teal' : 'blue'}
                weight={700}
                align="center"
                size="xl"
              >
                {userProgress}%
              </Text>
            }
          />
          <TypographyStylesProvider>
            <b>
              <u>Your progress</u>
            </b>
            <br />
            Starting weight: {user?.weight.starting}kg
            <br />
            Current weight: {user?.weight.current}kg
            <br />
            Goal weight: {user?.weight.target}kg
          </TypographyStylesProvider>
        </Group>
        {notificationVisible && userSuccessMessage}
      </Paper>
      <SimpleGrid
        cols={3}
        spacing="xl"
        mt={50}
        breakpoints={[{ maxWidth: 'md', cols: 1 }]}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}

export default Dashboard;
