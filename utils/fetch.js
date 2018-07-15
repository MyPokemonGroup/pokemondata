const fetch = require("node-fetch");

/**
 * Asynchronous helper function to call fetch()
 * *** USED FOR callFetch() ***
 * @param {string} url
 * @returns {json | error} json if fetch() is successful, error otherwise
 */
async function asyncCall(url) {
  let response = await fetch(url);
  if (response.ok) return await response.json();
  throw new Error(response.statusText);
}

/**
 * Asynchronous wrapper over fetch() that properly handles errors
 * @param {string} url
 * @returns {json | error} json if fetch() is successful, error otherwise
 */
async function callFetch(url) {
  try {
    return await asyncCall(url);
  } catch (err) {
    console.error("error", err);
    throw new Error(err);
  }
}

module.exports = {
  callFetch
};
