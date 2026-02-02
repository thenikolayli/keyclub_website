import asyncio
from contextlib import asynccontextmanager
from os import getenv
from typing import Optional

import aiohttp
from discord import (
    Activity,
    ActivityType,
    Color,
    Embed,
    Intents,
    Interaction,
    app_commands,
)
from discord.ext import commands
from dotenv import load_dotenv
from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from models import EventInfo
from utils import get_default_name, set_default_name

load_dotenv()

funny = getenv("FUNNY") == "True"
token = getenv("DISCORD_TOKEN") or ""
intents = Intents.default()
intents.message_content = True
client = commands.Bot(command_prefix="/", intents=intents)
events_channel_id = int(getenv("EVENTS_CHANNEL_ID") or 0)
api_url = getenv("API_URL")


@asynccontextmanager
async def lifespan(app: FastAPI):
    async def start_bot():
        try:
            await client.start(token)
        except Exception as e:
            print(f"Bot failed to start: {e}")
            import traceback
            traceback.print_exc()
    
    bot_task = asyncio.create_task(start_bot())
    yield
    await client.close()
    bot_task.cancel()
    try:
        await bot_task
    except asyncio.CancelledError:
        pass


app = FastAPI(
    docs_url=None,
    redoc_url=None,
    openapi_url="/openapi.json",
    root_path="",
    lifespan=lifespan,
)

@app.post("/post_event")
async def post_event(event_info: EventInfo):
    channel = client.get_channel(events_channel_id) or await client.fetch_channel(
        events_channel_id
    )
    embed = Embed(
        title=f"{event_info.post_type}: {event_info.priority}",
        description=f"**{event_info.title}**\n{event_info.description}\n\n⏰: {event_info.time}\n📅: {event_info.date}\n📍: {event_info.location}\n🔗: {event_info.url}",
        color=Color.gold(),
    )
    await channel.send(embed=embed)
    return JSONResponse("Posted", status_code=status.HTTP_200_OK)


@client.event
async def on_ready():
    print(f"Logged in as {client.user}")
    synced = await client.tree.sync()
    print(f"synced {synced} commands")
    await client.change_presence(
        activity=Activity(type=ActivityType.playing, name="Watching your messages")
    )


@client.tree.command(
    name="hours", description="Returns the hours of a given name or default name"
)
async def hours(interaction: Interaction, name: Optional[str] = None):
    name = name or get_default_name(interaction.user.id)
    if not name:
        if funny:
            await interaction.response.send_message(
                "https://tenor.com/view/but-none-were-there-spongebob-hawaii-part-ii-gif-1736518424783391175",
                ephemeral=False,
            )
            return
        else:
            embed = Embed(
                title="Default name not set",
                description="You don't have a default name set, set it using `/setname [name]`",
                color=Color.pink(),
            )
            await interaction.response.send_message(embed=embed, ephemeral=False)
            return

    async with aiohttp.ClientSession() as session:
        result = await session.get(
            api_url + "/api/hours/get_hours", params={"name": name}
        )
        data = await result.json()

        if result.status == 404:
            if funny:
                await interaction.response.send_message(
                    "https://tenor.com/view/spongebob-squarepants-spongebob-think-thinking-gif-5059284",
                    ephemeral=False,
                )
                return
            else:
                embed = Embed(
                    title="Hours not found",
                    description="The hours for the name provided were not found.",
                    color=Color.pink(),
                )
                await interaction.response.send_message(embed=embed, ephemeral=False)
                return
        elif result.status != 200 and result.status != 404:
            if funny:
                await interaction.response.send_message(
                    "https://tenor.com/view/minecraft-server-restarting-server-restart-minecraft-server-restarting-gif-25036664",
                    ephemeral=False,
                )
                return
            else:
                embed = Embed(
                    title="Error fetching hours",
                    description="There was an error fetching the hours; contact the webmaster.",
                    color=Color.pink(),
                )
                await interaction.response.send_message(embed=embed, ephemeral=False)
                return

        embed = Embed(
            title=f"Hours for {data.get('name')}",
            description=f"Term hours: {data.get('term_hours')}\nAll time hours: {data.get('all_hours')}\nClass of {data.get('grad_year')}",
            color=Color.gold(),
        )
        await interaction.response.send_message(embed=embed, ephemeral=False)


@client.tree.command(
    name="setname", description="Sets a default name for the /hours command"
)
@app_commands.describe(name="Sets the default name for the /hours command")
async def setname(interaction: Interaction, name: str):
    set_default_name(interaction.user.id, name)
    await interaction.response.send_message(
        f"Default name set to {name}", ephemeral=True
    )


@client.tree.command(name="updatehours", description="Updates the /hours command")
async def updatehours(interaction: Interaction):
    async with aiohttp.ClientSession() as session:
        result = await session.get(api_url + "/api/hours/update_hours")
        if result.status == 400:
            await interaction.response.send_message(
                "Please wait at least 5 minutes before requesting an hours update again.",
                ephemeral=False,
            )
            return
    await interaction.response.send_message(
        "Hours have been updated, you may update them again in 5 minutes",
        ephemeral=False,
    )


@client.tree.command(name="help", description="Shows the help message")
async def help(interaction: Interaction):
    embed = Embed(
        title="Help",
        description="""Here are this bots commands:
- `/help`: Shows this message
- `/hours`: Shows your hours if you have a set name
- `/hours {name}`: Shows the hours of the person with the name specified
- `/setname {name}`: Sets the default name for you with the name specified
- `/updatehours`: Requests an hours update, 5 min cooldown
        """,
        color=Color.gold(),
    )
    await interaction.response.send_message(embed=embed, ephemeral=True)


@client.tree.command(
    name="ranks", description="Get the top 5 students by all hours by grad year"
)
async def ranks(interaction: Interaction, year: int):
    async with aiohttp.ClientSession() as session:
        result = await session.get(
            api_url + "/api/hours/ranks", params={"year": year}
        )
        if result.status == 404:
            await interaction.response.send_message(
                "No ranks found for the specified year.",
                ephemeral=False,
            )
            return
        elif result.status == 200:
            data = await result.json()
            embed = Embed(
                title=f"Top 5 Students by Hours for the Class of {year}",
                color=Color.gold(),
            )
            embed.add_field(
                name="Name",
                value="\n".join(
                    [
                        f"{place + 1}. *{user['name']}*"
                        for place, user in enumerate(data)
                    ]
                ),
                inline=True,
            )
            embed.add_field(
                name="Total Hours",
                value="\n".join([f"{user['all_hours']}" for user in data]),
                inline=True,
            )
            embed.add_field(
                name="Term Hours",
                value="\n".join([f"{user['term_hours']}" for user in data]),
                inline=True,
            )
            await interaction.response.send_message(embed=embed, ephemeral=False)