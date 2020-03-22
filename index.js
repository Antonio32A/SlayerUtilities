import MaddoxBatphone from "./features/maddox-batphone";

const Maddox = new MaddoxBatphone();

register("chat", Maddox.autoOpen).setChatCriteria("${message}");
