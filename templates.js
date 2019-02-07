/*
 * Contains the html templates
 */
var template = {
  noSprints: () => {
    return `<div class="no-sprints">No sprints yet</div>`;
  },
  noIssues: () => {
    return `<div class="no-issues">No issues matching your filters</div>`;
  },
  sprint: obj => {
    return `<div class="sprint">
        <a href="#" class="sprint-name" onClick="buildSingleSprint(${
          obj.id
        })">${obj.name}</a>
            <span class="sprint-data">
                <span class="features-icon"></span> ${
                  obj.features
                } Features<br />
                <span class="bugs-icon"></span> ${obj.bugs} Bugs <br />
                <span class="tasks-icon"></span> ${obj.tasks} Tasks
            </span>
        <div class="clearfix"></div>
        </div>`;
  },
  issue: obj => {
    if (obj.updatedAt == null) {
      var updatedAt = ``;
    } else {
      var updatedAt = `<br />
        Updated on <b>${obj.updatedAt}</b>`;
    }
    return `<div class="issue">
    <a
      href="#"
      class="issue-name"
      onClick="buildSingleIssue(${obj.id})"
      >${obj.name}</a
    >
    <span class="type right ${obj.type}">${obj.type}</span>
    <span class="status right ${obj.status}">${obj.status}</span>
    <div class="clearfix"></div>
    <span class="subsprint" onClick="buildSingleSprint(${obj.sprint}"
      >${obj.sprintName}</span
    >
    <span class="createdby"
      >Created by <b>${obj.createdBy}</b> on <b>${obj.createdAt}</b>
      ${updatedAt}
    </span>
    <div class="description">
     ${obj.description}
    </div>
    <div class="clearfix"></div>
  </div>`;
  },
  breadcrumbLink: obj => {
    return `<a href="#" class="link-build" onClick='Screen("${
      obj.link
    }"); updateBreadCrumb(${obj.newArray})'>${obj.name}</a>`;
  },
  breadcrumbText: obj => {
    return `<span href="#" class="link-build">${obj.name}</span>`;
  },
  overview: obj => {
    return `<div
    class="sprints"
    onClick="buildSprintsHTML();Screen('.allSprints');updateBreadCrumb([{name:'Project', link: '.overview'}, {name: 'All sprints'}])"
  >
    <a href="#">Sprints</a>(${obj.sprints})
  </div>
  <div
    class="issues"
    onClick="Screen('.allIssues');buildIssuesHTML();updateBreadCrumb([{name:'Project', link: '.overview'}, {name: 'All issues'}])"
  >
    <a href="#">Issues</a>(${obj.issues})
  </div>`;
  },
  createSprint: () => {
    return `<label>
    Name
    <input
      class="input sprint-input"
      type="text"
      placeholder=""
      autofocus
    />
  </label>
  <br />
  <button
    class="btn"
    onClick="if(document.querySelector('.sprint-input').value.length == 0) return;project.createSprint(document.querySelector('.sprint-input').value);document.querySelector('.sprint-input').value = ''; buildOverviewHTML();Screen('.overview'); updateBreadCrumb([{name:'Project'}])"
  >
    Save
  </button>
  <button
    class="btn"
    onCLick="document.querySelector('.sprint-input').value = '';Screen('.overview'); updateBreadCrumb([{name:'Project'}])"
  >
    Cancel
  </button>`;
  },
  filterIssues: (sprints, statuses) => {
    var sprintList = ``;
    var statusList = ``;
    for (let sprint of sprints) {
      sprintList += `<label> <input class="sprintfiltercheck" type="checkbox" data="${
        sprint.ID
      }" />${sprint.getName}</label><br />`;
    }
    var i = 0;
    for (let stat of statuses) {
      statusList += `<label> <input class="statusfiltercheck" type="checkbox" data="${i}" />${stat}</label><br />`;
      i++;
    }
    return `<div class="bysprints">
      <b>Filter by sprint</b>
      <br />
      ${sprintList}
    </div>
    <div class="bystatus">
      <b>Filter by status</b>
      <br />
      ${statusList}
    </div>
    <button class="btn" onClick="buildIssuesHTML()">Clear filters</button>
    <button class="btn" onclick="saveFilters()">Save filters</button>
    `;
  },
  createIssue: obj => {
    var assigneeList = "";
    var sprintList = "";
    for (let assignee of obj.assignee) {
      assigneeList += `<option value="${assignee.id}">${
        assignee.name
      }</option>`;
    }
    if (obj.sprints.length == 0) {
      sprintList = `<option value="0" disabled selected>
        To create a issue create a sprint first
      </option>`;
    } else {
      sprintList += `<option value="0" disabled selected>
        Please select a sprint
      </option>`;
      for (let sprint of obj.sprints) {
        sprintList += `<option value="${sprint.id}">${sprint.name}</option>`;
      }
    }
    return `<label>
      Name
      <input
        class="input name-input"
        type="text"
        placeholder=""
        autofocus
      />
    </label>
    <label>
      Type
      <select value="FEATURE" class="type-input">
        <option value="FEATURE">Feature </option>
        <option value="BUG">Bug </option>
        <option value="TASK">Task </option>
      </select>
    </label>
    <label>
      Assignee
      <select class="assignee-input">
        <option value="0" disabled selected>Please select a user</option>
        ${assigneeList}
      </select>
    </label>
    <label>
      Sprint
      <select class="issue-sprint-input">
        ${sprintList}
      </select>
    </label>
    <label>
      Description
      <textarea class="input textarea description-input"></textarea>
    </label>
    <br />
    <div class="issuesError" style="display:none"></div>
    <button
      class="btn"
      onClick="createIssue()"
    >
      Save
    </button>
    <button
      class="btn"
      onCLick="cancelIssue()"
    >
      Cancel
    </button>`;
  }
};
