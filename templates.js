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
                🔵 ${obj.features} Features<br />
                🔴 ${obj.bugs} Bugs <br />
                ⚫️ ${obj.tasks} Tasks
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
  }
};
