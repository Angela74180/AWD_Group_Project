.output database_contents.sql
.mode insert user
select * from user;
.mode insert recipe
select * from recipe;
.mode insert appliance
select * from appliance;
.mode insert step
select * from step;
.mode insert tag
select * from tag;
.mode insert ingredient
select * from ingredient;
.mode insert bookmark
select * from bookmark;
.mode insert shopping_list
select * from shopping_list;
.mode insert recipe_appliance
select * from recipe_appliance;
.mode insert recipe_ingredient
select * from recipe_ingredient;
.mode insert recipe_tag
select * from recipe_tag;
.output stdout