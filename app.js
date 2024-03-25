const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowecase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols="~!@#$%^&<*()_+-/{}:<>?|\/"
var password=""
let passwordLength=10
let checkCount=0

setIndicator("#ccc")

function handleSlider(){

    inputSlider.value=passwordLength
    lengthDisplay.innerText=passwordLength
}
handleSlider();

function setIndicator(color){
    indicator.style.backgroundColor=color
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`
}

function getRandomIntegeter(min,max){
    return Math.floor(Math.random()*(max-min))+min
}

function gnerateRandomNumber(){
    return getRandomIntegeter(0,9)
}
    
function getLowerALpha(){
    return String.fromCharCode(getRandomIntegeter(97,122))
}

function getUpperAlpha(){
    return String.fromCharCode(getRandomIntegeter(65,91))
}

function getSymbol(){
    return symbols[getRandomIntegeter(0,symbols.length)] 
}

function calculateStrength(){
    let hasupper=false;
    let haslower=false;
    let hasnumber=false;
    let hassymbol=false;
    if(uppercaseCheck.checked){
        hasupper=true
    }
    if(lowercaseCheck.checked){
        haslower=true

    }
    if(symbolsCheck.checked){
        hassymbol=true
    }
    if(numbersCheck.checked){
        hasnumber=true

    }
    
    if (hasupper && haslower&&hassymbol&&hasnumber && passwordLength>=8){
        setIndicator("#0f0")
    }
    else if((haslower||hasupper)&&(hassymbol||hasnumber)&&passwordLength>=6){
        setIndicator("#ff0")
    }
    else{
        setIndicator("#f00")
    }
}   

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value)
        copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="Failed"
    }
    copyMsg.classList.add("active")
    setTimeout(()=>{
        copyMsg.classList.remove("active")
    },2000);
}

function handleCheckBox(){
    checkCount=0;
    allCheckBox.forEach((box)=>{
        if(box.checked)
            checkCount++;
    })

    if(passwordLength<checkCount){
        passwordLength=checkCount
        handleSlider()
}}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBox)
})

inputSlider.addEventListener("input",(obj)=>{
    passwordLength=obj.target.value;
    handleSlider()
})
copyBtn.addEventListener("click",(obj)=>{
    if(passwordDisplay.value){
        copyContent()      
    }
})

function shuffle(array){
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); 
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str=""
    array.forEach((el)=>{
        str+=el
    })
    return str;
}

generateBtn.addEventListener("click",(obj)=>{
    if(checkCount==0){
        return
    }
    if(passwordLength<checkCount){
        passwordLength=checkCount
        handleSlider()
    }
    password=""
    let funcarr=[]
    if(uppercaseCheck.checked){
        funcarr.push(getUpperAlpha)
    }
    if(lowercaseCheck.checked){
        funcarr.push(getLowerALpha)
    }
    if(symbolsCheck.checked){
        funcarr.push(getSymbol)
    }
    if(numbersCheck.checked){
        funcarr.push(gnerateRandomNumber)
    }
    for (let i = 0; i < funcarr.length; i++) {
        password += funcarr[i]();
    }
    for(let i=0;i<passwordLength-funcarr.length;i++){
        const randomint=getRandomIntegeter(0,funcarr.length)
        password+=funcarr[randomint]()
    }
    password=shuffle(Array.from(password))
    passwordDisplay.value=password
    calculateStrength()
})