//Meshal Almubarak
//Login authentication module
function Login() {
  const clientUser = {};
  //currUser is the user in session
  let currUser = null;
  clientUser.currUser = currUser;

  //show message function
  const showMsg = (msg) => {
    alert(msg);
  };

  //redirect function
  const redirect = (page) => {
    window.location.replace(`/${page}`);
  };

  //function that listens to form and on submit authenticates user login
  clientUser.setupLogin = () => {
    const form = document.querySelector("form#stripe-login");
    let res;
    if (form) {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        authenticate(form);
      });
    }

    //authenticate function
    const authenticate = async (_form) => {
      try {
        res = await fetch("./sign-in", {
          method: "POST",
          body: new URLSearchParams(new FormData(_form)),
        });
        const resUser = await res.json();
        //if user is logged in, redirect to profile page
        if (resUser.isLoggedIn) {
          //this sets user in session
          clientUser.currUser = resUser.user;
          redirect("profile");
        } else {
          showMsg(resUser.err);
        }
      } catch (err) {
        alert(`There is an error, ${err}`);
        console.error(err);
      }
    };
  };
  //function that logs user out
  clientUser.setupLogout = () => {
    const logoutLink = document.getElementById("logout");
    if (logoutLink) {
      logoutLink.addEventListener("click", (evt) => {
        evt.preventDefault();
        logout();
      });
    }

    const logout = async () => {
      try {
        const res = await fetch("/sign-in/logout");
        const resLogout = await res.json();
        showMsg(resLogout.msg);
        setTimeout(() => redirect("sign-in", 2000));
      } catch (err) {
        alert(`There is some error ${err}`);
        console.error(err);
      }
    };
  };
  clientUser.setupLogin();
  clientUser.setupLogout();

  return clientUser;
}

Login();
