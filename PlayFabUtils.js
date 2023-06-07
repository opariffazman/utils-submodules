const { PlayFabAdmin, PlayFabServer, PlayFabAuthentication } = require('playfab-sdk')
const APIUtils = require('../Modules/APIUtils')

;('use strict')
// @ts-check

/**
 * PlayFabUtils Module
 * @module PlayFabUtils
 */

/**
 * Validated a client's session ticket, and if successful, returns details for that user.
 * @function
 * @name authenticateSessionTicket
 * @memberof module:PlayFabUtils
 * @param {string} sessionTicket - Session ticket as issued by a PlayFab client login API.
 * @returns {Promise<object>} A Promise that resolves with AuthenticateSessionTicketResult
 */
const authenticateSessionTicket = (sessionTicket) => {
  return new Promise((resolve, reject) => {
    const request = { SessionTicket: sessionTicket }

    PlayFabServer.AuthenticateSessionTicket(request, (error, result) => {
      APIUtils.handleApiResponse('authenticateSessionTicket', 'PlayFab', resolve, reject, error, result)
    })
  })
}

/**
 * Method to exchange a legacy AuthenticationTicket or title SecretKey for an Entity Token or to refresh a still valid EntityToken.
 * @function
 * @name getEntityToken
 * @memberof module:PlayFabUtils
 * @returns {Promise<object>} A Promise that resolves with GetEntityTokenResponse
 */
const getEntityToken = () => {
  return new Promise((resolve, reject) => {
    PlayFabAuthentication.GetEntityToken(null, (error, result) => {
      APIUtils.handleApiResponse('getEntityToken', 'PlayFab', resolve, reject, error, result)
    })
  })
}

/**
 * Method for a server to validate a client provided EntityToken. Only callable by the title entity.
 * @function
 * @name validateEntityToken
 * @memberof module:PlayFabUtils
 * @param {string} entityToken - Client EntityToken.
 * @returns {Promise<object>} A Promise that resolves with ValidateEntityTokenResponse
 */
const validateEntityToken = (entityToken) => {
  return new Promise((resolve, reject) => {
    const request = { EntityToken: entityToken }

    PlayFabAuthentication.ValidateEntityToken(request, (error, result) => {
      APIUtils.handleApiResponse('validateEntityToken', 'PlayFab', resolve, reject, error, result)
    })
  })
}

/**
 * Retrieves a list of ranked users for the given statistic, centered on the currently signed-in user.
 * @function
 * @name getLeaderboardAroundUser
 * @memberof module:PlayFabUtils
 * @param {string} playFabId - Unique PlayFab assigned ID of the user on whom the operation will be performed.
 * @param {string} statisticName - Unique identifier for the title-specific statistic for the leaderboard
 * @returns {Promise<object>} A Promise that resolves with the requested leaderboard or rejects with an error message.
 */
const getLeaderboardAroundUser = (playFabId, statisticName) => {
  return new Promise((resolve, reject) => {
    const request = {
      PlayFabId: playFabId,
      MaxResultsCount: 1,
      StatisticName: statisticName
    }

    PlayFabServer.GetLeaderboardAroundUser(request, (error, result) => {
      APIUtils.handleApiResponse('getLeaderboardAroundUser', 'PlayFab', resolve, reject, error, result)
    })
  })
}

/**
 * Retrieves the key-value store of custom title settings which can be read by the client.
 * @function
 * @name getTitleData
 * @memberof module:PlayFabUtils
 * @param {string|string[]} keys - Specific keys to search for in the title data (leave null to get all keys).
 * @returns {Promise<object>} A Promise that resolves with the title data of the specified keys or rejects with an error message.
 * @see {@link RewardMatchEnd}
 * @see {@link UpgradeItem}
 */
const getTitleData = (keys) => {
  return new Promise((resolve, reject) => {
    const request = {
      keys: Array.isArray(keys) ? keys : [keys]
    }

    PlayFabServer.GetTitleData(request, (error, result) => {
      APIUtils.handleApiResponse('getTitleData', 'PlayFab', resolve, reject, error, result)
    })
  })
}

