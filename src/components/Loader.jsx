import React from 'react';
import { Stack } from '@mantine/core';

const Loader = () => (
  <Stack maw={400} h={500} mx="auto">
    <div>
      <Loader />
    </div>
  </Stack>
);

export default Loader;
