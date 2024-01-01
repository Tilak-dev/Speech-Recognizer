document.addEventListener("DOMContentLoaded", () => {
   const startBtn = document.querySelector(".startButton");
   const outPut = document.getElementById("outPut");
   const lastWord = document.getElementById("Refrence");
   let recognition;

   // this is for checking browser is supporting or not
   if ("SpeechRecognition" in window) {
      recognition = new SpeechRecognition();
   } else if ("webkitSpeechRecognition" in window) {
      recognition = new webkitSpeechRecognition();
   } else {
      lastWord.textContent =
         "Speech recognition is not supported in this browser.. SORRY";
      return;
   }

   recognition.lang = "en"; //set language

   //event handel when it start
   recognition.onstart = () => {
      outPut.textContent = "Listening...";
      changed(); //call function
   };

   //event handel when speech is recognized
   recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      outPut.textContent = `You Said: ${transcript}`;
   };

   //event handle when it produces errors
   recognition.onerror = (event) => {
      outPut.textContent = `This is a mistake: ${event.error}`;
      changed(); //call function
   };

   // when this process ends
   recognition.onend = () => {
      lastWord.textContent = "Speech Recognition is Ended. \n Come back Soon";
      changed(); //call function
   };

   //event listener for the start btn
   startBtn.addEventListener("click", () => {
      recognition.start();
   });

   function changed() {
      if (startBtn.innerHTML === "Tap To Start") {
         startBtn.innerHTML = "Stop";
      } else if (startBtn.innerHTML === "Stop") {
         startBtn.innerHTML = "Tap To Start";
      } else {
         startBtn.innerHTML = "Tap To Start";
      }
   }
});
