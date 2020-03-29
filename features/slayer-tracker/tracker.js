import PVObject from "PersistentData";

const data = new PVObject("SlayerUtilities", {
    slayer: "wolf",
    trackerX: 5,
    trackerY: 5,
    key: "",
    batphone: true,
    wolf: {
        totalXP: 0,
        bossesSlain: 0,
        hamsterWheel: 0,
        spiritRune: 0,
        enchantedBook: 0,
        redClawEgg: 0,
        coutureRune: 0,
        grizzlyBait: 0,
        overfluxCapacitor: 0
    },
    spider: {
        totalXP: 0,
        bossesSlain: 0,
        toxicArrow: 0,
        biteRune: 0,
        catalyst: 0,
        enchantedBook: 0,
        flySwatter: 0,
        tarantulaTalisman: 0,
        digestedMosquito: 0
    },
    zombie: {
        totalXP: 0,
        bossesSlain: 0,
        foulFlesh: 0,
        pestilenceRune: 0,
        undeadCatalyst: 0,
        enchantedBook: 0,
        beheadedHorror: 0,
        revenantCatalyst: 0,
        snakeRune: 0,
        scytheBlade: 0
    }
});

export { data }

export default class SlayerTracker {
    constructor() {
        this.data = data;
    }

    onWolfSlayerComplete() {
        var name = Scoreboard.getLineByIndex(3).getName();
        this.data.wolf.bossesSlain += 1;

        if (name.includes("IV")) {
            this.data.wolf.totalXP += 500;
        } else if (name.includes("III")) {
            this.data.wolf.totalXP += 100;
        } else if (name.includes("II")) {
            this.data.wolf.totalXP += 25;
        } else if (name.includes("I")) {
            this.data.wolf.totalXP += 5;
        }
    }

    onSpiderSlayerComplete() {
        var name = Scoreboard.getLineByIndex(3).getName();
        this.data.spider.bossesSlain += 1;

        if (name.includes("IV")) {
            this.data.spider.totalXP += 500;
        } else if (name.includes("III")) {
            this.data.spider.totalXP += 100;
        } else if (name.includes("II")) {
            this.data.spider.totalXP += 25;
        } else if (name.includes("I")) {
            this.data.spider.totalXP += 5;
        }
    }

    onZombieSlayerComplete() {
        var name = Scoreboard.getLineByIndex(3).getName();
        this.data.zombie.bossesSlain += 1;

        if (name.includes("IV")) {
            this.data.zombie.totalXP += 500;
        } else if (name.includes("III")) {
            this.data.zombie.totalXP += 100;
        } else if (name.includes("II")) {
            this.data.zombie.totalXP += 25;
        } else if (name.includes("I")) {
            this.data.zombie.totalXP += 5;
        }
    }

    trackStats(message, event) {
        if (Scoreboard.getLines().length <= 3) {
            return;
        }
        if (message.includes(":")) {
            return;
        }
        if (message.includes("Talk to Maddox to claim your Wolf Slayer XP!") && Scoreboard.getLineByIndex(3).getName().includes("Sven")) {
            this.onWolfSlayerComplete();
        }
        if (message.includes("Talk to Maddox to claim your Spider Slayer XP!") && Scoreboard.getLineByIndex(3).getName().includes("Tarantula")) {
            this.onSpiderSlayerComplete();
        }
        if (message.includes("Talk to Maddox to claim your Zombie Slayer XP!") && Scoreboard.getLineByIndex(3).getName().includes("Revenant")) {
            this.onZombieSlayerComplete();
        }

        if (Scoreboard.getLineByIndex(3).getName().includes("Sven")) {
            if (message.includes("RARE DROP!")) {
                if (message.includes("Hamster Wheel")) {
                    this.data.wolf.hamsterWheel += 1;
                } else if (message.includes("Spirit Rune")) {
                    this.data.wolf.spiritRune += 1;
                } else if (message.includes("Enchanted Book")) {
                    this.data.wolf.enchantedBook += 1;
                } else if (message.includes("Red Claw Egg")) {
                    this.data.wolf.redClawEgg += 1;
                } else if (message.includes("Couture Rune")) {
                    this.data.wolf.coutureRune += 1;
                } else if (message.includes("Grizzly Bait")) {
                    this.data.wolf.grizzlyBait += 1;
                } else if (message.includes("Overflux Capacitor")) {
                    this.data.wolf.overfluxCapacitor += 1;
                }
            }
        } else if (Scoreboard.getLineByIndex(3).getName().includes("Tarantula")) {
            if (message.includes("RARE DROP!")) {
                if (message.includes("Toxic Arrow")) {
                    this.data.spider.toxicArrow += 1;
                } else if (message.includes("Bite Rune")) {
                    this.data.spider.biteRune += 1;
                } else if (message.includes("Enchanted Book")) {
                    this.data.spider.enchantedBook += 1;
                } else if (message.includes("Spider Catalyst")) {
                    this.data.spider.catalst += 1;
                } else if (message.includes("Fly Swatter")) {
                    this.data.spider.flySwatter += 1;
                } else if (message.includes("Tarantula Talisman")) {
                    this.data.spider.tarantulaTalisman += 1;
                } else if (message.includes("Digested Mosquito")) {
                    this.data.spider.digestedMosquito += 1;
                }
            }
        } else if (Scoreboard.getLineByIndex(3).getName().includes("Revenant")) {
            if (message.includes("RARE DROP!")) {
                if (message.includes("Foul Flesh")) {
                    this.data.zombie.foulFlesh += 1;
                } else if (message.includes("Pestilence Rune")) {
                    this.data.zombie.pestilenceRune += 1;
                } else if (message.includes("Enchanted Book")) {
                    this.data.zombie.enchantedBook += 1;
                } else if (message.includes("Undead Catalyst")) {
                    this.data.zombie.undeadCatalyst += 1;
                } else if (message.includes("Revenant Catalyst")) {
                    this.data.zombie.revenantCatalyst += 1;
                } else if (message.includes("Beheaded Horror")) {
                    this.data.zombie.beheadedHorror += 1;
                } else if (message.includes("Snake Rune")) {
                    this.data.zombie.snakeRune += 1;
                } else if (message.includes("Scythe Blade")) {
                    this.data.zombie.scytheBlade += 1;
                }
            }
        }
    }
}
