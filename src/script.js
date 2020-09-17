var content = document.getElementById("content")
var randomize = document.getElementById("randomize")
var set = [1, 0, 4, 4, 4, 2, 3]
var lengths = (() => {
  let len = []
  for (i in fields) {
    len[i] = fields[i].data.length
  }
  return len
})() // unnecessary, not an optimization

randomize.addEventListener("click", Random)

function Random() {
  Clear()
  for (i of set) {
    WriteButton(i)
  }
}

function WriteButton(i) {
  let f = fields[i]
  let b = document.createElement("button")
  b.addEventListener("click",() => RandomizeButton(b, f))
  RandomizeButton(b, f)
  content.appendChild(b)
}

function RandomizeButton(b, f) {
  b.textContent = f.data[Math.floor(Math.random() * f.data.length)]
}

  

function WriteLine(str) {
  content.innerHTML = content.innerHTML + str + "<br>"
}

function Clear() {
  content.innerHTML = ""
}

Random()
