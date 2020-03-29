# Slayer Utilities

A ChatTriggers module that offers a range of Hypixel Skyblock QoL utilities.

## Getting Started

### Prerequisites

You must have the latest version of ChatTriggers in your mods folder (.minecraft/mods). This version of the module was developed and tested using the 1.1.2 version of ChatTriggers.

https://www.chattriggers.com/

### Setup

Copy this repository folder into your .minecraft/config/ChatTriggers/modules folder.
It should look like this:

```
.minecraft/
├── mods/
│   └─ ctjs-1.1.2-or-latest.js
└── config/
    └─ ChatTriggers/
       └─ modules/
          └─ SlayerUtilities/
```

## Usage

First of all, make sure you have restarted your launcher after copying the module to it's correct location.
If you run this:

```
/ct modules
```

and SlayerUtilities is in there, you should be fine.

### Commands

The main command is:

```
/sb
```
or
```
/sb help
```

Run any of these two commands to see a list of available commands, and how to use them.

Before using the `profile` or `slayer` command, you have to give the module an API key.
This can be done by running:

```
/api new
```

in hypixel and then copying it to clipboard. After that run:

```
/sb setkey <key>
```

and replace the `<key>` with they key you just copied to your clipboard.

### What can you do?

* Profile - get information about a user's stats on their latest profile
* Slayer - get information about a player's slayer stats on their latest profile
* AutoBatphone - automatically open your maddox batphone menu after completing a slayer quest
* Slayer tracker - track your slayer drops and XP all 3 slayers, and view them in a gui menu that can be relocated

## Authors

* **Antonio32A** - Here

* **Marti157** - [Antonio32A](https://github.com/marti157)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
