import React from 'react';
import { Box, Heading, Text, Stack } from '@chakra-ui/react';
import { isoCountries } from '../countryCodes';

export default function Details({ data }) {
  function getCountryName(countryCode) {
    if (isoCountries.hasOwnProperty(countryCode)) {
      return isoCountries[countryCode];
    } else {
      return countryCode;
    }
  }

  return data ? (
    <div className="result-container">
      <Box
        borderWidth="1px"
        borderRadius="lg"
        w="3xl"
        padding={10}
        textAlign="left"
      >
        <Stack spacing={8}>
          <Heading fontSize="xl">
            You searched for: {data.artists.map(a => a.name)} - {data.name}
          </Heading>
          <Text>
            It is available in following countries:
            {data.available_markets.map(code => ` ${getCountryName(code)},`)}
          </Text>
        </Stack>
      </Box>
    </div>
  ) : null;
}
