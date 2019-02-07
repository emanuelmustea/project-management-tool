# Project Management Tool App

By Emanuel Mustea

`logic.js` contains all models of the application. The logic part doesn't contains any HTML code and doesn't change any UI elements. Can be used without the UI part.

`view.js` contains the UI script. This part updates the UI but doesn't contain any HTML code or models. Depends on `templates.js` part.

`templates.js` contains an object of functions that builds the HTML code based on a given object. Usually this part doesn't contain any statements but for simplifying the code some `for... of` and `if... else` were used (ex: for select options).
