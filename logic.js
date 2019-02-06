var status = [
  "New",
  "In progress",
  "Feedback",
  "Rework",
  "Resolved",
  "Ready for Testing"
];
// function that generates an unique id
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
    this.type = toUpperCase(type);
    this.name = name;
    this.sprint = sprint;
    this.createdBy = createdBy;
    this.assignee = assignee;
    this.description = description;
    this.status = 0; //initialize the status as New
    this.createdBy = this.createdAt = new Date();
    this.updatedAt = null; // null for never updated
    //tasks will contain a list of task ids
    if (type == "BUG" || type == "FEATURE") this.tasks = [];
    //comments will contain a list of comment ids
    this.comments = [];
  }
}
/* Project class
 * constructor arguments:null
 */

class Project {
  consturctor() {
    this.id = ID();
    this.sprints = []; // a list of sprint ids
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
}
