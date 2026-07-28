function second(){
    console.log("second function started");
    console.log("second function completed");
}

function first(){
    console.log("first function started");
    second();
    console.log("first function completed");
}

first();