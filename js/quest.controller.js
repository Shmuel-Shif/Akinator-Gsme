'use strict'

var gLastRes = null

$(document).ready(init)
$('#start-button').click(onStartGuessing)
$('#yes-button').click({ ans: 'yes' }, onUserResponse)
$('#no-button').click({ ans: 'no' }, onUserResponse)
$('#save-button').click(onAddGuess)

function init() {
  createQuestsTree()
  loadTree()

$('#modal-success, #modal-new-guess').on('hidden.bs.modal', function () {
      $('#start-button').show()
      $('#answer-buttons').addClass('d-none').hide()
      $('#question-text').text(getCurrQuest().txt).hide()
  })
}

function onStartGuessing() {

    $('#start-button').hide()

    $('#question-text').text(getCurrQuest().txt).show()

    $('#answer-buttons').removeClass('d-none').show()
    
    $('#character-name').val('')
    $('#new-question').val('')
    $('#error-message').hide()
}

function onUserResponse(ev) {
    var res = ev.data.ans

    if (isChildless(getCurrQuest())) {
        if (res === 'yes') {

            var characterName = getCurrQuest().txt
            $('#guessed-character-name').text(characterName)
            $('#modal-success').modal('show')
        } else {
            $('#modal-new-guess').modal('show')
        }
    } else {
        gLastRes = res
        moveToNextQuest(res)
        renderQuest()
    }
}

function onAddGuess() {
    var newGuess = $('#character-name').val().trim()
    var newQuest = $('#new-question').val().trim()

    if (!newGuess || !newQuest) {
        $('#error-message').text('Please fill in all fields!').show()
        return
    }

    newGuess = newGuess.charAt(0).toUpperCase() + newGuess.slice(1).toLowerCase()

    if (!newGuess.startsWith('This is ')) {
        newGuess = 'This is ' + newGuess + '?'
    }
    
    if (!newQuest.endsWith('?')) {
        newQuest = newQuest + '?'
    }

    addGuess(newQuest, newGuess, gLastRes)
    saveTree()

    $('#character-name').val('')
    $('#new-question').val('')

    onRestartGame()
    $('#modal-new-guess').modal('hide')
}

function onRestartGame() {

    $('#question-text').hide()
    $('#start-button').show()
    $('#error-message').hide()

    $('#character-name').val('')
    $('#new-question').val('')

    gLastRes = null
    gCurrQuest = gQuestsTree

    localStorage.removeItem('questsTree')
    
    loadTree()
    saveTree()
}


