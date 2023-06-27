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
  Center,
  Loader,
} from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { signInController } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function Login() {
  const navigate = useNavigate();
  const { loading } = useAuth();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: isEmail('Invalid email'),
      password: isNotEmpty('Password required'),
    },
  });

  const handleSubmit = values => {
    signInController(values, () => {
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
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{' '}
        <Anchor size="sm" href="/signup">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
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
          </Stack>
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
export default Login;
