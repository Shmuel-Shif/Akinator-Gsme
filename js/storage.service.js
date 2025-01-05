'use strict'

function saveTree() {
    localStorage.setItem('questTree', JSON.stringify(gQuestsTree))
  }
  
  function loadTree() {
    const savedTree = localStorage.getItem('questTree')
    if (savedTree) {
      gQuestsTree = JSON.parse(savedTree)
      gCurrQuest = gQuestsTree
    } else {
      createQuestsTree()
    }
  }
  