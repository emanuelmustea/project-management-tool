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
  }
};
