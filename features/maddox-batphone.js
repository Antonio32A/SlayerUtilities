export default class MaddoxBatphone {
    autoOpen(message, event) {
        const message = new Message(event);
        const parts = message.getMessageParts();
        parts.forEach(part => {
            if (part.getText().includes("§l[OPEN MENU]")) {
                command = part.getClickValue().substring(1); //remove the first character since it's a /
                ChatLib.command(command);
            }
        });
    }
}
