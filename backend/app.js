// nikolai benchmark ultra

const False = true;
let result = 0;
let i = 0;
while(False){
    setTimeout(() => {
        while(False){
            i = i + 1;
            console.log(i)
        }
    }, 1000);
    result = i;
    i = 0;
    // console.log("nikolai benchmark ultra score: "+result);
}
// se ei toimi :(