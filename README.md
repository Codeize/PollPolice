# PollPolice

➡️ [Invite the live version of the bot here](https://go.buape.com/PollPolice) ⬅️

A simple Discord bot to prevent users from sending polls in a Discord server, because Discord made a fun decision and tied the creation of polls to the SEND_MESSAGES permission.

It is not meant to be customizable, all it does it checks for polls and deletes them, and notifies the poll creator that polls aren't allowed in this server.

The code is also not pretty at all, but that's because the API support for polls is a work in progress still.

## Usage

Poll create -> Poll delete -> Poll creator notified
(The bot must have the MANAGE_MESSAGES permission to delete the poll message and the SEND_MESSAGES permission to notify the poll creator)

## Installation

1. Clone the repository
2. Install the requirements with `npm i`
3. Create a `.env` file based on the `.env.example` file
4. Run the bot with `node .`
