import { Center, Loader } from '@mantine/core';
import React from 'react';

const LoadingPage = () => {
  return (
    <Center maw={400} h={500} mx="auto">
      <div>
        <Loader />
      </div>
    </Center>
  );
};

export default LoadingPage;