/**
 * Returns the list of all defined virtual currencies for the title.
 * @function
 * @name listVirtualCurrencyTypes
 * @memberof module:PlayFabUtils
 * @returns {Promise<Array<{CurrencyCode:string, DisplayName:string, InitialDeposit:number, RechargeRate:number, RechargeMax:number}>>} A Promise that resolves with list of virtual currencies or rejects with an error message.
 */
const listVirtualCurrencyTypes = () => {
  return new Promise((resolve, reject) => {
    const request = {}
    PlayFabAdmin.ListVirtualCurrencyTypes(request, (error, result) => {
      APIUtils.handleApiResponse('listVirtualCurrencyTypes', 'PlayFab', resolve, reject, error, result)
    })
  })
}

/**
 * Increments the specified virtual currency by the stated amount.
 * @function
 * @name addUserVirtualCurrency
 * @memberof module:PlayFabUtils
 * @param {string} playFabId - PlayFab unique identifier of the user whose virtual currency balance is to be decreased.
 * @param {string} virtualCurrency - Name of the virtual currency according to list from GetMatchRewardInfo which is to be added.
 * @param {number} amount - amount to be added to the user balance of the specified virtual currency.
 * @returns {Promise<Array<{playFabId:string, virtualCurrency:string, BalanceChange:number, Balance:number}>>} A Promise that resolves with player currency information after deduction or rejects with an error message.
 */
const addUserVirtualCurrency = (playFabId, virtualCurrency, amount) => {
  return new Promise((resolve, reject) => {
    const request = {
      PlayFabId: playFabId,
      VirtualCurrency: virtualCurrency,
      Amount: amount
    }

    PlayFabServer.AddUserVirtualCurrency(request, (error, result) => {
      APIUtils.handleApiResponse(`addUserVirtualCurrency (${virtualCurrency})`, 'PlayFab', resolve, reject, error, result)
    })
  })
}

/**
 * Decrements the specified virtual currency by the stated amount.
 * @function
 * @name subtractUserVirtualCurrency
 * @memberof module:PlayFabUtils
 * @param {string} playFabId - PlayFab unique identifier of the user whose virtual currency balance is to be decreased.
 * @param {string} virtualCurrency - Name of the virtual currency according to list from GetVirtualCurrencies which is to be decremented.
 * @param {number} amount - amount to be subtracted from the user balance of the specified virtual currency.
 * @returns {Promise<Array<{playFabId:string, virtualCurrency:string, BalanceChange:number, Balance:number}>>} A Promise that resolves with player currency information after deduction or rejects with an error message.
 */
const subtractUserVirtualCurrency = (playFabId, virtualCurrency, amount) => {
  return new Promise((resolve, reject) => {
    const request = {
      PlayFabId: playFabId,
      VirtualCurrency: virtualCurrency,
      Amount: amount
    }

    PlayFabServer.SubtractUserVirtualCurrency(request, (error, result) => {
      APIUtils.handleApiResponse(`subtractUserVirtualCurrency (${virtualCurrency})`, 'PlayFab', resolve, reject, error, result)
    })
  })
}

/**
 * Updates the values of the specified title-specific statistics for the user.
 * @function
 * @name updatePlayerStatistics
 * @memberof module:PlayFabUtils
 * @param {string} playFabId - Unique PlayFab assigned ID of the user on whom the operation will be performed.
 * @param {string} statisticName - Unique name of the statistic
 * @param {number} value - Statistic value for the player
 * @returns {Promise<Array<{}>>} A Promise that resolves or rejects with an error message.
 */
const updatePlayerStatistics = (playFabId, statisticName, value) => {
  return new Promise((resolve, reject) => {
    const request = {
      PlayFabId: playFabId,
      Statistics: [
        {
          StatisticName: statisticName,
          Value: value
        }
      ]
    }

    PlayFabServer.UpdatePlayerStatistics(request, (error, result) => {
      APIUtils.handleApiResponse('updatePlayerStatistics', 'PlayFab', resolve, reject, error, result)
    })
  })
}

module.exports = {
  PlayFabAuthentication,
  PlayFabServer,
  authenticateSessionTicket,
  getEntityToken,
  validateEntityToken,
  getTitleData,
  getLeaderboardAroundUser,
  listVirtualCurrencyTypes,
  addUserVirtualCurrency,
  subtractUserVirtualCurrency,
  updatePlayerStatistics
}
