import React from 'react';
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  HStack,
} from '@chakra-ui/react';
import SpotifyWebApi from 'spotify-web-api-js';

export default function Form({ setDetails }) {
  const { handleSubmit, errors, register, formState, reset } = useForm();

  let s = new SpotifyWebApi();

  const onSubmit = data => {
    const trackId = data.field.slice(14);
    s.getTrack(trackId).then(
      data => setDetails(data),
      err => console.error(err)
    );
    reset();
  };

  function validateInput(value) {
    if (!value) {
      return 'you must enter a spotify link';
    } else if (!value.includes('spotify:')) {
      return 'link must be Spotify URI';
    } else return true;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.field}>
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
    </form>
  );
}
