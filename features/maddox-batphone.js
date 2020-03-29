import { data } from "./slayer-tracker/tracker.js";

export default class MaddoxBatphone {
    autoOpen(message, event) {
        if (!data.batphone) {
            return;
        }
        const message = new Message(event);
        const parts = message.getMessageParts();
        parts.forEach(part => {
            if (part.getText().includes("§l[OPEN MENU]")) {
                var command = part.getClickValue().substring(1); //remove the first character since it's a /
                ChatLib.command(command);
            }
        });
    }
}
