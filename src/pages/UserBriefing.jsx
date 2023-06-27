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
} from '@mantine/core';
import TargetImage from '../assets/images/mm-stone-tablet.png';

const useStyles = createStyles(theme => ({
  paper: {
    marginLeft: `calc(${theme.spacing.xl} * 3)`,
    alignSelf: 'start',

    [theme.fn.smallerThan('xs')]: {
      maxWidth: '100%',
      marginRight: 0,
      marginLeft: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 800,

    [theme.fn.smallerThan('xs')]: {
      fontSize: rem(28),
    },
  },

  image: {
    flex: 1,
    justify: 'flex-end',

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
}));

const UserBriefing = () => {
  const { classes } = useStyles();
  return (
    <Container size="md" mb={40}>
      <Group spacing="lg" grow>
        <Image
          className={classes.image}
          src={TargetImage}
          alt="target weight motive"
          width="85%"
          height="85%"
          fit="contain"
        />
        <Paper
          withBorder
          shadow="md"
          p={30}
          radius="md"
          className={classes.paper}
        >
          <Title
            mb={30}
            className={classes.title}
            variant="gradient"
            gradient={{ from: 'orange', to: 'brown', deg: 45 }}
          >
            Keep a record
          </Title>
          <Text>
            Making a daily log in your{' '}
            <Text span fw={500}>
              Diary
            </Text>{' '}
            helps you build good habits. It's like a story in the history books,
            but this time you get to write your own amazing story. About how you
            set goals for yourself and how achieved them.
          </Text>
          <Text mt={10}>
            When you keep a record, you can take a look into your past, there
            you can see all your daily accounts, that way you never forget what
            you did on that one Tuesday, where you went that one place, to do
            that one thing...
          </Text>
          <Button
            mt={40}
            radius="sm"
            size="md"
            type="submit"
            component="a"
            target="_self"
            rel="next"
            href="/usertimeline"
          >
            Continue
          </Button>
        </Paper>
      </Group>
    </Container>
  );
};

export default UserBriefing;
