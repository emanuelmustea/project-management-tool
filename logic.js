var status = [
  "New",
  "In progress",
  "Feedback",
  "Rework",
  "Resolved",
  "Ready for Testing"
];

var users = []; // an array of all users
var sprints = []; // an array containing all sprints
var issues = []; // an array containing all issues
var tasks = []; // an array containing all issues
var comments = []; // an array containing all issues

// function that generates an unique id per application
ID = () => {
  if (typeof ID.id == "undefined") ID.id = 1;
  else ID.id++;
  return ID.id;
};
// I will use ES6 classes for User, Issue, Project, Sprint, Comment

/* User class
 * constructor arguments: 
    -name
 */
class User {
  constructor(name) {
    this.id = ID();
    this.name = name;
  }
  get ID() {
    return this.id;
  }
}

/* Issue class
 * consturctor arguments: 
    -type (FEATURE, BUG or TASK)
    -name
    -sprint (the milestone of project the issue is belonging to)
    -createdBy (the id of the creator)
    -assignee
    -description(a description of the Issue)
 */
class Issue {
  constructor(type, name, sprint, createdBy, assignee, description) {
    this.id = ID();
    this.type = type.toUpperCase();
    this.name = name;
    this.sprint = sprint;
    this.createdBy = createdBy;
    this.assignee = assignee;
    this.description = description;
    this.status = 0; //initialize the status as New
    this.createdBy = createdBy;
    this.createdAt = new Date();
    this.updatedAt = null; // null for never updated
    this.updateCount = 0; // how many time was the issue updated
    //comments will contain a list of comment ids
    this.comments = [];
    //tasks will contain a list of task ids
    if (type == "BUG" || type == "FEATURE") this.tasks = [];
  }
  get ID() {
    return this.id;
  }
  get getSprint() {
    return this.sprint;
  }
  get getType() {
    return this.type;
  }
  get getComments() {
    return this.comments;
  }
  get getSubTasks() {
    return this.tasks;
  }
  update(newStatus = this.status) {
    //change updatedAt and updateCount
    this.updatedAt = new Date();
    this.updateCount++;
    //change the status in case of change
    this.status = newStatus;
  }
  createSubTask(name, description) {
    if (this.type == "TASK") return; //TASKS can't contain subtasks
    //create new Issue but with SUBTASK type
    let task = new Issue(
      "SUBTASK",
      name,
      this.sprint,
      this.createdBy,
      this.assignee,
      description
    );
    //add subtask id to subtasks list of Issue
    this.tasks.push(task.ID);
    //add sprint to global sprints variable
    tasks.push(task);
    //update the Issue date
    this.update();
  }
  createComment() {}
}

/* Project class
 * constructor arguments:null
 */
class Project {
  constructor() {
    this.id = ID();
    this.sprints = []; // a list of sprint ids
  }
  get ID() {
    return this.id;
  }
  get getSprints() {
    return this.sprints;
  }
  //creates Sprint and add it's id to sprints list
  createSprint(name) {
    // create a new Sprint object
    let sprint = new Sprint(name);
    //add sprint id to sprints list of Project
    this.sprints.push(sprint.ID);
    //add sprint to global sprints variable
    sprints.push(sprint);

    return sprint.ID;
  }
}

/* Sprint class
 * constructor arguments: 
    -name
 */
class Sprint {
  constructor(name) {
    this.id = ID();
    this.name = name;
  }
  get ID() {
    return this.id;
  }
  get getName() {
    return this.name;
  }
  //creates Issue and add it to global Issues variable
  createIssue(type, name, createdBy, assignee, description) {
    //create a new Issue object
    let issue = new Issue(
      type,
      name,
      this.id,
      createdBy,
      assignee,
      description
    );
    //add issue to global issues variable
    issues.push(issue);

    return issue.ID;
  }
}

/* Comment class
 * constructor arguments: 
    -name
 */
class Comment {
  constructor(name) {
    this.id = ID();
    this.name = name;
  }
  get ID() {
    return this.id;
  }
}
/*
var project = new Project();
project.createSprint("mama");
sprints[0].createIssue("BUG", "Mama mia", 1, 1, "Description of this issue");
console.log(sprints);
console.log(project);
console.log(issues);
*/
