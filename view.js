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
//save filters function
saveFilters = () => {
  var sprints = document.querySelectorAll(".sprintfiltercheck");
  var status = document.querySelectorAll(".statusfiltercheck");
  var sprintList = [];
  var statusList = [];
  for (let sprint of sprints) {
    if (sprint.checked) sprintList.push(parseInt(sprint.getAttribute("data")));
  }
  for (let stat of status) {
    if (stat.checked) statusList.push(parseInt(stat.getAttribute("data")));
  }
  if (sprintList.length == 0 && statusList.length == 0) buildIssuesHTML();
  else if (sprintList.length > 0 && statusList.length == 0)
    buildIssuesHTML({ sprint: sprintList, status: false });
  else if (sprintList.length == 0 && statusList.length > 0)
    buildIssuesHTML({ sprint: false, status: statusList });
  else if (sprintList.length > 0 && statusList.length > 0)
    buildIssuesHTML({ sprint: sprintList, status: statusList });
};
//display filters HTML
buildFilterIssuesHTML = () => {
  var target = queryTarget(".filterIssues");
  target.innerHTML = template.filterIssues(sprints, status);
};
//make a list of all issues with the poroper html template
buildIssuesHTML = (filter = false) => {
  var target = queryTarget(".allIssues");
  if (issues.length == 0) target.innerHTML = template.noIssues();
  else {
    queryTarget(".filterIssues").style.display = "block";
    if (!filter) buildFilterIssuesHTML();
    target.innerHTML = "";
    var i = 0;
    for (issue of issues) {
      var allowed = true;
      if (filter) {
        var allowed = false;
        var first = false;
        var second = false;
        if (filter.sprint) {
          if (filter.sprint.indexOf(issue.sprint) != -1) first = true;
          else first = false;
        } else first = true;
        if (filter.status) {
          if (filter.status.indexOf(issue.status) != -1) second = true;
          else second = false;
        } else second = true;
        if (first && second) allowed = true;
      }
      if (allowed) {
        target.innerHTML += template.issue({
          id: issue.ID,
          name: issue.name,
          type: issue.type,
          status: status[issue.status],
          sprint: issue.sprint,
          sprintName: getSprint(issue.sprint).getName,
          createdBy: getUser(issue.createdBy).getName,
          createdAt: issue.createdAt,
          updatedAt: issue.updatedAt,
          description: issue.description
        });
        i++;
      }
      if (i == 0) target.innerHTML = template.noIssues();
    }
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
  var sprint = getSprint(id);
  var target = queryTarget(".singleSprint");
  Screen(".singleSprint");
  updateBreadCrumb([
    { name: "Project", link: ".overview" },
    { name: sprint.getName }
  ]);
  var i = 0;
  target.innerHTML = "";
  for (let issue of issues) {
    if (issue.sprint == id) {
      target.innerHTML += template.issue({
        id: issue.ID,
        name: issue.name,
        type: issue.type,
        status: status[issue.status],
        sprint: issue.sprint,
        sprintName: getSprint(issue.sprint).getName,
        createdBy: getUser(issue.createdBy).getName,
        createdAt: issue.createdAt,
        updatedAt: issue.updatedAt,
        description: issue.description
      });
    }
    i++;
  }
  if (i == 0) {
    target.innerHTML = template.noIssues();
    var target = queryTarget(".singleIssue");
  }
};
//builds code for a single issue with given id
buildSingleIssue = id => {
  var issue = getIssue(id);
  var target = queryTarget(".singleIssue");
  Screen(".singleIssue");
  var subtasks = "";
  if (issue.tasks != null && issue.tasks.length > 0) {
    for (let task of issue.tasks) {
      var taskData = getTask(task);
      subtasks += template.subtask({
        id: task,
        parentId: id,
        createdAt: taskData.createdAt,
        updatedAt: taskData.updatedAt,
        name: taskData.name,
        description: taskData.description,
        status: status[taskData.status]
      });
    }
  }
  var comm = "";
  if (issue.comments != null && issue.comments.length > 0) {
    for (let comment of issue.comments) {
      var commentData = getComment(comment);
      comm += template.comment({
        name: commentData.name
      });
    }
  }
  target.innerHTML = template.singleIssue({
    id: issue.ID,
    name: issue.name,
    type: issue.type,
    status: status[issue.status],
    sprint: issue.sprint,
    assignee: getUser(issue.assignee).getName,
    sprintName: getSprint(issue.sprint).getName,
    createdBy: getUser(issue.createdBy).getName,
    createdAt: issue.createdAt,
    updatedAt: issue.updatedAt,
    description: issue.description,
    subtasks: subtasks,
    comments: comm
  });
  updateBreadCrumb([
    { name: "Project", link: ".overview" },
    { name: "Issue '" + issue.name + "'" }
  ]);
};
//build code for issue update screen by given id
buildUpdateIssue = id => {
  var issue = getIssue(id);
  var target = queryTarget(".updateIssue");
  Screen(".updateIssue");
  target.innerHTML = template.updateIssue({
    id: issue.ID,
    name: issue.name,
    status: status[issue.status],
    sprint: issue.sprint,
    sprints: sprints,
    createdAt: issue.createdAt,
    description: issue.description
  });
  updateBreadCrumb([
    { name: "Project", link: ".overview" },
    { name: "Update issue '" + issue.name + "'" }
  ]);
};
//create new comment for given issue id
saveComment = id => {
  name = queryTarget(".comment-input").value;
  if (name.length > 0) {
    var issue = getIssue(id);
    var comment = new Comment(name.replace(/(?:\r\n|\r|\n)/g, "<br>"));
    issue.comments.push(comment.id);
    comments.push(comment);
    buildSingleIssue(id);
  }
};
buildCreateSubtask = id => {
  var issue = getIssue(id);
  var target = queryTarget(".createSubtask");
  Screen(".createSubtask");
  target.innerHTML = template.createSubtask({ id: id });
  updateBreadCrumb([
    { name: "Project", link: ".overview" },
    { name: "Create subtask for '" + issue.name + "'" }
  ]);
};
createSubtask = id => {
  var issue = getIssue(id);
  var name = queryTarget(".subtask-name-input").value;
  var description = queryTarget(".subtask-description-input").value;
  let validation = validateIssue(name, description, "aaa", "aaa");
  var error = queryTarget(".subtasksError");
  if (validation.length > 0) {
    error.innerHTML =
      validation + "<br>Please correct all errors before saving again";
    error.style.display = "block";
  } else {
    error.style.display = "none";
    issue.createSubTask(name, description.replace(/(?:\r\n|\r|\n)/g, "<br>"));
    if (issue.status != 0) issue.status = 1;
  }
  buildSingleIssue(issue.ID);
};
createUpdateSubtask = (id, parentID) => {
  var task = getTask(id);
  var target = queryTarget(".updateSubtask");
  target.innerHTML = template.updateSubtask({
    id: id,
    parentId: parentID,
    name: task.name,
    description: task.description,
    status: task.status
  });
  Screen(".updateSubtask");
  updateBreadCrumb([
    { name: "Project", link: ".overview" },
    { name: "Update subtask '" + task.name + "'" }
  ]);
};
updateSubtask = (id, parentId) => {
  var task = getTask(id);
  var name = queryTarget(".updatesubtask-name-input").value;
  var description = queryTarget(".updatesubtask-description-input").value;
  var stat = queryTarget(".updatesubtask-status-input").value;
  let validation = validateIssue(name, description, "aaa", "aaa");
  var error = queryTarget(".updatesubtaskError");
  if (validation.length > 0) {
    error.innerHTML =
      validation + "<br>Please correct all errors before updating again";
    error.style.display = "block";
  } else {
    error.style.display = "none";
    task.update(
      name,
      null,
      parseInt(stat),
      description.replace(/(?:\r\n|\r|\n)/g, "<br>")
    );
    var issue = getIssue(parseInt(parentId));
    var subtasks = issue.tasks;
    var count = 0;
    for (let task of subtasks) {
      let TaskObj = getTask(task);
      if (TaskObj.status == 5) count++;
    }
    if (count == subtasks.length) {
      issue.status = 5;
    }
    buildSingleIssue(parentId);
  }
};
//function for updating the issue
updateIssue = id => {
  var name = queryTarget(".update-name-input").value;
  var description = queryTarget(".update-description-input").value;
  var sprint = queryTarget(".update-sprint-input").value;
  var stat = queryTarget(".update-status-input").value;
  let validation = validateIssue(name, description, "aaa", "aaa");
  var error = queryTarget(".updateIssuesError");
  if (validation.length > 0) {
    error.innerHTML =
      validation + "<br>Please correct all errors before updating again";
    error.style.display = "block";
  } else {
    error.style.display = "none";
    getIssue(id).update(
      name,
      parseInt(sprint),
      parseInt(stat),
      description.replace(/(?:\r\n|\r|\n)/g, "<br>")
    );
    buildSingleIssue(id);
  }
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
  for (let sprint of sprints) {
    if (sprint.ID == id) return sprint;
  }
  return null;
};
//search issues by id and returns an issue object
getIssue = id => {
  for (let issue of issues) {
    if (issue.ID == id) return issue;
  }
  return null;
};
//search user by id and returns a user object
getUser = id => {
  for (let user of users) {
    if (user.ID == id) return user;
  }
  return null;
};
getTask = id => {
  for (let task of tasks) {
    if (task.ID == id) return task;
  }
  return null;
};
getComment = id => {
  for (let comment of comments) {
    if (comment.ID == id) return comment;
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
    var sprint = getSprint(sprint);
    sprint.createIssue(
      type,
      name,
      loggedUser.ID,
      assignee,
      description.replace(/(?:\r\n|\r|\n)/g, "<br>")
    );
    if (sprint.status != 0) sprint.status = 1;
    Screen(".overview");
    buildOverviewHTML();
  }
};
//create an user with given name
var userName = "User 1";
var loggedUser = new User(userName);
users.push(loggedUser);
setName(userName);

//create some users for testing
users.push(new User("User 2"));
users.push(new User("User 3"));
users.push(new User("User 4"));

//create the project
var project = new Project();
buildOverviewHTML();
