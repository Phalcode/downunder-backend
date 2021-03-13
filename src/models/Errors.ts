export enum Errors {
  ERR_MAX_PLAYERS = "The maximum amount of players has been reached.",
  ERR_SAME_USERNAME = "Somebody in this session is already using this username.",
  ERR_USERNAME_TOO_SHORT = "The username needs to be at least 3 characters long.",
  ERR_NOT_YOUR_TURN = "It is not your turn.",
  ERR_LOST = "You can not take part in this session anymore because you lost the game.",
  ERR_SESSION_STILL_ONGOING = "The session is not over. You can not reset it until there is a Winner.",
  ERR_SESSION_ALREADY_STARTED = "The players in this session already began to play.",
  ERR_SESSION_NOT_FOUND = "This session could not be found.",
  ERR_PLAYER_NOT_FOUND = "This player could not be found.",
  ERR_CARD_NOT_FOUND = "This card could not be found.",
  ERR_ALONE = "You can not play when you're alone.",
}
