/* global fetch */
/* eslint-disable import/prefer-default-export, no-restricted-syntax, no-await-in-loop */
import 'isomorphic-unfetch';

/**
 * Fetch translation file(s).
 * @function getTranslation
 * @param {string} lang - Language to fetch.
 * @param {array} files - Translation files to fetch.
 * @param {string} baseUrl - Locale location.
 * @return {object} Fetched translation files.
 */
export async function getTranslation(lang, files, baseUrl) {
  const translation = {};

  for (const file of files) {
    const response = await fetch(`${baseUrl}${lang}/${file}.json`);
    translation[file] = await response.json();
  }

  return { [lang]: translation };
}
