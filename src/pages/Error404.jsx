import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
  rem,
  Center,
} from '@mantine/core';

const useStyles = createStyles(theme => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

function NotFoundTitle() {
  const { classes } = useStyles();

  return (
    <Container>
      <Center maw="50rem" h="50rem" mx="auto">
        <div>
          <div className={classes.label}>404</div>
          <Title className={classes.title}>
            You have found a secret place.
          </Title>
          <Text
            color="dimmed"
            size="lg"
            align="center"
            className={classes.description}
          >
            Unfortunately, this is only a 404 page. You may have mistyped the
            address, or the page has been moved to another URL.
          </Text>
          <Group position="center">
            <Button
              variant="outline"
              size="md"
              mt="xl"
              className={classes.control}
              type="button"
              component="a"
              target="_self"
              rel="next"
              href="/"
            >
              Get back to home page
            </Button>
          </Group>
        </div>
      </Center>
    </Container>
  );
}
export default NotFoundTitle;
