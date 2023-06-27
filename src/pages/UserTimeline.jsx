import React from 'react';
import {
  createStyles,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Image,
  rem,
  Box,
  BackgroundImage,
} from '@mantine/core';

const useStyles = createStyles(theme => ({
  paper1: {
    minWidth: '10em',
    textAlign: 'center',
    alignSelf: 'baseline',

    [theme.fn.smallerThan('xs')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },
  paper2: {
    maxWidth: rem(480),
    alignSelf: 'end',

    [theme.fn.smallerThan('xs')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },
  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
    },
  },

  container: {
    backgroundImage: "url('./mm-sisyphus.png')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '45%',
  },

  image: {
    flex: 1,
    justify: 'flex-end',
    align: 'center',

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
}));

const UserTimeline = () => {
  const { classes } = useStyles();
  return (
    <Container size="xl" className={classes.container}>
      <Group spacing="lg" position="apart" mih={480}>
        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          className={classes.paper1}
        >
          <Title className={classes.title}>You have the power!</Title>
        </Paper>
        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          className={classes.paper2}
        >
          <Text>
            For healthy weight loss, you should aim for a steady weight loss
            rate of 1-2 lbs per week according to the British Nutrition
            Foundation, which is achieved by maintaining a{' '}
            <Text span fw={500}>
              Caloric deficit.
            </Text>{' '}
            <Text mt={10}>
              This can be done by{' '}
              <Text span fw={500}>
                expending more calories than you consume daily
              </Text>{' '}
              , either by increasing energy spent doing physical activities, or
              reducing the amount of calories in the food you consume.{' '}
            </Text>{' '}
          </Text>
          <Text mt={10}>
            By making the choice to switch to a healthier feeding style, you can
            eat more, feel fuller, and have consumed a total of less calories.
          </Text>
          <Button
            mt="xl"
            radius="sm"
            size="md"
            type="submit"
            component="a"
            target="_self"
            rel="next"
            href="/"
          >
            Continue
          </Button>
        </Paper>
      </Group>
    </Container>
  );
};

export default UserTimeline;
