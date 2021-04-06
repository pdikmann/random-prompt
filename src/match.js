var content1 = document.getElementById("content1")

function int2Letter(i) {
  return (Math.max(0, Math.min(25, i)) + 10).toString(36)
}

function randomLetter() {
  return int2Letter(Math.floor(Math.random() * 26))
}

function mergeUmlauts(s){
  return s.replace("ä", "a")
    .replace("ë", "e")
    .replace("ï", "i")
    .replace("ö", "o")
    .replace("ü", "u")
}

function getSnip(s, n) {
  return mergeUmlauts(s.substr(0, n).toLowerCase())
}

function findBoundaries(a, n) {
  // determine boundaries of sets in array A starting with the same N letters.
  let prevSnip = getSnip(a[0], n)
  let sets = []
  for (let i = 1; i < a.length; i++) {
    let snip = getSnip(a[i], n)
    if (snip !== prevSnip) {
      sets.push([prevSnip, i])
      prevSnip = snip
    }
  }
  sets.push([getSnip(a[a.length - 1], n), a.length])
  return sets
}

function fieldBoundaries (n) {
  // determine boundaries of all fields
  let out = []
  for (let i = 0; i < fields.length; i++) {
    out.push(findBoundaries(fields[i].data, n))
  }
  return out
}

var boundaries = []
boundaries[0] = fieldBoundaries(1)
boundaries[1] = fieldBoundaries(2)
boundaries[2] = fieldBoundaries(3)

function lookupBoundaries(b, k) {
  // find the boundaries of key K in the boundaries B
  // returns [0,0] if no match was found
  let upper = 0,
      lower = 0
  for (let i = 0; i < b.length; i++) {
    if (b[i][0] == k) {
      upper = b[i][1]
      lower = (i == 0 ? 0 : b[i - 1][1])
      break
    }
  }
  if (lower == 0 && upper == 0) console.warn("did not find boundaries for key:", k)
  return [lower, upper]
}

function randomBetween(lower, upper) { 
  return Math.floor(Math.random() * (upper - lower)) + lower 
} 

function randomBetweenBounds(b) {return randomBetween(b[0], b[1])}

function matchedPair(){
  // pairs up random data from fields 2 and 4, matching their first letter.
  let depth = 0,
      letter = randomLetter(),
      adjBounds = lookupBoundaries(boundaries[depth][2], letter),
      dngBounds = lookupBoundaries(boundaries[depth][4], letter),
      adj = fields[2].data[randomBetweenBounds(adjBounds)],
      dng = fields[4].data[randomBetweenBounds(dngBounds)]
  return adj + " " + dng }

function findMatch(fi, letters){
  if (letters.length > boundaries.length) console.warn("letters exceed available boundary depth:", letters)
  let k = letters.substr(0, boundaries.length)
  return fields[fi].data[randomBetweenBounds(lookupBoundaries(boundaries[k.length - 1][fi], k))]
}

function matchedSet(a, k){
  // get random data from fields with indices of array A, matching their first letter(s) K.
  let letters = k || randomLetter(),
      depth = letters.length - 1,
      out = []
  for (let i = 0; i < a.length; i++) {
    out.push(findMatch(a[i], letters))
  }
  return out
}

console.log(matchedPair())
console.log(findBoundaries(fields[2].data, 1))

