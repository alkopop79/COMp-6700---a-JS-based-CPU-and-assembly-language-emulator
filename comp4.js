var regA = 0;
var regB = 0;
var accu = 0;
var rom = [];
var instCount = 0;
var flag1 = 0;
var stopState = 0;
var inst = "";

function eval() {
    inst = document.getElementById("text_f").value;
    parseInst(inst);
};

function parseInst(instString) {
    
    if (instString.includes("LDA")) {                   //ERROR1
        var strSplitA = instString.split(":");
        regA = parseInt(strSplitA[1]);
        document.getElementById("regA").innerHTML = regA;
        instCount++;
        document.getElementById("demo").innerHTML = "load register A: " + strSplitA[1]+" type of: "+typeof regA;

    } else if (instString.includes("LDB")) {
        var strSplitB = instString.split(":");
        regB = parseInt(strSplitB[1]);
        document.getElementById("regB").innerHTML = regB;
        instCount++;
        document.getElementById("demo").innerHTML = "load register B: " + strSplitB[1]+" type of: "+typeof regB;

    } else if (instString == "ADD") {
        accu = regA + regB;
        document.getElementById("demo").innerHTML = "add " + regA + "+" + regB + "=" + accu;
        document.getElementById("accu").innerHTML = accu;
        instCount++;

    } else if (instString.includes("JMP")) {
        var jumpTo = instString.split(":");
        instCount = parseInt(jumpTo[1]);
        document.getElementById("demo").innerHTML = "jump to: " + instCount+" typeof: "+typeof instCount;
        document.getElementById("count").innerHTML = instCount;
        runStop(stopState,parseInt(jumpTo[1]));                 // ERROR2
        


    } else if (instString == "CMP") {
        if (regA === regB) {
            flag1 = 1;
            instCount++;
            document.getElementById("flag1").innerHTML = 1;
            document.getElementById("demo").innerHTML = "flag1 set to 1";
         } else {
            flag1 = 0;
            instCount++;
            document.getElementById("flag1").innerHTML = 0;
            document.getElementById("demo").innerHTML = "flag1 set to 0";
        };


    } else if (instString.includes("INC")) {
        var incRegister = instString.split(":");
        switch (incRegister[1]) {
        case "A":
            regA++;
            document.getElementById("demo").innerHTML = "case A";
            document.getElementById("regA").innerHTML = regA;
            instCount++;
            break;
        case "B":
            regB++;
            document.getElementById("demo").innerHTML = "case B";
            document.getElementById("regB").innerHTML = regB;
            instCount++;
            break;
        default:
            document.getElementById("demo").innerHTML = "error: register name";
            break;
        }

    } else {
        document.getElementById("demo").innerHTML = "error: no instruction";

    };
};


function saveToRom() {
      var romString = document.getElementById("text_f").value;
    rom = romString.split(",");
    document.getElementById("rom").innerHTML = rom;
    document.getElementById("demo").innerHTML = "#debug:save to rom";
};

function step() {
    parseInst(rom[instCount]);
    document.getElementById("count").innerHTML = instCount;
};

function run() {
    stopState = 0;
    document.getElementById("demo").innerHTML = "run";
    runStop(stopState,instCount);
    };

function stop(){
    stopState = 1;
    document.getElementById("demo").innerHTML = "stop";
    runStop(stopState,instCount);
};

function runStop(stopSt,instructionCount){
    if(stopSt == 0){
       for(var i=instructionCount;i<rom.length;i++){
//           parseInSt(rom[i]);                                  // ERROR3
                rom[i];
        document.getElementById("demo").innerHTML = "#runStop(): stopState: "+stopState+" for loop length: " + rom.length;
       }
   } else {
        document.getElementById("demo").innerHTML = "#runStop(): stopState: "+stopState;  
   };
};

function reset() {
    document.getElementById("demo").innerHTML = "debug: reset";
    regA = 0;
    regB = 0;
    accu = 0;
    flag1 = 0;
    instCount = 0;
    document.getElementById("regA").innerHTML = regA;
    document.getElementById("regB").innerHTML = regB;
    document.getElementById("accu").innerHTML = accu;
    document.getElementById("count").innerHTML = instCount;
    document.getElementById("flag1").innerHTML = flag1;
};