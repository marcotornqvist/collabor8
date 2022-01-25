import { UserInputError } from "apollo-server-express";
import { LooseObject } from "../types/Interfaces";

/*
  All of the functions below have almost the same type of functionallity,
  the regex is based on every single social media websites username rules.
  At the bottom there's a function called validateSocials
  that calls all the functions which is used in the SocialResolver
*/

let union: string | null | undefined;

interface IReturn {
  input: typeof union;
  error: string | undefined;
}

export const instagramValidator = (input: typeof union): IReturn => {
  input = input?.toLowerCase().replace(/ /g, ""); // sets input to lowercase and removes whitespace
  let error;

  const regex = new RegExp(/[a-z0-9._]{0,30}/);
  const match = input?.match(regex);
  // If input exists and if input matches with regex add error message
  if (input && !match?.includes(input)) {
    error =
      "Instagram username cannot be longer than 30 characters and can only contain letters(a-z), numbers, periods, and underscores";
  }

  return { input, error };
};

export const linkedinValidator = (input: typeof union): IReturn => {
  input = input?.toLowerCase().replace(/ /g, ""); // sets input to lowercase and removes whitespace
  let error;

  const regex = new RegExp(/[\w\-\_À-ÿ%]{0,128}/);
  const match = input?.match(regex);
  // If input exists and if input matches with regex add error message
  if (input && !match?.includes(input)) {
    error = "LinkedIn username is not correct";
  }

  return { input, error };
};

export const pinterestValidator = (input: typeof union): IReturn => {
  input = input?.replace(/ /g, ""); // removes whitespace
  let error;

  const regex = new RegExp(/[A-z0-9_]{0,30}/);
  const match = input?.match(regex);
  // If input exists and if input matches with regex add error message
  if (input && !match?.includes(input)) {
    error =
      "Pinterest username cannot be longer than 30 characters and can only contain letters(A-z), numbers and underscores";
  }

  return { input, error };
};

export const soundcloudValidator = (input: typeof union): IReturn => {
  input = input?.toLowerCase().replace(/ /g, ""); // sets input to lowercase and removes whitespace
  let error;

  const regex = new RegExp(/[a-z0-9_-]{0,128}/);
  const match = input?.match(regex);
  // If input exists and if input matches with regex add error message
  if (input && !match?.includes(input)) {
    error =
      "Soundcloud username cannot be longer than 128 characters and can only contain lowercase letters(a-z), numbers, underscores and dashes";
  }

  return { input, error };
};

export const mediumValidator = (input: typeof union): IReturn => {
  input = input?.toLowerCase().replace(/ /g, ""); // sets input to lowercase and removes whitespace
  let error;

  const regex = new RegExp(/[A-z0-9]{0,128}/);
  const match = input?.match(regex);
  // If input exists and if input matches with regex add error message
  if (input && !match?.includes(input)) {
    error =
      "Medium username cannot be longer than 128 characters and can only contain letters(A-z) and numbers";
  }

  return { input, error };
};

export const youtubeValidator = (input: typeof union): IReturn => {
  input = input?.replace(/ /g, ""); // removes whitespace
  let error;

  const regex = new RegExp(/[A-z0-9-\_]{0,128}/);
  const match = input?.match(regex);
  // If input exists and if input matches with regex add error message
  if (input && !match?.includes(input)) {
    error =
      "Youtube username cannot be longer than 128 characters and can only contain letters(A-z), numbers, underscores, dashes and backslashes";
  }

  return { input, error };
};

export const githubValidator = (input: typeof union): IReturn => {
  input = input?.replace(/ /g, ""); // removes whitespace
  let error;

  const regex = new RegExp(/[A-z0-9_-]{0,39}/);
  const match = input?.match(regex);
  // If input exists and if input matches with regex add error message
  if (input && !match?.includes(input)) {
    error =
      "Github username cannot be longer than 39 characters and can only contain letters(A-z), numbers, underscores and dashes";
  }

  return { input, error };
};

