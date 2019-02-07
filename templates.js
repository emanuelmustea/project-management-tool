/*
 * Contains the html templates
 */
var template = {
  noSprints: () => {
    return `<div class="no-sprints">No sprints yet</div>`;
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
    onClick="buildIssuesHTML();Screen('.allIssues');updateBreadCrumb([{name:'Project', link: '.overview'}, {name: 'All issues'}])"
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
