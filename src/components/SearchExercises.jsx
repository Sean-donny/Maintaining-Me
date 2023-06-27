import React, { useEffect, useState } from 'react';
import {
  TextInput,
  ActionIcon,
  useMantineTheme,
  Container,
  Stack,
  Box,
  Title,
  Text,
} from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { exerciseOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from '../components/HorizontalScrollbar';

const SearchExercises = () => {
  const theme = useMantineTheme();
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        exerciseOptions,
      );

      setBodyParts([...bodyPartsData]);
    };

    fetchExercisesData();
  }, []);

  const handleSearch = () => {
    window.open(
      `https://www.youtube.com/results?search_query=${search}+exercises`,
    );
  };

  return (
    <div>
      <Title order={2} ta="center" mt="sm">
        Welcome to the Studio!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5} mb={50}>
        You can search exercises by name, or select a specific body part you
        want to work out.
      </Text>
      <Container size="xl" py="xl">
        <TextInput
          value={search}
          onChange={e => setSearch(e.target.value.toLowerCase())}
          icon={<IconSearch size="1.1rem" stroke={1.5} />}
          radius="xl"
          size="md"
          rightSection={
            <ActionIcon
              size={32}
              radius="xl"
              color={theme.primaryColor}
              variant="filled"
              title="Search for exercises"
              onClick={handleSearch}
            >
              <IconArrowRight size="1.1rem" stroke={1.5} />
            </ActionIcon>
          }
          placeholder="Search exercises"
          type="text"
          rightSectionWidth={42}
        />
      </Container>
      <Stack>
        <Box>
          <HorizontalScrollbar data={bodyParts} />
        </Box>
      </Stack>
    </div>
  );
};

export default SearchExercises;
