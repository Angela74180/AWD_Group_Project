def makeTimeDict(timeDict):
    prep_hours = timeDict["prepTime"][0]
    prep_mins = timeDict["prepTime"][1]
    
    cook_hours = timeDict["cookingTime"][0]
    cook_mins = timeDict["cookingTime"][1]

    total_hours = timeDict["totalTime"][0]
    total_mins = timeDict["totalTime"][1]

    if total_mins == 0 and total_hours == 0:
        total_mins = prep_mins + cook_mins
        total_hours = prep_hours + cook_hours

    print(total_hours, total_mins)
    total_time = total_hours * 60 + total_mins
    total_hours = total_time//60
    total_mins = total_time - (total_hours * 60)

    prep_time = prep_hours * 60 + prep_mins
    prep_hours = prep_time//60
    prep_mins = prep_time - (prep_hours * 60)

    cook_time = cook_hours * 60 + cook_mins
    cook_hours = cook_time//60
    cook_mins = cook_time - (cook_hours * 60)

    final_time_dict = {
        "prepTime": [prep_hours, prep_mins],
        "cookingTime": [cook_hours, cook_mins],
        "totalTime": [total_hours, total_mins]
    }

    return final_time_dict
