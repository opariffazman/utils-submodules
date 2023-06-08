'use strict'
// @ts-check

/**
 * CommonUtils Module
 * @module CommonUtils
 */

const validateRequest = (context, argument) => {
  let errorResponse = 0
  if (context === void(0)) {
    errorResponse = 'Invalid Function Context'
  }

  if (argument === void(0)) {
    errorResponse = 'Invalid Function Argument'
  }

  return errorResponse
}

/**
 * Wait for specified amount of time.
 * @function
 * @name sleep
 * @memberof module:CommonUtils
 * @param {number} ms - Amount of millisecond.
 * @returns {Promise} A promise with timeout.
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

module.exports = {
  sleep
}