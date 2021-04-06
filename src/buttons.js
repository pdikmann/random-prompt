var buttons = []
var content = document.getElementById("content")

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

function WriteButton(fi, di, redoFn) {
  let b = document.createElement("button")
  b.className = "prompt"
  b.pd = {}
  b.pd.fieldIndex = fi || 0
  b.pd.dataIndex = di || 0
  b.pd.locked = 0
  b.pd.redoFn = redoFn || DoNothing
  //RandomizeButtonContent(b)
  content.appendChild(b)
  buttons.push(b)
}

function DoNothing(b) {
}

function UpdateButtonContent(b) {
  let f = fields[b.pd.fieldIndex],
      d = f.data[b.pd.dataIndex]
  ClearElement(b)
  let content = MakeElement("div", "label", d)
  content.addEventListener("click", () => b.pd.redoFn(b))
  b.appendChild(content)
  let wrap = MakeElement("div", "wrap")
  b.appendChild(wrap)
  let type = MakeElement("div", "type", f.emoji)
  type.addEventListener("click", () => ToggleButtonType(b))
  wrap.appendChild(type)
  let lock = MakeElement("div", "lock", lockemoji[b.pd.locked])
  lock.addEventListener("click", () => ToggleButtonLock(b))
  b.pd.lockElement = lock
  wrap.appendChild(lock)
}

function ToggleButtonType (b) {
  b.pd.fieldIndex = (b.pd.fieldIndex + 1) % fields.length
  b.pd.redoFn(b)
}

function ToggleButtonLock (b) {
  b.pd.locked = 1 - b.pd.locked
  ResetUnlockAll()
  UpdateLockVisual(b)
}

function UpdateLockVisual(b) {
  b.pd.lockElement.textContent = lockemoji[b.pd.locked]
}
