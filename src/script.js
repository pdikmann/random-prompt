var content = document.getElementById("content")
var button = document.getElementById("button")

button.addEventListener("click", Random)

function Random() {
  Clear()
  for (f of fields) {
    WriteLine(f.label + ": " + f.data[Math.floor(Math.random() * f.data.length)]) 
  }
}

function WriteLine(str) {
  content.innerHTML = content.innerHTML + str + "<br>"
}

function Clear() {
  content.innerHTML = ""
}

Random()
