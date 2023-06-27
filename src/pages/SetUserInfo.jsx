import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  NumberInput,
  Paper,
  Radio,
  Stack,
  Title,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';
import {
  IconScaleOutline,
  IconRuler2,
  IconCalendar,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { isInRange, isNotEmpty, useForm } from '@mantine/form';
import { setUserInfoController } from '../utils/controller';
import { timestampToDate } from '../utils/helper';

const SetUserInfo = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      dob: new Date(),
      height: 0,
      currentWeightTarget: 0,
      gender: '',
    },

    validate: {
      dob: isNotEmpty('You gotta have a birthday'),
      height: isInRange(
        { min: 1, max: 1000 },
        'You need to input a real height',
      ),
      currentWeightTarget: isInRange(
        { min: 1, max: 1000 },
        'You need to input a real weight',
      ),
      gender: isNotEmpty('You need to select a gender'),
    },
  });

  const handleSubmit = values => {
    setUserInfoController(values, user.id, () => {
      navigate('/');
    });
  };

  useEffect(() => {
    if (user) {
      form.setFieldValue('dob', timestampToDate(user.dob));
      form.setFieldValue('height', user.height);
      form.setFieldValue('currentWeightTarget', user.weight.current);
      form.setFieldValue('gender', user.gender);
    }
  }, [user]);

  return (
    <Container size={500} my={40}>
      <Title
        align="center"
        sx={theme => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Log in your current stats!
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Stack spacing="xl" mb="lg">
            <DatePickerInput
              icon={<IconCalendar size="1.1rem" stroke={1.5} />}
              clearable
              valueFormat="DD/MM/YYYY"
              minDate={dayjs().subtract(150, 'year')}
              maxDate={new Date()}
              label="Date of birth"
              placeholder="Pick your birthday"
              {...form.getInputProps('dob')}
            />
            <NumberInput
              label="Height"
              placeholder="183 cm"
              min={40}
              max={500}
              step={1}
              stepHoldDelay={500}
              stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
              parser={value => value.replace(/$\s?|(,*)/g, '')}
              icon={<IconRuler2 size="1rem" />}
              {...form.getInputProps('height')}
            />
            <NumberInput
              label="Body weight"
              placeholder="2 kg"
              precision={1}
              min={10}
              step={0.5}
              max={1000}
              stepHoldDelay={500}
              stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
              icon={<IconScaleOutline size="1rem" />}
              mb="3px"
              {...form.getInputProps('currentWeightTarget')}
            />
            <Radio.Group
              name="favoriteFramework"
              label="Select your gender"
              {...form.getInputProps('gender')}
            >
              <Group mt="xs">
                <Radio value="male" label="Male" />
                <br />
                <Radio value="female" label="Female" />
                <br />
                <Radio value="unspecified" label="Unspecified" />
              </Group>
            </Radio.Group>
          </Stack>
          <Divider my="sm" />
          <Flex gap="md" justify={{ sm: 'center' }}>
            <Box w={400}>
              <Button mb="xl" size="md" mt="xl" fullWidth type="submit">
                Save
              </Button>
            </Box>
          </Flex>
        </Paper>
      </form>
    </Container>
  );
};

export default SetUserInfo;
