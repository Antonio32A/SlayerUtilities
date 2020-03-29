function scoreboardCheck() {
    return Scoreboard.getTitle().replace(/§./g, "") .startsWith("SKYBLOCK");
}

export { scoreboardCheck }