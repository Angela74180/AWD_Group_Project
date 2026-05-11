from app.makeTimeDict import makeTimeDict

def make_recipe_banner_dict(recipe_object, author, tags_list):
    timeDict = makeTimeDict({"prepTime": [recipe_object.prep_hours, recipe_object.prep_minutes], "cookingTime": [recipe_object.cook_hours, recipe_object.cook_minutes], "totalTime": [recipe_object.total_hours, recipe_object.total_minutes]})

    banner_dict = {
        "id": recipe_object.id,
        "recipeName": recipe_object.name,
        "authorId": recipe_object.author_id,
        "author": author,
        "timeList": timeDict,
        "serves": recipe_object.serves,
        "recipeDescription": recipe_object.description,
        "recipeCoverImage": recipe_object.cover_image,
        "tagList": tags_list
    }
    
    return banner_dict
