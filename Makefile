
push:
	git add *
	git commit -m "general"
	git push heroku master
	heroku ps:scale web=1

