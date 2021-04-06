var randomizeAll = document.getElementsByClassName("randomize-all")
var randomizeContent = document.getElementsByClassName("randomize-content")
var defaultAll = document.getElementsByClassName("default-all")
var unlock = document.getElementsByClassName("unlock")
var unlockLocksNext = false
var lockemoji = [ "🔑", // open
                  "🔒" // locked
                ]

for (ra of randomizeAll) ra.addEventListener("click", RandomizeAll)
for (rc of randomizeContent) rc.addEventListener("click", RandomizeContents)
for (da of defaultAll) da.addEventListener("click", DefaultAll)
for (u of unlock) u.addEventListener("click", UnlockAll)

function DefaultAll() {
  for (let i = 0; i < defaultSet.length; i++) {
    SetButtonField(buttons[i], defaultSet[i])
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


function ResetUnlockAll() {
  unlockLocksNext = false
  UpdateLockAllEmoji();
}

function UpdateLockAllEmoji() {
  let emoji = lockemoji[ unlockLocksNext ? 1 : 0]
  for (u of unlock) u.textContent = emoji
}

function UnlockAll () {
  for (b of buttons) {
    b.pd.locked = unlockLocksNext ? 1 : 0
    UpdateLockVisual(b)
  }
  unlockLocksNext = !unlockLocksNext
  UpdateLockAllEmoji()
}
