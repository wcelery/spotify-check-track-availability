import React from 'react';
import {
  Fade,
  Box,
  Heading,
  Text,
  Stack,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { VscDebugStackframeDot } from 'react-icons/vsc';
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
      <Fade in={data}>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          w="3xl"
          padding={10}
          textAlign="left"
        >
          <Stack spacing={8}>
            <Heading fontSize="xl">
              You searched for: {data.artists.map(a => `${a.name} `)} -{' '}
              {/* prettier was made this mess, not me ------------------^ */}
              {data.name}
            </Heading>
            {data.available_markets.length ? (
              <Text>
                It is available in {data.available_markets.length} following
                countries:
              </Text>
            ) : (
              <Text>It is not available</Text>
            )}
            <List spacing={1}>
              {data.available_markets.map(code => (
                <ListItem key={uuidv4()} fontSize="16px">
                  <ListIcon as={VscDebugStackframeDot} color="green.200" />
                  {getCountryName(code)}
                </ListItem>
              ))}
            </List>
          </Stack>
        </Box>
      </Fade>
    </div>
  ) : null;
}
