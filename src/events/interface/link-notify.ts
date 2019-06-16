export function getUserLink(username: string) { return `/user/${username}` }
export function getChannelSettingsLink(username: string) { return `/user/${username}` } // /channel` }
export function getPremiumSettingsLink(username: string) { return `/user/${username}/premium` }
export function getChannelLink(username: string) { return `/stream/${username}` }

export function getTeamLink(teamId: string) { return `/teams/${teamId}` }
export function getTeamPlayersLink(teamId: string) { return `/teams/${teamId}/participants` }

export function getCupsLink() { return `/cups` }
export function getCupLink(cupUrl: string) { return `/cups/${cupUrl}` }
export function getMatchLink(cupUrl: string, matchId: number) { return `/cups/${cupUrl}/match-page/${matchId}` }
