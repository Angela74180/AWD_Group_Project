function splitTime(){
    let container = document.getElementById("Time");

    if (document.getElementById("timeCheckbox").checked) {
        container.innerHTML = `
        <span style="display: inline-block; width: 90px; margin-top: 2%">Prep Time: </span><input type = "number" min = "0" style="width: 60px; height: 25px; margin-bottom: 1%;" required> hour/s <input type = "number" min = "0" style="width: 60px; height: 25px;" required> min/s
        <br>
        <span style="display: inline-block; width: 90px; margin-top: 1%">Cooking Time: </span><input type = "number" min = "0" style="width: 60px; height: 25px;" required> hour/s <input type = "number" min = "0" style="width: 60px; height: 25px;" required> min/s
        `;
    }
    else{
        container.innerHTML = `
        <span style="display: inline-block; width: 90px; margin-top: 2%">Total Time: </span><input type = "number" min = "0" style="width: 60px; height: 25px;" required> hour/s <input type = "number" min = "0" style="width: 60px; height: 25px;" required> min/s
        `;
    }

}