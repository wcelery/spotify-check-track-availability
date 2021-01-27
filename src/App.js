import React, { useState } from 'react';
import { ChakraProvider, Box, VStack, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import SpotifyWebApi from 'spotify-web-api-js';
import Form from './components/Form';
import Details from './components/Details';

function App() {
  const [trackId, setTrackId] = useState();
  const [details, setDetails] = useState();

  React.useEffect(() => {
    requestToken();
  }, []);

  let s = new SpotifyWebApi();

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

  s.getTrack(trackId).then(
    /* data => setDetails(data),
    err => console.error(err) */
    function (data) {
      console.log(data);
    },
    function (err) {
      console.log(err);
    }
  );

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <h1>test</h1>
            <Form setTrackId={setTrackId} />
            <Details data={details} />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
