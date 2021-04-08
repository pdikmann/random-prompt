var tabs = document.getElementsByClassName("tab")
var tabbuttons = document.getElementById("tabbar").children
var onTabChangeHooks = []
var currentTab = 0

for (let i = 0; i < tabbuttons.length; i++) {
  tabbuttons[i].addEventListener("click", () => ShowTab(i))
}

function OnTabChange(n, fn) {
  onTabChangeHooks[n] = fn
}

function ShowTab(n) {
  for (let i = 0; i < tabs.length; i++) {
    //tabs[i].className = "tab hidden"3
    AddClass(tabs[i], "hidden")
    RemoveClass(tabbuttons[i], "active")
  }
  //tabs[n].className = "tab"
  RemoveClass(tabs[n], "hidden")
  AddClass(tabbuttons[n], "active")
  RunTabChangeHook(n)
  currentTab = n
}

function RunTabChangeHook(n) {
  if (typeof onTabChangeHooks[n] == "function") onTabChangeHooks[n]()
}

ShowTab(0)
