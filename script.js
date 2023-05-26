const { results } = await fetch(
  "https://pokeapi.co/api/v2/pokemon?offset=20&limit=1261"
).then((response) => response.json());
const asdasd = await fetch(
  "https://pokeapi.co/api/v2/pokemon-species/23/"
).then((response) => response.json());

const container = document.querySelector(".container");
const search_input = document.querySelector(".search_input")

//무한스크롤
let count = 0;
render(results, count , 50);
count += 50;

let onfocus_input = false 

search_input.addEventListener("focus" , function(){onfocus_input = true})
search_input.addEventListener("input" , function(){
  // e.preventDefault();
  let value = this.value.trim("") 
  if(value === "") {
    onfocus_input = false;
  }
  container.innerHTML = ""
  count = 0;
  console.log(results)
  const search_arr = results.filter(e => e.name.includes(value))
  console.log(search_arr.length)
  render(search_arr , count , 20)
})
window.addEventListener("scroll", function () {
  console.log(onfocus_input);
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight && onfocus_input == false) {
    render(results , count , 50); 
    count += 50;
  }
});

async function render(results , count , count_slice) {
  const render_poke = results.slice(count, count + count_slice);
  for (let i = 0; i < render_poke.length; i++) {
    const poke = await fetch(render_poke[i].url).then((response) =>
      response.json()
    );
    const type_container = document.createElement("div");
    type_container.classList.add("type_container");
    poke.types.forEach((e) => {
      const typebox = document.createElement("div");
      let type_background = type_choice(e.type.name);
      typebox.style.background = type_background;
      typebox.textContent = e.type.name;
      type_container.append(typebox);
    });
    const box = document.createElement("div");
    box.classList.add("box");
    let innerimg = poke.sprites.versions?.["generation-v"]?.["black-white"].animated.front_default;
    box.innerHTML = `
    <img src="${!innerimg ? poke.sprites.front_default : innerimg}" alt="">
    <p>${poke.name}</p>
    `;
    box.append(type_container);
    container.appendChild(box);
    // console.log(poke);
    // console.log(poke.sprites.front_default);
  }
}

function type_choice(type) {
  let background;
  switch (type) {
    case "ice":
      background = "skyblue";
      break;
    case "grass":
      background = "green";
      break;
    case "fire":
      background = "red";
      break;
    case "fighting":
      background = "orange";
      break;
    case "flying":
      background = "mediumspringgreen";
      break;
    case "water":
      background = "#2a4dff";
      break;
    case "rock":
      background = "#ccc";
      break;
    case "ground":
      background = "brown";
      break;
    case "psychic":
      background = "violet";
      break;
    case "steel":
      background = "silver";
      break;
    case "poison":
      background = "#a374db";
      break;
    case "dragon":
      background = "indigo";
      break;
    case "electric":
      background = "yellow";
      break;
    case "bug":
      background = "rgb(105, 220, 149)";
      break;
    case "dark":
      background = "rgb(134, 134, 134)";
      break;
    case "ghost":
      background = "rgb(164, 90, 201)";
      break;
    case "rock":
      background = "#ccc";
      break;

    default:
      background = "pink";
      break;
  }
  return background;
}
