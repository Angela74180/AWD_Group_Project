function calcTime(hours, mins) {
    let sentence = " ";
    if (hours > 1){
        sentence += hours + " hours";
    }
    else if (hours == 1){
        sentence += "1 hour";
    }

    if (mins > 0 && hours > 0){
        sentence += " and ";
    }
    if (mins > 1){
        sentence += mins + " minutes";
    }
    else if (mins == 1){
        sentence += "1 minute";
    }

    return sentence;
}