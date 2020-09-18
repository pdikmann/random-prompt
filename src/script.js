var content = document.getElementById("content")
var randomize = document.getElementById("randomize")
var unlock = document.getElementById("unlock")
var unlockLocksNext = false
var emojis = ["👷", // occupation
              "🏢", // building
              "🔍", // adjective
              "✊", // verb
              "📃" // thing
             ]
var lockemoji = [ "🔑", // open
                  "🔒" // locked
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
unlock.addEventListener("click", UnlockAll)

function InitialSet() {
  ClearButtons()
  for (i of set) {
    WriteButton(i)
  }
}

function WriteButton(i) {
  let b = document.createElement("button")
  b.pd = {}
  b.pd.fieldIndex = i;
  b.pd.locked = 0;
  RandomizeButtonContent(b)
  content.appendChild(b)
  buttons.push(b)
}

function WriteLine(str) {
  content.innerHTML = content.innerHTML + str + "<br>"
}

function RandomizeAll() {
  for (b of buttons) {
    if (!b.pd.locked)
      RandomizeButton(b)
  }
}

function RandomizeButton(b) {
  let i = Math.floor(Math.random() * fields.length)
  b.pd.fieldIndex = i
  RandomizeButtonContent(b)
}

function RandomizeButtonContent(b) {
  let f = fields[b.pd.fieldIndex]
  ClearElement(b)
  let type = MakeElement("div", "type", emojis[b.pd.fieldIndex])
  type.addEventListener("click", () => ToggleButtonType(b))
  b.appendChild(type)
  let content = MakeElement("div", "label", f.data[Math.floor(Math.random() * f.data.length)])
  content.addEventListener("click", () => RandomizeButtonContent(b))
  b.appendChild(content)
  let lock = MakeElement("div", "lock", lockemoji[b.pd.locked])
  lock.addEventListener("click", () => ToggleButtonLock(b))
  b.pd.lockElement = lock
  b.appendChild(lock)
}

function ToggleButtonType (b) {
  b.pd.fieldIndex = (b.pd.fieldIndex + 1) % fields.length
  RandomizeButtonContent(b)
}

function ToggleButtonLock (b) {
  b.pd.locked = 1 - b.pd.locked
  ResetUnlockAll()
  UpdateLockEmoji(b)
}

function UnlockAll () {
  for (b of buttons) {
    b.pd.locked = unlockLocksNext ? 1 : 0
    UpdateLockEmoji(b)
  }
  unlockLocksNext = !unlockLocksNext
  UpdateLockAllEmoji()
}

function ResetUnlockAll() {
  unlockLocksNext = false
  UpdateLockAllEmoji();
}

function UpdateLockAllEmoji() {
  unlock.textContent = lockemoji[ unlockLocksNext ? 1 : 0]
}

function UpdateLockEmoji(b) {
  b.pd.lockElement.textContent = lockemoji[b.pd.locked]
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
