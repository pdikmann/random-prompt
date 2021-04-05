var tabs = document.getElementsByClassName("tab")
var tabbuttons = document.getElementById("tabbar").children

for (let i = 0; i < tabbuttons.length; i++) {
  tabbuttons[i].addEventListener("click", () => ShowTab(i))
}

function ShowTab(n) {
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].className = "tab hidden"
  }
  tabs[n].className = "tab"
}

ShowTab(0)
