import request from "request/index";
import Promise from "Promise/index";
import { data } from "../features/slayer-tracker/tracker.js";
import SlayerTrackerGUI from "../features/slayer-tracker/gui.js";
import { prettyNumber } from "../utils/prettynumber.js";
import { scoreboardCheck } from "../utils/scoreboardCheck.js";

const TrackerGUI = new SlayerTrackerGUI();

var minion_slots = {0: 5, 5: 6, 15: 7, 30: 8, 50: 9, 75: 10, 100: 11, 125: 12, 150: 13, 175: 14, 200: 15, 225: 16, 250: 17, 275: 18, 300: 19, 350: 20, 400: 21, 450: 22, 500: 23, 550: 24};
var skill_curves = [50, 175, 375, 675, 1175, 1925, 2925, 4425, 6425, 9925, 14925, 22425, 32425, 47425, 67425, 97425, 147425, 222425, 322425, 522425, 822425, 1222425, 1722425, 2322425, 3022425, 3822425, 4722425, 5722425, 6822425, 8022425, 9322425, 10722425, 12222425, 13822425, 15522425, 17322425, 19222425, 21222425, 23322425, 25522425, 27822425, 30222425, 32722425, 35322425, 38072425, 40972425, 44072425, 47472425, 51172425, 55172425];

const sendRequest = (url) => {
    const returnedPromise = request({
        url: url,
        headers: {
            ["User-Agent"]: "Mozilla/5.0 (ChatTriggers)"
        }
    });
    return new Promise((resolve, reject) => {
        returnedPromise.then(value => resolve(JSON.parse(value)));
    });
}

