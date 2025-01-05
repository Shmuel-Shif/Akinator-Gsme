'use strict';

var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function renderQuest() {
    $('#question-text').text(getCurrQuest().txt)
}
  
function createQuestsTree() {
  gQuestsTree = createQuest('Is your character male?')
  gQuestsTree.yes = createQuest('This is Superman?')
  gQuestsTree.no = createQuest('This is Batman?')
  gCurrQuest = gQuestsTree
  gPrevQuest = null
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null;
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest
    gCurrQuest = res === 'yes' ? gCurrQuest.yes : gCurrQuest.no
}
  
function addGuess(newQuestTxt, newGuessTxt, lastRes) {

    var newQuest = createQuest(newQuestTxt)
  
    newQuest.yes = createQuest(newGuessTxt)
    newQuest.no = gCurrQuest
  
    if (lastRes === 'yes') {
      gPrevQuest.yes = newQuest
    } else {
      gPrevQuest.no = newQuest
    }
}
  
function getCurrQuest() {
  return gCurrQuest
}

function hideAnswerButtons() {
    $('#answer-buttons').hide()
}

