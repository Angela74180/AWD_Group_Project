let appliance_id_counter = 0;
function addAppliance() {
    let appliances_list = document.getElementsByClassName("appliance");
    console.log(appliances_list)
    let appliance_num = appliances_list.length + 1
    appliance_id_counter++;
    console.log(appliance_num)
}

function removeAppliance(rowId) {
}