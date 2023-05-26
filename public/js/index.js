//Meshal Almubarak
function Home() {
  const myProfile = document.getElementById("profile");
  
  
  myProfile.addEventListener("click", (evt) => {
    evt.preventDefault();
    checkUserInSession("profile");
  });

  //function that checks if user is logged in before giving access to profile page
  const checkUserInSession = async (page) => {
    let res;
    try {
      res = await fetch("./sign-in/getUserProfile");
      const currUser = await res.json();
      if (!currUser.isLoggedIn) {
        alert("Please sign in");
        window.location.replace("/sign-in");
      } else {
        page === "profile"
          ? window.location.replace("/profile")
          : window.location.replace("/");
      }
    } catch (err) {
      console.error(err);
    }
  };
}
Home();
