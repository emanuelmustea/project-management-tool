/*
 * Contains all scripts for displaying updating the html
 */
//updates the view with the name
setName = name => {
  document.querySelector(".userName").innerHTML = name;
};
//get features, bugs and tasks of each sprint
sprintData = id => {
  let features = 0;
  let bugs = 0;
  let tasks = 0;
  for (issue of issues) {
    if (issue.getSprint == id) {
      if (issue.getType == "FEATURE") features++;
      else if (issue.getType == "BUG") bugs++;
      else if (issue.getType == "TASK") tasks++;
    }
  }
  return [features, bugs, tasks];
};
//make a list of all sprints with the proper html template
buildSprintsHTML = () => {
  target = document.querySelector(".allSprints");
  if (sprints.length == 0) {
    target.innerHTML = template.noSprints();
  } else {
    target.innerHTML = "";
    for (sprint of sprints) {
      let data = sprintData(sprint.ID);
      target.innerHTML += template.sprint({
        id: sprint.ID,
        name: sprint.getName,
        features: data[0],
        bugs: data[1],
        tasks: data[2]
      });
    }
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
//build the link for every element of the breadcrumb
buildBreadCrumbArray = (array, lastElement) => {
  if (array.length == 1) return JSON.stringify([lastElement]);
  var returnArray = [];
  for (let element of array) {
    returnArray.push(element);
    if (element == lastElement) {
      element.link = false;
      break;
    }
  }
  return JSON.stringify(returnArray);
};
//Automatically updates the breadcrumb of the application
updateBreadCrumb = array => {
  var breadcrumb = document.querySelector(".breadcrumb");
  breadcrumb.innerHTML = "";
  for (let element of array) {
    if (element.link)
      breadcrumb.innerHTML += template.breadcrumbLink({
        name: element.name,
        link: element.link,
        newArray: buildBreadCrumbArray(array, element)
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
