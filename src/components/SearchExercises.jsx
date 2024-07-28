import React, { useState } from 'react';
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
import HorizontalScrollbar from '../components/HorizontalScrollbar';
import { useUser } from '../hooks/useUser';

const SearchExercises = () => {
  const theme = useMantineTheme();
  const { user } = useUser();
  const [search, setSearch] = useState('');

  const userGender =
    user?.gender === 'male'
      ? 'For Men'
      : user?.gender === 'female'
      ? 'For Women'
      : '';

  const bodyParts = [
    'Full Body',
    'Upper Body',
    'Lower Body',
    'Cardio',
    'Arms',
    'Legs',
    'Chest',
    'Shoulders',
    'Biceps',
    'Triceps',
    'Forearms',
    'Traps',
    'Neck',
    'Abs',
    'Upper Back',
    'Lower Back',
    'Full Back',
    'Hips',
    'Quads',
    'Hamstrings',
    'Calves',
    'Glutes',
    'Obliques',
  ];

  const handleSearch = () => {
    let modifiedSearch = search;

    // Check if "exercise" or "exercises" is present in the search
    if (!/exercis(e|es)?/i.test(search)) {
      modifiedSearch += '+exercises';
    }

    modifiedSearch += ` ${userGender}`;

    // Open the YouTube search URL with the modified search
    window.open(
      `https://www.youtube.com/results?search_query=${modifiedSearch.toLowerCase()}`,
    );

    // Clear the search input
    setSearch('');
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      handleSearch();
    }
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
          onChange={e => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
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
