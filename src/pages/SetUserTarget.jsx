import React, { useEffect } from 'react';
import {
  createStyles,
  Container,
  Title,
  Button,
  Text,
  rem,
  NumberInput,
  Stack,
  Image,
} from '@mantine/core';
import { IconScaleOutline } from '@tabler/icons-react';
import TargetImage from '../assets/images/mm-sculpted-man.png';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { isInRange, useForm } from '@mantine/form';
import { setUserTargetController } from '../utils/controller';

const useStyles = createStyles(theme => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 0,
    paddingBottom: `calc(${theme.spacing.xl} * 4)`,
  },

  content: {
    maxWidth: rem(480),
    marginRight: `calc(${theme.spacing.xl} * 3)`,

    [theme.fn.smallerThan('md')]: {
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

  image: {
    flex: 1,
    justify: 'flex-end',
    align: 'center',

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },
}));

const SetUserTarget = () => {
  const { classes } = useStyles();
  const { user } = useUser();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      target: 0,
    },

    validate: {
      target: isInRange(
        { min: 1, max: 1000 },
        'You need to set a reasonable target',
      ),
    },
  });

  const handleSubmit = values => {
    setUserTargetController(values, user.id, () => {
      navigate('/');
    });
  };

  useEffect(() => {
    if (user?.weight.target) {
      form.setFieldValue('target', user.weight.target);
    }
  }, [user]);

  return (
    <Container>
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Set your goal! <br /> build a better you
          </Title>
          <Text color="dimmed" mt="md" mb="md">
            Select a target weigth, you aim better when you know where to hit
          </Text>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack spacing="xl" mb="lg">
              <NumberInput
                placeholder="70 kg"
                precision={1}
                min={0}
                step={0.5}
                max={1001}
                stepHoldDelay={500}
                stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
                icon={<IconScaleOutline size="1rem" />}
                {...form.getInputProps('target')}
              />
              <Button radius="sm" size="md" type="submit">
                Let's Go!
              </Button>
            </Stack>
          </form>
        </div>
        <Image
          className={classes.image}
          src={TargetImage}
          alt="target weight motive"
          min-width="240px"
          max-width="480px"
          fit="contain"
          ml="xl"
        />
      </div>
    </Container>
  );
};

export default SetUserTarget;
