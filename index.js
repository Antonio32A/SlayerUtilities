import MaddoxBatphone from "./features/maddox-batphone";
import SlayerTracker from "./features/slayer-tracker/tracker.js";
import SlayerTrackerGUI from "./features/slayer-tracker/gui.js";
import { selector } from "./features/slayer-tracker/selector.js";

const Maddox = new MaddoxBatphone();
register("chat", Maddox.autoOpen.bind(Maddox)).setChatCriteria("${message}");

const Tracker = new SlayerTracker();
const TrackerGUI = new SlayerTrackerGUI();
register("chat", Tracker.trackStats.bind(Tracker)).setChatCriteria("${message}");
register("renderOverlay", TrackerGUI.displaySlayerStats.bind(TrackerGUI));
register("command", selector.open.bind(selector)).setName("selectslayer");
