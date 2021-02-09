import React, { useState } from 'react';
import {
  ChakraProvider,
  extendTheme,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
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
  const [isError, setError] = useState(false);

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
        Authorization: `Basic ${process.env.REACT_APP_SECRET_TOKEN}`,
      },
      body: 'grant_type=client_credentials',
    };

    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      s.setAccessToken(data.access_token);
    } else {
      setError(response.status);
    }

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
            {isError ? (
              <Alert w={[300, 400, 560]} status="error">
                <AlertIcon />
                <AlertTitle fontSize="md" mr={2}>
                  An error has occured!
                </AlertTitle>
                <AlertDescription fontSize="md">
                  Error code: {isError}
                </AlertDescription>
                <CloseButton
                  onClick={() => setError('')}
                  position="absolute"
                  right="8px"
                  top="8px"
                />
              </Alert>
            ) : null}
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
