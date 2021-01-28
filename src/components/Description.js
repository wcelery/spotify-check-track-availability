import React from 'react';
import { Box, Container } from '@chakra-ui/react';

export default function Description() {
  return (
    <Box w="2xl" borderWidth="1px" borderRadius="lg">
      <Container centerContent p={3} textAlign="center" fontSize="m">
        This small app is searching for track in Spotify API and displays
        information about countries, where this track is available.
      </Container>
    </Box>
  );
}