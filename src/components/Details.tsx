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
import { isoCountries } from '../conf/countryCodes';
import { IArtists, IDetailsProp } from '../App';
import Description from './Description';

export default function Details({ details }: IDetailsProp) {
  function getCountryName(countryCode: string) {
    if (isoCountries.hasOwnProperty(countryCode)) {
      return isoCountries[countryCode];
    } else {
      return countryCode;
    }
  }

  console.log(details);

  return details ? (
    <div className="result-container">
      <Fade in={details ? true : false}>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          w={[300, 400, 560]}
          padding={10}
          textAlign="left"
        >
          <Stack spacing={8}>
            <Heading fontSize="xl">
              You searched for:{' '}
              {details.artists.map((a: IArtists) => `${a.name} `)} -{' '}
              {/* prettier has made this mess, not me ------------------^ */}
              {details.name}
            </Heading>
            {details.available_markets.length ? (
              <Text>
                It is available in {details.available_markets.length} following
                countries:
              </Text>
            ) : (
              <Text>This track is not available</Text>
            )}
            <List spacing={1}>
              {details.available_markets.map(code => (
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
  ) : (
    <Description />
  );
}
