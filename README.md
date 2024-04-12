# PollPolice

➡️ [Invite the live version of the bot here](https://go.buape.com/PollPolice) ⬅️

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

## Contributing

All contributions are welcome!

## Check out my other stuff

- [Buape](https://buape.com)
