var randomizeAll = document.getElementById("random-randomizeAll")
var randomizeContent = document.getElementById("random-randomizeContent")
var defaultAll = document.getElementById("random-defaultAll")

defaultAll.addEventListener("click", DefaultAll)
randomizeAll.addEventListener("click", RandomizeAll)
randomizeContent.addEventListener("click", RandomizeContents)

function DefaultAll() {
  for (let i = 0; i < defaultSet.length; i++) {
    SetButton(buttons[i], defaultSet[i])
  }
}

function RandomField() {
  return Math.floor(Math.random() * fields.length)
}

function RandomizeAll() {
  let is = []
  for (let i = 0; i < buttons.length; i++) {
    is.push(RandomField())
  }
  is.sort()
  for (let i = 0; i < buttons.length; i++) {
    if (!buttons[i].pd.locked)
      SetButtonField(buttons[i], is[i])
  }
}

function RandomizeContents() {
  for (b of buttons) {
    if (!b.pd.locked)
      b.pd.redoFn(b)
  }
}

function SetButtonField(b, i) {
  b.pd.fieldIndex = i
  b.pd.redoFn(b)
}
