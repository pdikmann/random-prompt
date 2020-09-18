var content = document.getElementById("content")
var randomize = document.getElementById("randomize")
var emojis = ["👷", // occupation
              "🏢", // building
              "🔍", // adjective
              "✊", // verb
              "📃" // thing
             ]
var set = [1, 0, 4, 4, 4, 2, 3]
var lengths = (() => {
  let len = []
  for (i in fields) {
    len[i] = fields[i].data.length
  }
  return len
})() // unnecessary, not an optimization
var buttons = []

randomize.addEventListener("click", RandomizeAll)

function InitialSet() {
  ClearButtons()
  for (i of set) {
    WriteButton(i)
  }
}

function WriteButton(i) {
  let b = document.createElement("button")
  b.fieldIndex = i;
  RandomizeButtonContent(b)
  content.appendChild(b)
  buttons.push(b)
}

function WriteLine(str) {
  content.innerHTML = content.innerHTML + str + "<br>"
}

function RandomizeAll() {
  for (b of buttons) {
    RandomizeButtonContent(b)
  }
}

function RandomizeButton(b) {
  let i = Math.floor(Math.random() * fields.length)
  b.fieldIndex = i
  RandomizeButtonContent(b)
}

function RandomizeButtonContent(b) {
  let f = fields[b.fieldIndex]
  ClearElement(b)
  let type = MakeElement("div", "type", emojis[b.fieldIndex])
  type.addEventListener("click", () => ToggleButtonType(b))
  b.appendChild(type)
  let content = MakeElement("div", "label", f.data[Math.floor(Math.random() * f.data.length)])
  content.addEventListener("click", () => RandomizeButtonContent(b))
  b.appendChild(content)
}

function ToggleButtonType (b) {
  b.fieldIndex = (b.fieldIndex + 1) % fields.length
  RandomizeButtonContent(b)
}

function MakeElement(element, className, content) {
  let e = document.createElement(element)
  e.className = className
  e.textContent = content
  return e
}

function ClearButtons() {
  for (b of buttons) {
    content.removeChild(b)
  }
  buttons = []
}

function ClearElement(e) {
  while (e.firstChild) {
    e.removeChild(e.lastChild)
  }
}

InitialSet()
