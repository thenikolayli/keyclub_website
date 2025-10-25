import json

# gets default name, returns none if not found
def get_default_name(user_id):
    names = []
    with open("default_names.json", "r") as file:
        names = json.load(file)
    return names.get(user_id)

# sets/updates the default name for someone given a discord user id and name
def set_default_name(user_id, name):
    with open("default_names.json", "w") as file:
        names = json.load(file)
        names.update({user_id: name})
        json.dump(names, file)