export const discordValidator = (input: typeof union): IReturn => {
  input = input?.replace(/ /g, ""); // removes whitespace
  let error;

  const regex = new RegExp(/[A-z0-9-\_]{0,128}/);
  const match = input?.match(regex);
  // If input exists and if input matches with regex add error message
  if (input && !match?.includes(input)) {
    error =
      "Discord username cannot be longer than 128 characters and can only contain letters(A-z), numbers, underscores, dashes and backslashes";
  }

  return { input, error };
};

// Works as the default validator for websites that don't have clear rules on username
export const usernameValidator = (
  input: typeof union,
  social?: string
): IReturn => {
  input = input?.replace(/ /g, ""); // removes whitespace
  let error;

1  // If input exists and if input matches with regex add error message
  if (input && input.length > 128) {
    error = `${social} username cannot be longer than 128 characters`;
  }

  return { input, error };
};

// Returns all socials, in case there was no errors
export const validateSocials = (
  instagram: typeof union,
  linkedin: typeof union,
  dribbble: typeof union,
  behance: typeof union,
  pinterest: typeof union,
  soundcloud: typeof union,
  spotify: typeof union,
  medium: typeof union,
  vimeo: typeof union,
  youtube: typeof union,
  github: typeof union,
  discord: typeof union
) => {
  let errors: LooseObject = {};

  // Variables that hold outputs from each different "validator" function
  const instagramValidated = instagramValidator(instagram);
  const linkedinValidated = linkedinValidator(linkedin);
  const dribbbleValidated = usernameValidator(dribbble, "Dribbble's");
  const behanceValidated = usernameValidator(behance, "Behance");
  const pinterestValidated = pinterestValidator(pinterest);
  const soundcloudValidated = soundcloudValidator(soundcloud);
  const spotifyValidated = usernameValidator(spotify, "Spotify");
  const mediumValidated = mediumValidator(medium);
  const vimeoValidated = usernameValidator(vimeo, "Vimeo");
  const youtubeValidated = youtubeValidator(youtube);
  const githubValidated = githubValidator(github);
  const discordValidated = usernameValidator(discord, "Discord");

  if (instagramValidated.error) {
    errors.instagram = instagramValidated.error;
  }

  if (linkedinValidated.error) {
    errors.linkedin = linkedinValidated.error;
  }

  if (dribbbleValidated.error) {
    errors.dribbble = dribbbleValidated.error;
  }

  if (behanceValidated.error) {
    errors.behance = behanceValidated.error;
  }

  if (pinterestValidated.error) {
    errors.pinterest = pinterestValidated.error;
  }

  if (soundcloudValidated.error) {
    errors.soundcloud = soundcloudValidated.error;
  }

  if (spotifyValidated.error) {
    errors.spotify = spotifyValidated.error;
  }

  if (mediumValidated.error) {
    errors.medium = mediumValidated.error;
  }

  if (vimeoValidated.error) {
    errors.vimeo = vimeoValidated.error;
  }

  if (youtubeValidated.error) {
    errors.youtube = youtubeValidated.error;
  }

  if (githubValidated.error) {
    errors.github = githubValidated.error;
  }

  if (discordValidated.error) {
    errors.discord = discordValidated.error;
  }

  if (Object.keys(errors).length > 0) {
    throw new UserInputError("Errors", { errors });
  }

  return {
    instagram: instagramValidated.input,
    linkedin: linkedinValidated.input,
    dribbble: dribbbleValidated.input,
    behance: behanceValidated.input,
    pinterest: pinterestValidated.input,
    soundcloud: soundcloudValidated.input,
    spotify: spotifyValidated.input,
    medium: mediumValidated.input,
    vimeo: vimeoValidated.input,
    youtube: youtubeValidated.input,
    github: githubValidated.input,
    discord: discordValidated.input,
  };
};
