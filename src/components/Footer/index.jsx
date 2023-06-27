import { createStyles, Container, rem, Text } from '@mantine/core';

const useStyles = createStyles(theme => ({
  footer: {
    marginTop: rem(120),
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },
}));

function FooterSimple() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text align="center" color="dimmed" size="sm">
          &#169; 2023 MaintainingMe
        </Text>
      </Container>
    </div>
  );
}

export default FooterSimple;