function commandHandler(...args) {
    if (JSON.stringify(args) === "[null]" || args === undefined || args[0] === "help") {
        ChatLib.chat("&6[SlayerUtils Help]");
        ChatLib.chat("&e➨ &3/sb profile <ign> - show player's general stats");
        ChatLib.chat("&e➨ &3/sb slayer <ign> - show player's slayer stats");
        ChatLib.chat("&e➨ &3/selectslayer - open slayer selector");
        ChatLib.chat("&e➨ &3/sb tracker <x> <y> - change the position of the tracker GUI");
        ChatLib.chat("&e➨ &3/sb batphone - toggle auto batphone");
        ChatLib.chat("&e➨ &3/sb setkey - set the API key");
        return;
    } else if (!["slayer", "profile", "batphone", "tracker", "setkey"].includes(args[0])) {
        ChatLib.chat("&6[SlayerUtils] &cInvalid command. Do /sb or /sb help.");
        return;
    } else if (args[0] === "tracker") {
        if (!scoreboardCheck()) {
            ChatLib.chat("&6[SlayerUtils] &cPlease join Hypixel Skyblock to use this.");
        } else if (args.length !== 3 || isNaN(args[1]) || isNaN(args[2])) {
            ChatLib.chat("&6[SlayerUtils] &cInvalid usage. Please specify X and Y coordinates for the GUI.");
        } else {
            data.trackerX = parseInt(args[1]);
            data.trackerY = parseInt(args[2]);
            TrackerGUI.displaySlayerStats();
        }
        return;
    } else if (args[0] === "batphone") {
        if (data.batphone) {
            ChatLib.chat("&6[SlayerUtils] &3Maddox batphone auto-open &cdisabled&3.");
            data.batphone = false;
        } else {
            ChatLib.chat("&6[SlayerUtils] &3Maddox batphone auto-open &aenabled&3.");
            data.batphone = true;
        }
        return;
    } else if ((args[0]) === "setkey") {
        if (args.length < 2) {
            ChatLib.chat("&6[SlayerUtils] &cPlease specify the API key.");
        } else {
            data.key = args[1];
            ChatLib.chat("&6[SlayerUtils] &3The API key was set successfully.");
        }
        return;
    }

    if (data.key === "") {
        ChatLib.chat("&6[SlayerUtils] &cPlease set the API key by using /sb setkey <key> to use this feature.");
        return;
    } else if (args.length < 2) {
        ChatLib.chat("&6[SlayerUtils] &cInvalid usage. Please specify player's IGN.");
        return;
    }

    ChatLib.chat("&6[SlayerUtils] &3Loading...");

    var name = args[1];
    var key = data.key;

    sendRequest("https://api.mojang.com/users/profiles/minecraft/" + name).then(uuidData => {
        var uuid = uuidData.id;
        var name = uuidData.name;

        sendRequest("https://api.hypixel.net/player?key=" + key + "&uuid=" + uuid).then(data => {
            if (data["player"]["stats"]["SkyBlock"]["profiles"] === undefined) {
                ChatLib.chat("&6[SBUtils] &cCouldn't find any Skyblock profiles for this player.");
                return;
            }

            const promises = Object.entries(data["player"]["stats"]["SkyBlock"]["profiles"]).map(([profile, value]) => {
                return sendRequest("https://api.hypixel.net/skyblock/profile?key=" + key + "&profile=" + profile);
            });

            Promise.all(promises).then(values => {
                var profiletimes = [];
                var profilekeys = [];
                values.map(result => {
                    profilekeys.push(result["profile"]["members"][uuid]["last_save"]);
                    profiletimes[result["profile"]["members"][uuid]["last_save"]] = result;
                    profiletimes[result["profile"]["members"][uuid]["last_save"]]["cute_name"] = data["player"]["stats"]["SkyBlock"]["profiles"][result["profile"]["profile_id"]]["cute_name"];
                });

                var lines = [];
                var profile = profiletimes[Math.max.apply(null, profilekeys)];

                if (args[0] === "profile") {
                    lines.push("&3" + name + "'s stats on &a" + profile["cute_name"]);

                    // Fairy souls

                    if (profile["profile"]["members"][uuid]["fairy_souls_collected"] === undefined) {
                        profile["profile"]["members"][uuid]["fairy_souls_collected"] = 0;
                    }
                    lines.push("&bFairy Souls: " + profile["profile"]["members"][uuid]["fairy_souls_collected"]);

                    // Purse

                    lines.push("&bPurse: " + Math.round(profile["profile"]["members"][uuid]["coin_purse"]).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));

                    // Bank

                    if (profile["profile"]["banking"] !== undefined) {
                        lines.push("&bBank: " + Math.round(profile["profile"]["banking"]["balance"]).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
                    } else {
                        lines.push("&bBank: &cAPI OFF");
                    }

                    // Minion slots

                    var crafted_minions = [];
                    var crafted_amount = 0;
                    Object.keys(profile["profile"]["members"]).map(uid => {
                        try {
                            profile["profile"]["members"][uid]["crafted_generators"].map(minion => {
                                if (!crafted_minions.includes(minion)) {
                                    crafted_amount += 1;
                                    crafted_minions.push(minion);
                                }
                            });
                        } catch(err) {}
                    });
                    var slots = 5;
                    Object.keys(minion_slots).map(i => {
                        if (crafted_amount > i) {
                            slots = minion_slots[i];
                        }
                    });
                    lines.push("&bMinion Slots: " + slots);

                    // Skills

                    var skills = {"combat": 0, "foraging": 0, "farming": 0, "mining": 0, "fishing": 0, "enchanting": 0, "alchemy": 0}
                    var average = 0;
                    if (profile["profile"]["members"][uuid]["experience_skill_combat"] !== undefined) {
                        lines.push("&bSkills:");
                        Object.keys(skills).map(skill => {
                            for (let i = 0; i < skill_curves.length; i++) {
                                if (profile["profile"]["members"][uuid]["experience_skill_" + skill] < skill_curves[i]) {
                                    break;
                                } else {
                                    skills[skill] += 1;
                                }
                            }
                            average += skills[skill];
                            lines.push("&e➨ &9" + skill[0].toUpperCase() + skill.slice(1) + ": " + skills[skill]);
                        });
                        average = Math.round(average / 7 * 10) / 10;
                        lines.push("&bAverage Skill Level: " + average);
                    } else {
                        lines.push("&e➨ &cAPI OFF");
                    }
                } else {
                    lines.push("&3" + name + "'s slayer stats on &a" + profile["cute_name"]);

                    if (profile["profile"]["members"][uuid]["slayer_bosses"]["zombie"]["xp"] === undefined) {
                        var zombiexp = 0;
                    } else {
                        var zombiexp = profile["profile"]["members"][uuid]["slayer_bosses"]["zombie"]["xp"];
                    }
                    if (profile["profile"]["members"][uuid]["slayer_bosses"]["spider"]["xp"] === undefined) {
                        var spiderxp = 0;
                    } else {
                        var spiderxp = profile["profile"]["members"][uuid]["slayer_bosses"]["spider"]["xp"];
                    }
                    if (profile["profile"]["members"][uuid]["slayer_bosses"]["wolf"]["xp"] === undefined) {
                        var wolfxp = 0;
                    } else {
                        var wolfxp = profile["profile"]["members"][uuid]["slayer_bosses"]["wolf"]["xp"];
                    }

                    lines.push("&bTotal XP: " + (zombiexp + spiderxp + wolfxp).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));

                    lines.push("&bZombie:");
                    lines.push("&e➨ &9XP: " + zombiexp.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
                    for (let i = 0; i < 4; i++) {
                        var result = (profile["profile"]["members"][uuid]["slayer_bosses"]["zombie"]["boss_kills_tier_" + i] === undefined) ? 0 : profile["profile"]["members"][uuid]["slayer_bosses"]["zombie"]["boss_kills_tier_" + i];
                        lines.push("&e➨ &9T" + (i + 1) + ": " + result);
                    }

                    lines.push("&bSpider:");
                    lines.push("&e➨ &9XP: " + spiderxp.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
                    for (let i = 0; i < 4; i++) {
                        var result = (profile["profile"]["members"][uuid]["slayer_bosses"]["spider"]["boss_kills_tier_" + i] === undefined) ? 0 : profile["profile"]["members"][uuid]["slayer_bosses"]["spider"]["boss_kills_tier_" + i];
                        lines.push("&e➨ &9T" + (i + 1) + ": " + result);
                    }

                    lines.push("&bWolf:");
                    lines.push("&e➨ &9XP: " + wolfxp.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
                    for (let i = 0; i < 4; i++) {
                        var result = (profile["profile"]["members"][uuid]["slayer_bosses"]["wolf"]["boss_kills_tier_" + i] === undefined) ? 0 : profile["profile"]["members"][uuid]["slayer_bosses"]["wolf"]["boss_kills_tier_" + i];
                        lines.push("&e➨ &9T" + (i + 1) + ": " + result);
                    }
                }

                lines.map(line => {
                    ChatLib.chat(line);
                });
            });
        });
    });
}

export { commandHandler }