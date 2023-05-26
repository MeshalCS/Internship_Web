function MyProfile() {
  //Meshal Almubarak
  //renders profile
  const renderProfile = (data) => {
    const greetUser = document.getElementById("greetUser");
    let skills = document.getElementById("profileSkills");
    let improve = document.getElementById("improve");
    let experience = document.getElementById("profileExp");
    greetUser.innerHTML = `Hello, ${data.name}!`;
    skills.innerHTML = `<div>${data.skills}</div>`;
    improve.innerHTML = `<div>${data.toWorkOn}</div>`;
    experience.innerHTML = `<div>${data.experience}</div>`;
  };

  //Meshal Almubarak
  //check the login user in session
  const userInSession = async () => {
    try {
      const res = await fetch("./profile/user/edit-profile");
      const profileData = await res.json();
      if (profileData.data) {
        renderProfile(profileData.data);
      }
    } catch (err) {
      alert(`There is an error ${err}`);
    }
  };

  userInSession();
}

// Amanda Au-Yeung
// render Charts
// Load the Visualization API and the corechart package.
// eslint-disable-next-line no-undef
google.charts.load("current", { packages: ["corechart"] });

// Set a callback to run when the Google Visualization API is loaded.
// eslint-disable-next-line no-undef
google.charts.setOnLoadCallback(drawChart);




MyProfile();
