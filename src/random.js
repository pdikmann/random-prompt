var random = {}

var randomizeAll = document.getElementById("randomizeAll")
var randomizeContent = document.getElementById("randomizeContent")
var defaultAll = document.getElementById("defaultAll")
var defaultSet = [1, 1, 0, 5, 4, 2, 3]
var lengths = (() => {
  let len = []
  for (i in fields) {
    len[i] = fields[i].data.length
  }
  return len
})() // unnecessary, not an optimization

defaultAll.addEventListener("click", DefaultAll)
randomizeAll.addEventListener("click", RandomizeAll)
randomizeContent.addEventListener("click", RandomizeContents)

function InitialSet() {
  ResetUnlockAll()
  ClearButtons()
  for (i of defaultSet) {
    WriteButton(i)
  }
  RandomizeContents()
}

function DefaultAll() {
  for (let i = 0; i < defaultSet.length; i++) {
    SetButton(buttons[i], defaultSet[i])
  }
}

function RandomizeAll() {
  let is = []
  for (let i = 0; i < buttons.length; i++) {
    is.push(RandomField())
  }
  is.sort()
  for (b of buttons) {
    if (!b[i].pd.locked)
      SetButton(b[i], is[i])
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

OnTabChange(0, InitialSet)
InitialSet()
