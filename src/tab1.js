var tabs = document.getElementsByClassName("tab")
var tabbuttons = document.getElementById("tabbar").children
var content1 = document.getElementById("content1")

for (let i = 0; i < tabbuttons.length; i++) {
  tabbuttons[i].addEventListener("click", () => ShowTab(i))
}

function ShowTab(n) {
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].className = "tab hidden"
  }
  tabs[n].className = "tab"
}

function int2Letter(i) {
  return (Math.max(0, Math.min(25, i)) + 10).toString(36)
}

function randomLetter() {
  return int2Letter(Math.floor(Math.random() * 26))
}

function mergeUmlauts(c){
  switch(c){
  case "ä":
    return "a"
    break
  case "ë":
    return "e"
    break
  case "ï":
    return "i"
    break
  case "ö":
    return "o"
    break
  case "ü":
    return "u"
    break
  default:
    return c
    break
  }
}

function getSnip(s, n) {
  return mergeUmlauts(s.substr(0, n).toLowerCase())
}

function setBoundaries(a, n) {
  // determine boundaries of sets in array A starting with the same N letters.
  let prevSnip = getSnip(a[0], n)
  let sets = []
  for (let i = 1; i < a.length; i++) {
    let snip = getSnip(a[i], n)
    if (snip !== prevSnip) {
      sets.push([prevSnip, i])
      prevSnip = snip
    }
  }
  sets.push([getSnip(a[a.length - 1], n), a.length])
  return sets
}

console.log(randomLetter())
console.log(setBoundaries(fields[2].data, 1))

ShowTab(0)
