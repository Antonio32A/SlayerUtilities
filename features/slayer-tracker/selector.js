import RingSelector from "RingSelector";
import { data } from "./tracker.js";

const selector = new RingSelector({
    items: [{
            name: "&cWolf Packmaster",
            callback: (_, gui) => {
                gui.close();
                data.slayer = "wolf";
            }
        },
        {
            name: "&bTarantula Broodfather",
            callback: (_, gui) => {
                gui.close();
                data.slayer = "spider";
            }
        },
        {
            name: "&aRevenant Horror",
            callback: (_, gui) => {
                gui.close();
                data.slayer = "zombie";
            }
        }
    ],
    innerRadius: Renderer.screen.getHeight() / 15,
    outerRadius: Renderer.screen.getHeight() / 3,
    bgColor: Renderer.color(50, 50, 50, 200),
    lineSepColor: Renderer.color(150, 150, 150, 150)
});

export { selector }
