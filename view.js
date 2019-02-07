/*
 * Contains all scripts for displaying updating the html
 */
//updates the view with the name
setName = name => {
  document.querySelector(".userName").innerHTML = name;
};
queryTarget = query => {
  return document.querySelector(query);
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
  target = queryTarget(".allSprints");
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
buildIssuesHTML = () => {
  target = queryTarget(".allIssues");
  if (sprints.length == 0) target.innerHTML = template.noIssues();
  else {
    target.innerHTML = "";
    target.innerHTML += template.issue();
  }
};
//builds the HTML for overview(default) screen
buildOverviewHTML = () => {
  target = queryTarget(".overview");
  target.innerHTML = template.overview({
    issues: issues.length,
    sprints: sprints.length
  });
};
//build the html for issue creation screen
buildCreateIssueHTML = () => {
  var assigneeList = [];
  var sprintList = [];
  for (let user of users) {
    assigneeList.push({ id: user.ID, name: user.getName });
  }
  for (let sprint of sprints) {
    sprintList.push({ id: sprint.ID, name: sprint.getName });
  }
  target = queryTarget(".createIssue");
  target.innerHTML = template.createIssue({
    assignee: assigneeList,
    sprints: sprintList
  });
};
buildCreateSprintHTML = () => {
  target = queryTarget(".createSprint");
  target.innerHTML = template.createSprint();
};
//builds HTML code for given sprint
buildSingleSprint = id => {
  Screen(".singleSprint");
};
//switches between multiple divs having class .screen and another "selector" class
Screen = selector => {
  var screens = document.querySelectorAll(".screen");
  for (let screen of screens) {
    screen.style.display = "none";
  }
  queryTarget(selector).style.display = "block";
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
  var breadcrumb = queryTarget(".breadcrumb");
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
//search sprints by id and returns a sprint object
getSprint = id => {
  for (sprint of sprints) {
    if (sprint.ID == id) return sprint;
  }
  return null;
};
validateIssue = (name, description, assignee, sprint) => {
  var responseError = "";
  if (name.length == 0) responseError += "Please enter a name<br>";
  if (description.length == 0)
    responseError += "Please enter a description<br>";
  if (assignee == 0) responseError += "Please select an assignee<br>";
  if (sprint == 0) responseError += "Please select a sprint<br>";
  return responseError;
};
createIssue = () => {
  var name = queryTarget(".name-input").value;
  var description = queryTarget(".description-input").value;
  var type = queryTarget(".type-input").value;
  var assignee = queryTarget(".assignee-input").value;
  var sprint = queryTarget(".issue-sprint-input").value;
  let validation = validateIssue(name, description, assignee, sprint);
  var error = queryTarget(".issuesError");
  if (validation.length > 0) {
    error.innerHTML =
      validation + "<br>Please correct all errors before saving again";
    error.style.display = "block";
  } else {
    error.style.display = "none";
    getSprint(sprint).createIssue(
      type,
      name,
      loggedUser.ID,
      assignee,
      description.replace(/(?:\r\n|\r|\n)/g, "<br>")
    );
    Screen(".overview");
    buildOverviewHTML();
  }
};
//create an user with given name
var userName = "User 1";
var loggedUser = new User(userName);
users.push(loggedUser);
setName(userName);

//create the project
var project = new Project();
buildOverviewHTML();
