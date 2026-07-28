function ghorardim(name, f){
    console.log(`Welcome to Ghorardim, ${name}!`);
    f()
}

ghorardim("Rahim", function(){
    console.log("This is a callback function.");
})
