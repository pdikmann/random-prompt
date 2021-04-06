var tabs = document.getElementsByClassName("tab")
var tabbuttons = document.getElementById("tabbar").children
var onTabChangeHooks = []

for (let i = 0; i < tabbuttons.length; i++) {
  tabbuttons[i].addEventListener("click", () => ShowTab(i))
}

function OnTabChange(n, fn) {
  onTabChangeHooks[n] = fn
}

function ShowTab(n) {
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].className = "tab hidden"
  }
  tabs[n].className = "tab"
  if (typeof onTabChangeHooks[n] == "function") onTabChangeHooks[n]()
}

ShowTab(0)
