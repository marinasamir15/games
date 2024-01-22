
///<reference types="../@types/jquery" />
let links=document.querySelectorAll(".nav-item a")
console.log(links)
async function getGames(categories){
  const loader = document.querySelector(".loading");
  loader.classList.remove("d-none");
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3c21bc6b27msh607677cf77cc5afp1a3f83jsn269afbe53bbe',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }};
  let Games=await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categories}`,options) ;
  let data=await Games.json()
  diplayGames(data)
  show()
  loader.classList.add("d-none");

}
getGames("mmorpg")
for(let i=0; i< links.length ;i++){
  links[i].addEventListener("click",function(e){
    document.querySelector(".nav-link.active").classList.remove("active");
    e.target.classList.add("active");
    let cardCategory=e.target.getAttribute("card-category")
    getGames(cardCategory)
  })
}

function diplayGames(data){
  let cartona=''
  for(let i=0;i<data.length;i++){
    cartona +=`
    <div class="col-md-3">
              <div class="card h-100" card-id="${data[i].id}" >
                <img card-id="${data[i].id}" src="${data[i].thumbnail}" class="card-img-top" alt="card-img">
                <div card-id="${data[i].id}" class="mt-3 card-head d-flex justify-content-around align-items-center">
                  <h4 card-id="${data[i].id}" class="card-title">${data[i].title}</h4>
                <span card-id="${data[i].id}" class="p-2 badge bg-primary">free</span>
                </div>
                <p card-id="${data[i].id}" class="card-text mt-3 text-center mb-1 small ">${data[i].short_description.split(" ",10)}</p>
               
                <div card-id="${data[i].id}" class="card-body d-flex justify-content-around align-items-center ">
                 
                  <span card-id="${data[i].id}" class="badge me-3 text-uppercase">${data[i].genre}</span>
                  <span card-id="${data[i].id}" class="badge ">${data[i].platform}</span>
                </div>
              </div>
            </div>
    `
  }
  document.getElementById("displayGames").innerHTML=cartona
}
function show(){
let cards=document.querySelectorAll(".card")

for(let i=0; i< cards.length ;i++){
  cards[i].addEventListener("click",function(e){
   
    let cardID =e.target.getAttribute("card-id")
     console.log(cardID)
     getGameDetails(cardID)
     document.getElementById("game-details").classList.remove("d-none");
     document.getElementById("games").classList.add("d-none");

  })
}}

 async function getGameDetails(cardID){
  const loader = document.querySelector(".loading");
  loader.classList.remove("d-none");
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '3c21bc6b27msh607677cf77cc5afp1a3f83jsn269afbe53bbe',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
  
  const game = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${cardID}`,options);
  let data=await game.json();
  console.log(data)
  displaygame(data)
  loader.classList.add("d-none");
}

function displaygame(data){
  let cartona=`
  <div class="row">
          <div class="col-md-4">
            <div class="game-img">
              <img src="${data.thumbnail}" class="w-100" alt="">
            </div>
          </div>
          <div class="col-md-8">
            <div class="game-info">
              <h3>Title:${data.title}</h3>
              <p>Category: <span class="badge text-bg-info text-uppercase">${data.genre}</span></p>
              <p>Platform:  <span class="badge text-bg-info">${data.platform}</span></p>
              <p>Category: <span class="badge text-bg-info">${data.status}</span></p>
              <p>
               ${data.description}
              </p>
         <a href="${data.game_url}"target="_blank"><button class="btn btn-outline-warning">SHOW GAME</button></a>   

            </div>
          </div>
        </div>
  `
  document.getElementById("game").innerHTML=cartona;
 document.getElementById("btnClose").addEventListener("click",function(){
  document.getElementById("games").classList.remove("d-none");
  document.getElementById("game-details").classList.add("d-none");
 })
}
