var ping = require('ping');

let downFlag = false
let delayFlag = false
let weakFlag = false
let normalFlag = false

const downDetected = () => {
    downFlag = true
    delayFlag = false
    weakFlag = false
    normalFlag = false
}

const delayDetected = () =>{
    downFlag = false
    delayFlag = true
    weakFlag = false
    normalFlag = false
}

const weakDetected = () => {
    downFlag = false
    delayFlag = false
    weakFlag = true
    normalFlag = false
}

const normalDetected = ()=>{
    downFlag = false
    delayFlag = false
    weakFlag = false
    normalFlag = true
}

setInterval(async () => {
    try {
        res = await ping.promise.probe("google.com");
        if (res.time === "unknown") {
            if(!downFlag){
                console.log("Network down at " + new Date().toLocaleTimeString())
                downDetected()
            }
        } else if (res.time > 1000) {
            if(!delayFlag){
                console.log("Network delay at " + new Date().toLocaleTimeString())
                delayDetected()
            }
        } else if (res.time > 100) {
            if(!weakFlag){
                console.log("Network weak at " + new Date().toLocaleTimeString())
                weakDetected()
            }
        } else {
            if(!normalFlag){
                console.log("Network returned to normal")
                normalDetected()
            }
        }

    } catch (e) {
        console.log("Network lag")
    }
}, 1000)


