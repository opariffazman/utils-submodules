'use strict'
// @ts-check

/**
 * APIUtils Module
 * @module APIUtils
 */

/**
 * Returns a string that compiles the given error object into a readable error report.
 * @function
 * @name compileErrorReport
 * @param {object} error - The error object to compile.
 * @param {string} error.message - The error message.
 * @param {string} error.errorMessage - The error message (PlayFab-specific).
 * @param {object} error.errorDetails - The object containing error details.
 * @param {string} apiType - The type of API call (e.g., "PlayFab", "GameLift").
 * @returns {string} The compiled error report string.
 */
const compileErrorReport = (error, apiType) => {
  if (!error) return ''
  let { message, errorMessage, errorDetails } = error

  // Choose the appropriate message property based on apiType
  if (apiType === 'PlayFab' && errorMessage) {
    message = errorMessage
  }

  // Check if errorDetails is defined and not null
  if (!errorDetails || typeof errorDetails !== 'object') return message

  const details = Object.entries(errorDetails).flatMap(([paramName, messages]) => {
    return messages.map((msg) => `${paramName}: ${msg}`)
  })

  return `[${apiType} API Error] ${message}\n${details.join('\n')}`
}

/**
 * Handles API response by logging messages and resolving/rejecting the promise based on the response.
 * @function
 * @name handleApiResponse
 * @memberof module:APIUtils
 * @param {string} apiName - Name of the API being called.
 * @param {string} apiType - The type of API call (e.g., "PlayFab", "GameLift").
 * @param {function} resolve - Function to resolve the promise if API call is successful.
 * @param {function} reject - Function to reject the promise if API call fails.
 * @param {object} error - error object returned by the API call.
 * @param {object} result - result object returned by the API call.
 */
const handleApiResponse = (apiName, apiType, resolve, reject, error, result) => {
  switch (true) {
    case result !== null:
      console.log(`${apiName} API call successful`)
      resolve(result)
      break
    case error !== null:
      console.log(`${apiName} API call failed: ${compileErrorReport(error, apiType)}`)
      reject(error)
      break
    default:
      console.log(`${apiName} API call unxpected error: ${error}`)
      reject(error)
      break
  }
}

// Export the functions
module.exports = {
  compileErrorReport,
  handleApiResponse
}
