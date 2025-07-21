let bar=document.querySelector("#Sbar");
let searchbtn=document.querySelector("#Sbtn");
console.log(bar);

bar.addEventListener("input",()=>{
    let word=bar.value.trim();
    if(word!==""){
    searchbtn.disabled=false;}
    else{
        searchbtn.disabled=true;
        document.querySelector("#info").style.visibility="hidden";
    }
})
let currentSound = "";
let pronunciation = document.querySelector(".bi");
pronunciation.addEventListener("click", () => {
    let audio = document.querySelector("#myaudio");
    if (currentSound) {
        audio.src = currentSound;
        audio.play();
    } else {
        alert("sound not available");
        console.log("sound not available");
    }
});
searchbtn.addEventListener("click", () => {
    let info=document.querySelector("#info");
    info.style.visibility="visible";
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + bar.value.trim();
    fetch(url)
        .then((Response) => {
            return Response.json();
        }).then((data) => {
            console.log(data);
            let word = document.querySelector("#word");
            // Find first available audio
            let sound = "";
            for (let s of data[0].phonetics) {
                if (s.audio !== "") {
                    sound = s.audio;
                    break;
                }
            }
            currentSound = sound;
            word.innerText = bar.value.trim();
let list = document.querySelector("#meanings");
list.innerText="";
              data[0].meanings.forEach((val) => {
                let pos = val.partOfSpeech;
                let finalmeaning = val.definitions[0].definition;
                
                let li = document.createElement("li");
                let speech = document.createElement("p");
                let def = document.createElement("p");
                li.appendChild(speech);
               speech.innerText = pos;
               def.innerText = finalmeaning;
               speech.className="pos";
               list.appendChild(li);
               list.appendChild(def);
            }) 

        })
        .catch(() => {
            console.log("invalid word")
            alert("sorry word not found");
        });
});

