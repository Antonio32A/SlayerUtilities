import { data } from "./tracker.js";

export default class SlayerTrackerGUI {
    constructor() {
        this.x = data.trackerX;
        this.y = data.trackerY;
        this.timer = 0;
        this.rainbow = 0;
        this.backgroundColor = Renderer.color(0, 0, 0, 100);

        register("tick", () => {
            this.timer++;
            if (this.timer % 200 === 0) {
                this.rainbow++;
            }
        });
    }

    prettyNumber(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    draw(name, value, color) {
        new Text(name, this.x, this.y).setColor(color).draw();
        new Text(this.prettyNumber(Number(value)), this.x+105, this.y).setColor(Renderer.getRainbow(this.rainbow)).draw();
        this.y += 9;
    }

    displaySlayerStats() {
        this.y = data.trackerY;
        if (data.slayer === "wolf") {
            Renderer.drawRect(this.backgroundColor, 0, 0, Renderer.getStringWidth(this.prettyNumber(data.wolf.totalXP))+114, 89);
            this.draw("Total XP:", data.wolf.totalXP, Renderer.RED);
            this.draw("Svens Slain:", data.wolf.bossesSlain, Renderer.GREEN);
            this.draw("Hamster Wheel:", data.wolf.hamsterWheel, Renderer.BLUE);
            this.draw("Spirit Rune:", data.wolf.spiritRune, Renderer.AQUA);
            this.draw("Critical VI:", data.wolf.enchantedBook, Renderer.DARK_PURPLE);
            this.draw("Red Claw Egg:", data.wolf.redClawEgg, Renderer.LIGHT_PURPLE);
            this.draw("Couture Rune:", data.wolf.coutureRune, Renderer.LIGHT_PURPLE);
            this.draw("Grizzly Bait:", data.wolf.grizzlyBait, Renderer.LIGHT_PURPLE);
            this.draw("Overflux Capacitor", data.wolf.overfluxCapacitor, Renderer.LIGHT_PURPLE);

        } else if (data.slayer === "spider") {
            Renderer.drawRect(this.backgroundColor, 0, 0, Renderer.getStringWidth(this.prettyNumber(data.spider.totalXP))+114, 89);
            this.draw("Total XP:", data.spider.totalXP, Renderer.RED);
            this.draw("Tarantulas Slain:", data.spider.bossesSlain, Renderer.GREEN);
            this.draw("Toxic Arrow:", data.spider.toxicArrow, Renderer.BLUE);
            this.draw("Bite Rune:", data.spider.biteRune, Renderer.AQUA);
            this.draw("Spider Catalyst:", data.spider.catalyst, Renderer.DARK_PURPLE);
            this.draw("Bane VI:", data.spider.enchantedBook, Renderer.DARK_PURPLE);
            this.draw("Fly Swatter:", data.spider.flySwatter, Renderer.LIGHT_PURPLE);
            this.draw("Tarantula Talisman:", data.spider.tarantulaTalisman, Renderer.LIGHT_PURPLE);
            this.draw("Digested Mosquito:", data.spider.digestedMosquito, Renderer.LIGHT_PURPLE);

        } else if (data.slayer === "zombie") {
            Renderer.drawRect(this.backgroundColor, 0, 0, Renderer.getStringWidth(this.prettyNumber(data.spider.totalXP))+114, 98);
            this.draw("Total XP:", data.zombie.totalXP, Renderer.RED);
            this.draw("Revenants Slain:", data.zombie.bossesSlain, Renderer.GREEN);
            this.draw("Foul Flesh:", data.zombie.foulFlesh, Renderer.BLUE);
            this.draw("Pestilence Rune:", data.zombie.pestilenceRune, Renderer.AQUA);
            this.draw("Undead Catalyst:", data.zombie.undeadCatalyst, Renderer.DARK_PURPLE);
            this.draw("Smite VI:", data.zombie.enchantedBook, Renderer.DARK_PURPLE);
            this.draw("Revenant Catalyst", data.zombie.revenantCatalyst, Renderer.DARK_PURPLE);
            this.draw("Beheaded Horror:", data.zombie.beheadedHorror, Renderer.LIGHT_PURPLE);
            this.draw("Snake Rune", data.zombie.snakeRune, Renderer.LIGHT_PURPLE);
            this.draw("Scythe Blade", data.zombie.scytheBlade, Renderer.LIGHT_PURPLE);
        }
    }
}
