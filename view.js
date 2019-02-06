//updates the view with the name
setName = name => {
  document.querySelector(".userName").innerHTML = name;
};
//make a list of all sprints with the proper html template
buildSprintsHTML = () => {
  target = document.querySelector(".allSprints");
  if (sprints.length == 0) {
    target.innerHTML = `<div class="no-sprints">No sprints yet</div>`;
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
//create an user with given name
var userName = "User 1";
var user = new User(userName);
users.push(user);
setName(userName);

//create the project
var project = new Project();
buildSprintsHTML();
