const { GameLiftClient, CreatePlayerSessionCommand, CreateGameSessionCommand, CreateGameSessionQueueCommand, DescribeGameSessionsCommand } = require('@aws-sdk/client-gamelift')
const APIUtils = require('./APIUtils')

;('use strict')
// @ts-check

/**
 * GameLiftUtils Module
 * @module GameLiftUtils
 */

/**
 * @typedef {Object} AWSCredentials
 * @property {string} accessKeyId - The AWS access key ID.
 * @property {string} secretAccessKey - The AWS secret access key.
 */

/**
 * @typedef {Object} GameLiftClientOptions
 * @property {string} region - The AWS region for the GameLift client.
 * @property {AWSCredentials} credentials - The AWS credentials for the GameLift client.
 */

/**
 * @typedef {Object} PlayerSessions
 */

/**
 * Reserves an open player slot in a game session for a player.
 * @function
 * @name createPlayerSession
 * @memberof module:GameLiftUtils
 * @param {GameLiftClientOptions} client - GameLift client with specified region & credentials
 * @param {string} playerId - Id or Ids of Player PlayFabId
 * @param {string} gameSessionId - Full gamelift session Id including region & fleet info eg: arn*
 * @returns {PlayerSessions} A PlayerSessions object is returned with a player session ID.
 */
const createPlayerSession = (client, playerId, gameSessionId) => {
  return new Promise((resolve, reject) => {
    const request = {
      PlayerId: playerId,
      GameSessionId: gameSessionId
    }

    const command = new CreatePlayerSessionCommand(request)

    client
      .send(command)
      .then((response) => {
        const result = response['PlayerSession']
        APIUtils.handleApiResponse('createPlayerSession', 'GameLift', resolve, reject, null, result)
      })
      .catch((error) => {
        APIUtils.handleApiResponse('createPlayerSession', 'GameLift', resolve, reject, error, null)
      })
  })
}

/**
 * @typedef {Object} GameProperty
 * @property {string} Key - The key of the game property.
 * @property {string} Value - The value of the game property.
 */

/**
 * @typedef {Array<GameProperty>} GamePropertyList - List of game properties.
 */

/**
 * @typedef {Object} GameSession
 */

/**
 * Creates a multiplayer game session for players in a specific fleet location.
 * @function
 * @name createGameSession
 * @memberof module:GameLiftUtils
 * @param {GameLiftClientOptions} client - GameLift client with specified region & credentials
 * @param {string} aliasId - GameLift alias id
 * @param {number} maximumPlayerSessionCount - Full gamelift session Id including region & fleet info eg: arn*
 * @param {GameProperty} gameProperties - Custom game properties including information of map level, game modes etc
 * @returns {GameSession} A GameSession object is returned containing the game session configuration and status.
 */
const createGameSession = (client, aliasId, maximumPlayerSessionCount, gameProperties) => {
  return new Promise((resolve, reject) => {
    const request = {
      AliasId: aliasId,
      MaximumPlayerSessionCount: maximumPlayerSessionCount,
      GameProperties: gameProperties
    }

    const command = new CreateGameSessionCommand(request)

    client
      .send(command)
      .then((response) => {
        const result = response['GameSession']
        APIUtils.handleApiResponse('createGameSession', 'GameLift', resolve, reject, null, result)
      })
      .catch((error) => {
        APIUtils.handleApiResponse('createGameSession', 'GameLift', resolve, reject, error, null)
      })
  })
}

/**
 * @typedef {Object} GameSessionQueue
 */

/**
 * Creates a game session queue.
 * @function
 * @name createGameSessionQueue
 * @memberof module:GameLiftUtils
 * @param {GameLiftClientOptions} client - GameLift client with specified region & credentials
 * @param {string} name - Name of the game session queue
 * @param {string[]} destinations - Array of fleet locations where game sessions can be created
 * @returns {GameSessionQueue} A GameSessionQueue object is returned with an assigned queue ARN.
 */
const createGameSessionQueue = (client, name, destinations) => {
  return new Promise((resolve, reject) => {
    const request = {
      Name: name,
      Destinations: destinations
    }

    const command = new CreateGameSessionQueueCommand(request)

    client
      .send(command)
      .then((response) => {
        const result = response['GameSessionQueue']
        resolve(result)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * Retrieve a specific game session
 * @function
 * @name describeGameSession
 * @memberof module:GameLiftUtils
 * @param {GameLiftClientOptions} client - GameLift client with specified region & credentials
 * @param {string} gameSessionId - ID of the game session to describe
 * @returns {GameSession} A GameSession object is returned for each game session that matches the request.
 */
const describeGameSession = (client, gameSessionId) => {
  return new Promise((resolve, reject) => {
    const request = {
      GameSessionId: gameSessionId
    }

    const command = new DescribeGameSessionsCommand(request)

    client
      .send(command)
      .then((response) => {
        const result = response['GameSessions'][0]
        APIUtils.handleApiResponse('describeGameSession', 'GameLift', resolve, reject, null, result)
      })
      .catch((error) => {
        APIUtils.handleApiResponse('describeGameSession', 'GameLift', resolve, reject, error, null)
      })
  })
}

/**
 * Retrieve game sessions from an aliasId with a status filter
 * @function
 * @name describeGameSessions
 * @memberof module:GameLiftUtils
 * @param {GameLiftClientOptions} client - GameLift client with specified region & credentials
 * @param {string} aliasId - ID of the fleet alias to describe
 * @returns {GameSession} A GameSession object is returned for each game session that matches the request.
 */
const describeGameSessions = (client, aliasId, statusFilter) => {
  return new Promise((resolve, reject) => {
    const request = {
      AliasId: aliasId,
      StatusFilter: statusFilter
    }

    const command = new DescribeGameSessionsCommand(request)

    client
      .send(command)
      .then((response) => {
        const result = response['GameSessions']
        APIUtils.handleApiResponse('describeGameSessions', 'GameLift', resolve, reject, null, result)
      })
      .catch((error) => {
        APIUtils.handleApiResponse('describeGameSessions', 'GameLift', resolve, reject, error, null)
      })
  })
}

module.exports = {
  GameLiftClient,
  createPlayerSession,
  createGameSession,
  createGameSessionQueue,
  describeGameSession,
  describeGameSessions
}
