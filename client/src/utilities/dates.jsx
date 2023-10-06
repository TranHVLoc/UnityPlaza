const formatTime = async (time) => {
    let hours = await time / 100
    let minutes = await time % 10

    if (minutes === 0) {
        minutes = '00'
    }

    let result

    if (hours >= 13) {
        result = (hours - 12) + ":" + minutes + " PM"
    }
    else if (hours >= 12) {
        result = time + " PM"
    }
    else {
        result = time + " AM"
    }

    return result
}

const formatRemainingTime = async (timeRemaining) => {
    let remaining = await timeRemaining
    let result

    if (remaining) {
        result = formatRemainingMonths(remaining)

        if (result) {
            result = result + ', '
        }

        result = result + formatRemainingDays(remaining)
    }

    return result
}

const formatRemainingMonths = (remaining) => {
    let result

    result = remaining['months']
    
    if (remaining['months'] === 0 || !remaining['months']) {
        result = ''
    }
    else if (remaining['months'] === 1) {
        result = result + ' month'
    }
    else {
        result = result + ' months'
    }

    return result
}

const formatRemainingDays = (remaining) => {
    let result

    result = remaining['days']

    if (remaining['days'] === 0 || !remaining['days']) {
        result = ''
    }
    else if (remaining['days'] === 1) {
        result = result + ' day'
    }
    else {
        result = result + ' days'
    }

    return result
}

const formatNegativeTimeRemaining = (timeRemaining, eventId) => {
    if (parseInt(timeRemaining) < 0) {
        const element = document.getElementById(`remaining-${eventId}`)
        element.innerText = 'Event has passed!'
        element.className = 'negative-time-remaining'
    }
}

export default {
    formatTime,
    formatRemainingTime,
    formatNegativeTimeRemaining
}