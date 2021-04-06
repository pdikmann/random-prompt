var defaultSet = []

function RandomInitialSet() {
  ResetUnlockAll()
  ClearButtons()
  defaultSet = [1, 1, 0, 5, 4, 2, 3]
  for (i of defaultSet) {
    WriteButton(i, 0, RandomizeButtonContent)
  }
  RandomizeContents()
}

function RandomizeButtonContent(b) {
  b.pd.dataIndex = Math.floor(Math.random() * fields[b.pd.fieldIndex].data.length)
  UpdateButtonContent(b)
}
 
OnTabChange(0, RandomInitialSet)
RandomInitialSet()
