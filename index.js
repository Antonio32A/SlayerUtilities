import MaddoxBatphone from "./features/maddox-batphone.js";
import SlayerTracker from "./features/slayer-tracker/tracker.js";
import SlayerTrackerGUI from "./features/slayer-tracker/gui.js";
import { commandHandler } from "./commands/index.js";
import { selector } from "./features/slayer-tracker/selector.js";
import { scoreboardCheck } from "./utils/scoreboardCheck.js";

const Maddox = new MaddoxBatphone();
register("chat", Maddox.autoOpen.bind(Maddox)).setChatCriteria("${message}");

const Tracker = new SlayerTracker();
const TrackerGUI = new SlayerTrackerGUI();
register("chat", Tracker.trackStats.bind(Tracker)).setChatCriteria("${message}");
register("renderOverlay", function() {
	if (scoreboardCheck()) {
		TrackerGUI.displaySlayerStats();
	}
});
register("command", function() {
	if (scoreboardCheck()) {
		selector.open();
	} else {
		ChatLib.chat("&6[SlayerUtils] &cPlease join Hypixel Skyblock to use this.");
	}
}).setName("selectslayer");

register("command", commandHandler).setName("sb");
