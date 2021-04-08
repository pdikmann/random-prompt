var buttons = []
var content = document.getElementById("content")
var add = document.getElementById("add")

//add.addEventListener("click", AddButton)

function MakeElement(element, className, content) {
  let e = document.createElement(element)
  e.className = className
  e.textContent = content
  return e
}

function AddClass(e, c){
  let classes = e.className.split(" ")
  if (classes.includes(c)) return;
  classes.push(c)
  e.className = classes.join(" ")
}

function RemoveClass(e, c){
  let classes = e.className.split(" ")
  if (!classes.includes(c)) return;
  classes.splice(classes.lastIndexOf(c), 1)
  e.className = classes.join(" ")
}

function ClearButtons() {
  for (b of buttons) {
    content.removeChild(b)
  }
  buttons = []
}

function RemoveButton(b) {
  content.removeChild(b)
  let i = buttons.lastIndexOf(b)
  buttons.splice(i, 1)
}

function ClearElement(e) {
  while (e.firstChild) {
    e.removeChild(e.lastChild)
  }
}

function WriteButton(fi, di, contentFn) {
  let b = document.createElement("button")
  b.className = "prompt"
  b.pd = {}
  b.pd.fieldIndex = fi || 0
  b.pd.dataIndex = di || 0
  b.pd.locked = 0
  b.pd.contentFn = contentFn || DoNothing
  b.pd.noMatch = false
  //RandomizeButtonContent(b)
  content.insertBefore(b, add)
  buttons.push(b)
}

function NewContent(b) {
  b.pd.contentFn(b)
  // if (b.pd.noMatch) return
  // AddClass(b, "ping")
  // setTimeout(() => RemoveClass(b, "ping"), 300)
}

function DoNothing(b) {
}

function UpdateButtonContent(b) {
  let f = fields[b.pd.fieldIndex],
      d = f.data[b.pd.dataIndex]
  ClearElement(b)
  if (b.pd.noMatch) {
    d = ""
    AddClass(b, "no-match")
  } else {
    RemoveClass(b, "no-match")
  }
  let content = MakeElement("div", "label", d)
  content.addEventListener("click", () => NewContent(b))
  b.appendChild(content)
  let wrap = MakeElement("div", "wrap")
  b.appendChild(wrap)
  let type = MakeElement("div", "type stamp", f.emoji)
  type.addEventListener("click", () => ToggleButtonType(b))
  wrap.appendChild(type)
  let lock = MakeElement("div", "lock stamp", lockemoji[b.pd.locked])
  lock.addEventListener("click", () => ToggleButtonLock(b))
  b.pd.lockElement = lock
  wrap.appendChild(lock)
  let remove = MakeElement("div", "remove stamp", "❌")
  remove.addEventListener("click", () => RemoveButton(b))
  wrap.appendChild(remove)
}

function ToggleButtonType (b) {
  b.pd.fieldIndex = (b.pd.fieldIndex + 1) % fields.length
  NewContent(b)
}

function ToggleButtonLock (b) {
  b.pd.locked = 1 - b.pd.locked
  ResetUnlockAll()
  UpdateLockVisual(b)
}

function UpdateLockVisual(b) {
  b.pd.lockElement.textContent = lockemoji[b.pd.locked]
}
