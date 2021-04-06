var unlock = document.getElementById("unlock")
var unlock1 = document.getElementById("unlock1")

var unlockLocksNext = false
var lockemoji = [ "🔑", // open
                  "🔒" // locked
                ]

unlock.addEventListener("click", UnlockAll)
unlock1.addEventListener("click", UnlockAll)

function ResetUnlockAll() {
  unlockLocksNext = false
  UpdateLockAllEmoji();
}

function UpdateLockAllEmoji() {
  let emoji = lockemoji[ unlockLocksNext ? 1 : 0]
  unlock1.textContent = unlock.textContent = emoji
}

function UnlockAll () {
  for (b of buttons) {
    b.pd.locked = unlockLocksNext ? 1 : 0
    UpdateLockVisual(b)
  }
  unlockLocksNext = !unlockLocksNext
  UpdateLockAllEmoji()
}

