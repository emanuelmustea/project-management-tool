/*
 * Contains all scripts for displaying updating the html
 */
//updates the view with the name
setName = name => {
  document.querySelector(".userName").innerHTML = name;
};
//make a list of all sprints with the proper html template
buildSprintsHTML = () => {
  target = document.querySelector(".allSprints");
  if (sprints.length == 0) {
    target.innerHTML = template.noSprints();
  } else {
  }
};
//switches between multiple divs having class .screen and another "selector" class
Screen = selector => {
  var screens = document.querySelectorAll(".screen");
  for (let screen of screens) {
    screen.style.display = "none";
  }
  document.querySelector(selector).style.display = "block";
};
//Automatically updates the breadcrumb of the application
updateBreadCrumb = array => {
  var breadcrumb = document.querySelector(".breadcrumb");
  breadcrumb.innerHTML = "";
  for (let element of array) {
    if (element.link)
      breadcrumb.innerHTML += template.breadcrumbLink({
        name: element.name,
        link: element.link
      });
    else
      breadcrumb.innerHTML += template.breadcrumbText({
        name: element.name
      });
  }
};
//create an user with given name
var userName = "User 1";
var user = new User(userName);
users.push(user);
setName(userName);

//create the project
var project = new Project();
buildSprintsHTML();
