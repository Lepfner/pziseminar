const api_url = "https://api.github.com/users/defunkt";
async function getapi(url) {
  const response = await fetch(url);
  var data = await response.json();
  document.getElementById("gitName").innerHTML = data.name;
  document.getElementById("gitLogin").innerHTML = data.login;
  document.getElementById("gitBio").innerHTML = data.bio;
  document.getElementById("gitFollowers").innerHTML = data.followers;
  document.getElementById("gitFollowing").innerHTML = data.following;
  document.getElementById("gitLink").innerHTML = data.blog;
}
getapi(api_url);

function getFromAPI(url, callback) {
  let obj;
  fetch(url)
    .then((res) => res.json())
    .then((data) => (obj = data))
    .then(() => callback(obj));
}

getFromAPI("https://api.github.com/users/defunkt/repos", getData);

function getData(arrOfObjs) {
  let results = "";

  arrOfObjs.slice(0, 6).map((x) => {
    function isPrivate(x) {
      if (x.private) {
        return "Private";
      } else {
        return "Public";
      }
    }
    function isDescNull(x) {
      if (x.description) {
        return x.description;
      } else {
        return "<p><br></p>";
      }
    }
    results +=
      `<div class='repo'><div class='topRowRepo'> <div><i class="fa fa-bookmark icons3"></i> <a href='${x.svn_url}' target='_blank' class='repoName'>` +
      x.name +
      "</a></div><p class='isPublic'>" +
      isPrivate(x) +
      "</p></div>";
    results += " <p class='gitDesc'>" + isDescNull(x) + "</p>";
    results +=
      "<div class='lastRowRepo'> <p>" +
      x.language +
      "</p>" +
      `<i class="fa fa-star icons3"></i> <p class='star'>` +
      x.stargazers_count +
      "</p>" +
      ` <div class='watch'><i class="fa fa-code-fork icons4"></i><p class='watchers'>` +
      x.watchers_count +
      "</p></div> </div>";
    results += " </div> ";
  });
  results += "";

  document.getElementById("repos").innerHTML = results;
}