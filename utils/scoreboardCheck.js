function scoreboardCheck() {
    return Scoreboard.getTitle().replace(/§./g, "") === "SKYBLOCK";
}

export { scoreboardCheck }