
push:
	git add *
	git commit -m "general"
	git push heroku master
	heroku ps:scale web=1
all:
	git add *
	git commit -m "general"
	git push -u origin master

