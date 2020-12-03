// add eventlistener to button
document.getElementById("search_form").addEventListener("submit", (e) => {
  e.preventDefault();

  // get text from input field
  const btn = document.querySelector("input[type='text']");
  const value = btn.value;

  // call url builder function
  urlBuilder(value);

  // reset input field
  btn.value = "";
});

// building the API endpoint URL
function urlBuilder(query) {
  const apiKey = "?api_key=4Jw38SAHQEWqebcuVaZOsFzPy10b4tqu&q=";
  const baseUrl = "https://api.giphy.com/v1/gifs/search";
  const limit = "&limit=1";
  const queryTerm = query;
  const endPointUrl = `${baseUrl}${apiKey}${queryTerm}${limit}`;
  callingAPI(endPointUrl);
}

// make API calls
function callingAPI(url) {
  // Make a request for a user with a given ID
  axios
    .get(url)
    .then(function (response) {
      // handle success
      const gifs = response.data.data;
      //console.log(gifs);
      //console.log(Array.isArray(gifs));

      gifs.forEach((gif) => {
        // build element
        //buildCard(gif.images.downsized.url);
        makeCard(
          gif.images.downsized.url,
          gif.import_datetime,
          gif.title,
          gif.rating
        );
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

// version 1 just display the gif
// function buildCard(imgs) {
//   const parentContainer = document.querySelector(".cards");

//   //const container = document.createElement("div");
//   const picture = document.createElement("img");

//   // add property to images
//   picture.src = imgs;

//   // put all together
//   parentContainer.appendChild(picture);
// }

// version 2
// initialize card building process
function makeCard(url, date, title, rating) {
  const newCard = makeContainer();
  const deck = document.querySelector(".cards");
  newCard.appendChild(cardImg(url));
  newCard.appendChild(cardText(date, title));
  newCard.appendChild(cardFooter(rating));
  deck.appendChild(newCard);
}

function makeContainer() {
  const container = document.createElement("div");
  container.setAttribute("class", "card");
  return container;
}

function cardImg(url) {
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  imgContainer.setAttribute("class", "card_image");
  img.src = url;
  imgContainer.appendChild(img);
  return imgContainer;
}

function cardText(date, title) {
  // gather parts
  const textContainer = document.createElement("div");
  const spandate = document.createElement("span");
  const spantitle = document.createElement("h2");
  const spanparag = document.createElement("p");

  // set attributes
  spandate.setAttribute("class", "date");
  textContainer.setAttribute("class", "card_text");

  // get value from arguments
  spandate.textContent = date;
  spantitle.textContent = title;
  spanparag.textContent = "this paragraph was generated dynamically";

  // put all together
  textContainer.appendChild(spandate);
  textContainer.appendChild(spantitle);
  textContainer.appendChild(spanparag);

  // return result
  return textContainer;
}

function cardFooter(rating) {
  // gather parts
  const footerContainer = document.createElement("div");
  //Likes
  const footerLikes = document.createElement("div");
  const likesValue = document.createElement("div");
  const likesType = document.createElement("div");
  //Ratings
  const footerRating = document.createElement("div");
  const ratingValue = document.createElement("div");
  const ratingType = document.createElement("div");
  //Delete button
  const footerDelete = document.createElement("div");

  // set attributes
  footerContainer.setAttribute("class", "footer");
  // -Likes
  footerLikes.setAttribute("class", "card_likes");
  likesValue.setAttribute("class", "value");
  likesType.setAttribute("class", "type");
  // -Rating
  footerRating.setAttribute("class", "card_rating");
  ratingValue.setAttribute("class", "value");
  ratingType.setAttribute("class", "type");
  footerDelete.setAttribute("class", "card_delete");
  // -Button
  footerDelete.setAttribute("class","delete");

  // get value from arguments
  // -Rating
  ratingValue.textContent = rating.toUpperCase();
  ratingType.textContent = "Rating";
  // -Likes
  likesValue.textContent = "354";
  likesType.textContent = "Likes";
  // -Delete
  footerDelete.textContent = "Delete";

  // put all together
  // -level 2
  // - - Rating
  footerRating.appendChild(ratingValue);
  footerRating.appendChild(ratingType);
  // - - Likes
  footerLikes.appendChild(likesValue);
  footerLikes.appendChild(likesType);


  // level 1
  footerContainer.appendChild(footerLikes);
  footerContainer.appendChild(footerRating);
  footerContainer.appendChild(footerDelete);
  footerContainer.appendChild(footerDelete);

  // return result
  return footerContainer;
}
