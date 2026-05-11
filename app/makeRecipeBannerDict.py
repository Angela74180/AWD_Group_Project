from app.makeTimeDict import makeTimeDict

def make_recipe_banner_dict(recipe_object):
    timeDict = makeTimeDict({"prepTime": [recipe_object.prep_hours, recipe_object.prep_minutes], "cookingTime": [recipe_object.cook_hours, recipe_object.cook_minutes], "totalTime": [recipe_object.total_hours, recipe_object.total_minutes]})

    #Tags
    banner_dict = {
        "id": recipe_object.id,
        "recipeName": recipe_object.name,
        "authorId": "NEEDS TO BE DONE",
        "author": "NEEDS TO BE DONE",
        "timeList": timeDict,
        "serves": recipe_object.serves,
        "recipeDescription": recipe_object.description,
        "recipeCoverImage": recipe_object.cover_image
    }
    
    return banner_dict
