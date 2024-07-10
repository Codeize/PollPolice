# PollPolice

> [!WARNING]  
> As [Discord have rolled out the permission for restricting the usage of polls](https://support.discord.com/hc/en-us/articles/22163184112407-Polls-FAQ#h_01HVSGXPCG8PK498N68J129SQH) PollPolice no longer serves a wide-spread purpose, and is now offline.
>
> This source code will remain publicly available in case somebody wishes to self-host it, or wishes to see how I implemented its functionality. Thanks for supporting the bot while it was live, and I am happy to have provided the service Discord failed to.

PollPolice prevents certain server members from sending the newly released polls feature on Discord.

## Features

- Customizable role(s) to be exempt from the poll restriction
- Customizable channel(s) to be exempt from the poll restriction
- Customizable message to notify the poll creator that their poll was deleted
- Supports internationalization; matching the 'preferred locale' of your community (Server Settings -> Community (Overview) -> Server Primary Language)
  - Currently supports English, Spanish, French and German. Start an issue or [join our Discord](https://go.buape.com/Discord) to request more languages!

## Usage

1. Invite the bot to your server
2. Run `/settings` to configure PollPolice to suit your community's needs
3. Enjoy a (semi) poll-free server!

## Installation

1. Clone the repository
2. Install the requirements with `bun install`
3. Create a `.env` file based on the `.env.example` file
4. Push the database schema with `bun db:push`
5. Run the bot with `bun start:bot`

## License

[MIT](https://opensource.org/license/mit)

## Check out my other stuff

- [Buape](https://buape.com)
