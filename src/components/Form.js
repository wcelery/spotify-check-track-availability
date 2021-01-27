import React from 'react';
import { useForm } from 'react-hook-form';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';

export default function Form({ setTrackId }) {
  const { handleSubmit, errors, register, formState } = useForm();

  const onSubmit = data => {
    const trackId = data.field.slice(14);
    setTrackId(trackId);
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
        <Input name="field" ref={register({ validate: validateInput })} />
        <FormErrorMessage>
          {errors.field && errors.field.message}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit" size="md" isLoading={formState.isSubmitting}>
        Search
      </Button>
    </form>
  );
}
