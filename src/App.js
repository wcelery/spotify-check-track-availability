import React, { useState } from 'react';
import {
  ChakraProvider,
  extendTheme,
  Box,
  VStack,
  Grid,
  Heading,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import SpotifyWebApi from 'spotify-web-api-js';
import { themeConf } from './conf/themeConf';
import Form from './components/Form';
import Details from './components/Details';

function App() {
  const [details, setDetails] = useState();

  React.useEffect(() => {
    requestToken(); // eslint-disable-next-line
  }, []);

  let s = new SpotifyWebApi();

  const theme = extendTheme(themeConf);

  async function requestToken() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic MzdkN2U0YzZlZDdkNDFkMjhmZjdjMDdjMzM0MzI2NTk6ZDE1NTliYWZhYmQ3NDBiZmEwMDgwMzBiZWJmMmUwMzM=',
      },
      body: 'grant_type=client_credentials',
    };

    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      requestOptions
    );
    const data = await response.json();
    s.setAccessToken(data.access_token);
    return;
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="left" fontSize="xl">
        <Flex>
          <Box p="2" m={6}>
            <Heading size="md">Check Track Availability</Heading>
          </Box>
          <Spacer />
          <Box m={6}>
            <ColorModeSwitcher justifySelf="flex-end" />
          </Box>
        </Flex>
        <Grid minH="80vh" p={3}>
          <VStack spacing={8}>
            <Form setDetails={setDetails} />
            <Details data={details} />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
