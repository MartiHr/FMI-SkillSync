export const calculateTime = (createdAt) => {
    let dateNowSeconds = Date.now() / 1000;
    let createdSeconds = createdAt?.seconds;
    let resSeconds = Math.floor(dateNowSeconds - createdSeconds);

    if (resSeconds < 60) {
        return `${resSeconds}s`;
    }

    let resMin = Math.floor(resSeconds / 60);

    if (resMin < 60) {
        return `${resMin}m`;
    }

    let resHours = Math.floor(resMin / 60);

    if (resHours < 24) {
        return `${resHours}h`;
    }

    let resDays = Math.floor(resHours / 24);

    if (resDays < 365) {
        return `${resDays}d`;
    }

    let resYears = Math.floor(resDays / 365);

    return `${resYears}y`;

}