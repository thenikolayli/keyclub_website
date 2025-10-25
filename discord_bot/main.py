from discord import Intents, Activity, ActivityType, Embed, Color, Interaction, app_commands
from discord.ext import commands

from dotenv import load_dotenv
from os import getenv
from typing import Optional
from utils import get_default_name, set_default_name
import json, requests


load_dotenv()

funny = getenv("FUNNY") == "True"
token = getenv("DISCORD_TOKEN")
intents = Intents.default()
intents.message_content = True
client = commands.Bot(command_prefix="/", intents=intents)

@client.event
async def on_ready():
    print(f"Logged in as {client.user}")
    await client.tree.sync()
    await client.change_presence(activity=Activity(type=ActivityType.playing, name="Watching your messages"))

@client.tree.command(name="hours", description="Returns the hours of a given name or default name")
@app_commands.describe(name="Returns the hours of a given name or default name")
async def hours(interaction: Interaction, name: Optional[str] = None):
    name = name or get_default_name(interaction.user.id)
    if not name:
        if funny:
            await interaction.response.send_message(
                "https://tenor.com/view/but-none-were-there-spongebob-hawaii-part-ii-gif-1736518424783391175",
                ephemeral=False)
        else:
            embed = Embed(
                    title="Default name not set",
                    description="You don't have a default name set, set it using `/setname [name]`",
                    color=Color.pink()
            )
            await interaction.response.send_message(embed=embed, ephemeral=True)



#     # retrieves and sends hours info, send error if not found
#     if hours_info := get_hours(names_hours_list, name):
#         embed = Embed(
#             title=f"{hours_info['name']}'s Hours",
#             description=f"Term Hours: {hours_info['term_hours']}\nAll Hours: {hours_info['all_hours']}",
#             color=Color.gold()
#         )
#         await interaction.response.send_message(embed=embed, ephemeral=False)
#     else:
#         # embed = Embed(
#         #     title="Name not found",
#         #     description="The name you provided was not found in the spreadsheet",
#         #     color=Color.pink()
#         # )
#         # await interaction.response.send_message(embed=embed, ephemeral=True)
#         await interaction.response.send_message("https://tenor.com/view/but-none-were-there-spongebob-hawaii-part-ii-gif-1736518424783391175", ephemeral=False)
#         return
#
#     # if name was given but it's not in the default names, ask to set it
#     if not find_default_name(interaction.user.id):
#         embed = Embed(
#             title="Default name not set",
#             description="You don't have a default name, set it to make this command easier",
#             color=Color.pink()
#         )
#         await interaction.response.send_message(embed=embed, ephemeral=True)

@client.tree.command(name="setname", description="Sets a default name for the /hours command")
@app_commands.describe(name="Sets the default name for the /hours command")
async def setname(interaction: Interaction, name: str):
    write_default_name(interaction.user.id, name)
    await interaction.response.send_message(f"Default name set to {name}", ephemeral=True)

@client.tree.command(name="updatehours", description="Updates the /hours command")
async def updatehours(interaction: Interaction):
    # request keyclub_api:8000/api/hours/update_hours
    await interaction.response.send_message(
        f"Hours have been updated, you may update them again in 5 minutes",
        ephemeral=False)

@client.tree.command(name="help", description="Shows the help message")
async def help(interaction: Interaction):
    embed = Embed(
        title="Help",
        description="""
Here are this bots commands:
- `/help`: Shows this message
- `/hours`: Shows your hours if you have a set name
- `/hours {name}`: Shows the hours of the person with the name specified
- `/setname {name}`: Sets the default name for you with the name specified
- `/updatehours`: Requests an hours update, 5 min cooldown
        """,
        color=Color.gold()
    )
    await interaction.response.send_message(embed=embed, ephemeral=True)

client.run(token)