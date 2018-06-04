const snekfetch = require('snekfetch');
const BaseCommand = require('../Structure/BaseCommand');
const Logger = require('../Util/Logger');

class MinecraftUUID extends BaseCommand {
	constructor(bot, r, metrics) {
		super({
			command: 'mcuuid',
			aliases: [],
			description: 'Gets a Minecraft account UUID from a username.',
			category: 'Information',
			usage: 'mcuuid <username>',
			hidden: false
		});
		this.bot = bot;
		this.r = r;
		this.metrics = metrics;
	}

	execute(msg, args) {
		if (args.length < 1) return msg.channel.createMessage(':question:   **»**   You must provide a server IP address.');
		snekfetch.post('https://api.mojang.com/profiles/minecraft').send([ args[0] ]).then((result) => {
			if (result.body.length < 1) return msg.channel.createMessage(':exclamation:   **»**   Unable to find any players by that username.');
			msg.channel.createMessage(':clipboard:   **»**   Player `' + result.body[0].name + '`\'s UUID is `' + result.body[0].id + '`.');
		}).catch((error) => {
			msg.channel.createMessage(':exclamation:   **»**   Failed to run the command. This incident has been reported.');
			Logger.error('Failed to get server information', error);
		});
	}
}

module.exports = MinecraftUUID;