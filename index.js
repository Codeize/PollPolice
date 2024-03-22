const { Client, Events, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.Raw, async (packet) => {
  // We need to hook into the raw event to detect the creation of polls, as discord.js/Discord API does not yet include it in the messageCreate event.

  // This checks if the poll exists in the event received.
  if (packet.d.poll) {
    // We grab the channel based on the data provided in the raw event, as we will be sending a message to it.
    const channel = await client.channels.fetch(packet.d.channel_id);

    if (!channel || !channel.isTextBased()) {
      console.log("Channel not found");
      return;
    }
    // We grab the message based on the data provided in the raw event, as we will be deleting it.
    const message = await channel.messages.fetch(packet.d.id);

    // The message exists, we then delete it and send a message to the channel.
    if (message) {
      await message.reply(
        `${message.author}, polls are not allowed in this server.`
      );
      await message.delete().catch((err) => {
        console.log("Error deleting message: ", err);
      });
    } else {
      // For the sake of this example, we will log that the message was not found.
      console.log("Message not found");
    }
  } else {
    // For the sake of this example, we will log that a non-poll event was received, however this will get triggered for every event the Discord gateway sends to the bot.
    console.log("A non-poll event was received.");
  }
});

// Log in to Discord with your client's token
client.login(process.env.TOKEN);
