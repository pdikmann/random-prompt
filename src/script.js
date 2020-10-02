var content = document.getElementById("content")
var randomizeAll = document.getElementById("randomizeAll")
var randomizeContent = document.getElementById("randomizeContent")
var unlock = document.getElementById("unlock")
var defaultAll = document.getElementById("defaultAll")

var unlockLocksNext = false
var lockemoji = [ "🔑", // open
                  "🔒" // locked
                ]
var defaultSet = [1, 1, 0, 5, 4, 2, 3]
var lengths = (() => {
  let len = []
  for (i in fields) {
    len[i] = fields[i].data.length
  }
  return len
})() // unnecessary, not an optimization
var buttons = []

defaultAll.addEventListener("click", DefaultAll)
randomizeAll.addEventListener("click", RandomizeAll)
randomizeContent.addEventListener("click", RandomizeContents)
unlock.addEventListener("click", UnlockAll)

function InitialSet() {
  ClearButtons()
  for (i of defaultSet) {
    WriteButton(i)
  }
}

function WriteButton(i) {
  let b = document.createElement("button")
  b.className = "prompt"
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

function DefaultAll() {
  for (let i = 0; i < defaultSet.length; i++) {
    SetButton(buttons[i], defaultSet[i])
  }
}

function RandomizeAll() {
  let is = []
  for (let i = 0; i < defaultSet.length; i++) {
    is.push(RandomField())
  }
  is.sort()
  for (let i = 0; i < defaultSet.length; i++) {
    if (!buttons[i].pd.locked)
      SetButton(buttons[i], is[i])
  }
}

function RandomizeContents() {
  for (b of buttons) {
    if (!b.pd.locked)
      RandomizeButtonContent(b)
  }
}

function SetButton(b, i) {
  b.pd.fieldIndex = i
  RandomizeButtonContent(b)
}

function RandomField() {
  return Math.floor(Math.random() * fields.length)
}

function RandomizeButton(b) {
  let i = RandomField()
  b.pd.fieldIndex = i
  RandomizeButtonContent(b)
}

function RandomizeButtonContent(b) {
  let f = fields[b.pd.fieldIndex]
  ClearElement(b)
  let type = MakeElement("div", "type", f.emoji)
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
  UpdateLockVisual(b)
}

function UnlockAll () {
  for (b of buttons) {
    b.pd.locked = unlockLocksNext ? 1 : 0
    UpdateLockVisual(b)
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

function UpdateLockVisual(b) {
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
