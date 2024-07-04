// Function to fetch a random meme from the Meme Generator API
function fetchMeme(caption) {
  fetch("https://api.imgflip.com/get_memes")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const memes = data.data.memes;
      const randomMeme = memes[Math.floor(Math.random() * memes.length)];
      const memeImageUrl = randomMeme.url;

      // Display the meme using the image tag with id "meme_image"
      const memeImage = document.getElementById("meme_image");
      memeImage.src = memeImageUrl;
    })
    .catch((error) => {
      console.error("Error fetching random meme:", error);
    });
}

let songPlaying = false;
let song;

function showLoadingAnimation() {
  const loadingAnimation = document.getElementById("loading_animation");
  const memeImage = document.getElementById("meme_image");
  memeImage.style.display = "none";
  loadingAnimation.style.display = "block";
}

function hideLoadingAnimation() {
  const loadingAnimation = document.getElementById("loading_animation");
  const memeImage = document.getElementById("meme_image");
  memeImage.style.display = "block";
  loadingAnimation.style.display = "none";
}

function playAudio(audio) {
  if(songPlaying) song.pause();
 var a1 = new Audio(audio);
  song = a1;
  songPlaying = true;
 a1.play();
  setTimeout(function () {
    a1.pause();
  }, 20000);
}

function captionMeme(
  templateId = "72261972",
  username = "itswhocares",
  password = "memes@2002",
  text0 = "MSDHONI",
  text1 = "thala for a reason"
) {
  const url = "https://api.imgflip.com/caption_image";
  const params = new URLSearchParams();
  input1 = document.getElementById("input1").value;
  let audio = "./bole_jo_koyal.mp3";



  if (input1 != "") {
    var hasNumber = /\d/;   
    if(hasNumber.test(input1)){
        let sum =0;
        let temp = parseInt(input1);
        while(temp != 0){
          sum+= temp%10;
          temp = parseInt(temp/10);
        }
    
        if(sum !=7){
          text0 = "No thala :(";
          text1 = "";
          templateId = 61539;
          audio = "./moye.mp3";
        }
        else{
          text0 = input1.replace(" ", "").split("").join("+") + " = 7";
        }
    }
    else{
      text0 = input1;
      if(text0.length == 7){
        text0 = text0.replace(" ", "").split("").join("+") + " = 7";
      }
      else{
        text0 = "No thala :(";
        text1 = "";
        templateId = 61539;
        audio = "./moye.mp3";
      }
    }
  }
  

  params.append("template_id", templateId);
  params.append("username", username);
  params.append("password", password);
  params.append("text0", text0);
  params.append("text1", text1);

  showLoadingAnimation();

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const memeImageUrl = data.data.url;
      const memeImage = document.getElementById("meme_image");
      memeImage.src = memeImageUrl;
      // Handle the response data here
      hideLoadingAnimation();
      playAudio(audio);
      return false;
    })
    .catch((error) => {
      console.error("Error captioning meme:", error);
      hideLoadingAnimation();
      return false;
    });  

  
  return false;
}
//fetchMeme();
