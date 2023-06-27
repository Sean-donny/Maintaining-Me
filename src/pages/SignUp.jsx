import {
  hasLength,
  isEmail,
  isInRange,
  isNotEmpty,
  matchesField,
  useForm,
} from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Stack,
  Loader,
  Center,
  Radio,
  NumberInput,
  Group,
} from '@mantine/core';
import { signUpController } from '../utils/auth';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { DatePickerInput } from '@mantine/dates';
import {
  IconCalendar,
  IconRuler2,
  IconScaleOutline,
} from '@tabler/icons-react';
import dayjs from 'dayjs';

export function SignUp() {
  const navigate = useNavigate();
  const { loading } = useAuth();

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      dob: new Date(),
      height: 0,
      startingWeight: 0,
      targetWeight: 0,
      gender: '',
    },

    validate: {
      name: isNotEmpty('Name can not be empty'),
      email: isEmail('Invalid email'),
      password: hasLength(
        { min: 8 },
        'Password must have at least 8 or more characters',
      ),
      confirmPassword: matchesField('password', 'Passwords are not the same'),
      dob: isNotEmpty('You gotta have a birthday'),
      height: isInRange(
        { min: 1, max: 1000 },
        'You need to input a real height',
      ),
      startingWeight: isInRange(
        { min: 1, max: 1000 },
        'You need to input a real weight',
      ),
      targetWeight: isInRange(
        { min: 1, max: 1000 },
        'You need to input a real weight',
      ),
      gender: isNotEmpty('You need to select a gender'),
    },
  });

  const handleSubmit = values => {
    const { confirmPassword, ...others } = values;
    signUpController(others, () => {
      navigate('/');
    });
  };

  if (loading) {
    return (
      <Center maw={400} h={500} mx="auto">
        <div>
          <Loader />
        </div>
      </Center>
    );
  }

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={theme => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Create an account!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" href="/login">
          Log in
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Name"
              placeholder="Brother Benard"
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Email"
              placeholder="you@hotmail.com"
              type="email"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label="Confirm password"
              placeholder="Re-enter your password"
              {...form.getInputProps('confirmPassword')}
            />
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
              label="Starting bodyweight"
              placeholder="60 kg"
              precision={1}
              min={10}
              step={0.5}
              max={1000}
              stepHoldDelay={500}
              stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
              icon={<IconScaleOutline size="1rem" />}
              mb="3px"
              {...form.getInputProps('startingWeight')}
            />
            <NumberInput
              label="Target bodyweight"
              placeholder="60 kg"
              precision={1}
              min={10}
              step={0.5}
              max={1000}
              stepHoldDelay={500}
              stepHoldInterval={t => Math.max(1000 / t ** 2, 25)}
              icon={<IconScaleOutline size="1rem" />}
              mb="3px"
              {...form.getInputProps('targetWeight')}
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
          <Button fullWidth mt="xl" type="submit">
            Sign up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default SignUp;
