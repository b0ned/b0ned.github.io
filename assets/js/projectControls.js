
function loadProject(projectPath) {
    const projectContainer = document.getElementById("projectContainer");
    projectContainer.innerHTML =  `<iframe src="${projectPath}" width="100%" height="800" style="border: none;"></iframe>`
    }

function closeProject() {
    const projectContainer = document.getElementById("projectContainer")
    projectContainer.innerHTML = "<p>Choose a JavaScript project from above to demo</p>"
}
