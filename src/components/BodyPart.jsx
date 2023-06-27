import React from 'react';
import { createStyles, rem, Stack, Text } from '@mantine/core';

const useStyles = createStyles(theme => ({
  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
    fontSize: rem(18),
  },
}));

const BodyPart = ({ item }) => {
  const { classes } = useStyles();

  return (
    <Stack>
      <Text className={classes.category} size="xs">
        {' '}
        {item}
      </Text>
    </Stack>
  );
};

export default BodyPart;
