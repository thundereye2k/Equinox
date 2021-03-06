const BaseCommand = require('../Structure/BaseCommand');
const handleDatabaseError = require('../Util/handleDatabaseError');

class CancelGiveaway extends BaseCommand {
	constructor(bot, r, metrics, i18n, secondaryDB) {
		super({
			command: 'cancel-giveaway',
			aliases: [
				'cancelgiveaway'
			],
			description: 'Cancels a giveaway in your current channel.',
			category: 'Utility',
			usage: 'cancel-giveaway <message ID>',
			hidden: false,
			guildOnly: true
		});
		this.bot = bot;
		this.r = r;
		this.metrics = metrics;
		this.i18n = i18n;
		this.secondaryDB = secondaryDB;
	}

	execute(msg, args) {
		if (args.length < 1) return msg.channel.createMessage(':question:   **»**   You must provide a message ID.');
		this.r.table('giveaways').get(args[0]).run((error, giveaway) => {
			if (error) return handleDatabaseError(error, msg);
			if (!giveaway) return msg.channel.createMessage(':exclamation:   **»**   Unable to find any giveaways by that message ID.');
			if (giveaway.creator !== msg.author.id) return msg.channel.createMessage(':exclamation:   **»**   You cannot cancel giveaways that you did not start.');
			this.r.table('giveaways').get(args[0]).update({ cancelled: true }).run((error) => {
				if (error) return handleDatabaseError(error, msg);
				msg.channel.createMessage(':white_check_mark:   **»**   Successfully cancelled that giveaway. Please give it a moment to update.');
			});
		});
	}
}

module.exports = CancelGiveaway;