import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  HStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
import SpotifyWebApi from 'spotify-web-api-js';
import { TSetDetails } from '../App';

export default function Form({ setDetails }: TSetDetails) {
  const { handleSubmit, errors, register, formState, reset } = useForm();
  const [error, setError] = useState();

  let s = new SpotifyWebApi();

  const onSubmit = (data: { field: string }) => {
    const trackId = data.field.slice(14);
    s.getTrack(trackId).then(
      data => setDetails(data),
      err => {
        const errData = JSON.parse(err.response);
        setError(errData.error);
      }
    );
    reset();
  };

  function validateInput(value: string) {
    if (!value) {
      return 'you must enter a spotify link';
    } else if (!value.includes('spotify:')) {
      return 'link must be Spotify URI';
    } else return true;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.field} pb={2}>
        <FormLabel htmlFor="field">
          Enter a Spotify URI link of track you searching for
        </FormLabel>
        <HStack>
          <Input name="field" ref={register({ validate: validateInput })} />
          <Button
            type="submit"
            size="md"
            colorScheme="teal"
            isLoading={formState.isSubmitting}
          >
            Search
          </Button>
        </HStack>
        <FormErrorMessage>
          {errors.field && errors.field.message}
        </FormErrorMessage>
      </FormControl>
      {error ? (
        <Alert w={[300, 400, 560]} status="error">
          <AlertIcon />
          <AlertTitle fontSize="md" mr={2}>
            An error has occured!
          </AlertTitle>
          <AlertDescription fontSize="md">
            {error.status}: {error.message}
          </AlertDescription>
          <CloseButton
            onClick={() => setError('')}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      ) : null}
    </form>
  );
}
