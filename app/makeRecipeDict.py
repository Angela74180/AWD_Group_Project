from app.makeTimeDict import makeTimeDict

def make_recipe_dict(recipe_object, author, tags_list, appliances, ingredients, steps, bookmark_on, cart_on, signed_in, allowed_to_view):
    timeDict = makeTimeDict({"prepTime": [recipe_object.prep_hours, recipe_object.prep_minutes], "cookingTime": [recipe_object.cook_hours, recipe_object.cook_minutes], "totalTime": [recipe_object.total_hours, recipe_object.total_minutes]})

    banner_dict = {
        "id": recipe_object.id,
        "recipeId": recipe_object.id,
        "recipeName": recipe_object.name,
        "authorId": recipe_object.author_id,
        "author": author,
        "timeList": timeDict,
        "serves": recipe_object.serves,
        "recipeDescription": recipe_object.description,
        "recipeCoverImage": recipe_object.cover_image,
        "allowRatings": recipe_object.allow_ratings,
        "allowReviews": recipe_object.allow_reviews,
        "timeSplit": recipe_object.time_split,
        "visibility": recipe_object.visibility,
        "recipeDifficulty": recipe_object.difficulty,
        "recipeType": recipe_object.recipe_type,
        "status": recipe_object.status,
        "tagList": tags_list,
        "appliances": appliances,
        "ingredients": ingredients,
        "steps": steps,
        "bookmark_on": bookmark_on,
        "cart_on": cart_on,
        "signed_in": signed_in,
        "allowed_to_view": allowed_to_view
    }
    
    return banner_dict



# empty_dict = {
#     "appliances": [
#         {
#             "desc": "",
#             "extraData": "",
#             "name": ""
#         }
#     ],
#     "ingredients": [
#         {
#             "desc": "",
#             "name": "",
#             "quantity": "",
#             "units": ""
#         }
#     ],
#     "steps": [
#         {
#             "desc": "",
#             "name": "",
#             "photo": ""
#         }
#     ],
# 
# }