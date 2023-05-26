//Meshal Almubarak
function JobClient() {
  const jobClient = {};
  const jobPosts = document.getElementById("jobPosts");

  //function that renders job posts
  const renderPosts = (posts) => {
    jobPosts.innerHTML = "";
    for (let p of posts) {
      const pDiv = document.createElement("div");
      pDiv.className = "card col-xs-3 col-sm-3";
      pDiv.style = "margin-bottom:2%;margin-left:2px";
      pDiv.innerHTML = `<div class="card-body">
      <div class="card-title" style="text-align:center; padding-bottom:2% ; padding-top:5%; font-size:large"><label>الجهة: <output>${p.company_name}</output></label></div>
      <div class="position" style="text-align:center; padding-bottom:2%"><label>المنصب: <output>${p.job_position}</output></label></div>
      <div style="text-align:center; padding-bottom:2%"><label>المدينة: <output>${p.city}</output></label></div>
      <div style="text-align:center; padding-bottom:2%"><label>المنطقة: <output>${p.state}</output></label></div>
      <div style="text-align:center; padding-bottom:2%"><label>Skills: <output>${p.skills}</output></label></div>
      <hr> 
      <div style="text-align:right;overflow:hidden; padding-bottom:2%"><label><a href=${p.job_url}>View More </a></label></div>   </div>
    </div>`;

      jobPosts.appendChild(pDiv);
    }
  };

  //function that gets the job posts
  const getPosts = async (_page) => {
    const res = await fetch(`./jobs/display-jobs/?page=${_page}`);
    const postData = await res.json();
    renderPosts(postData);
  };

  //function that searches posts
  const searchPosts = () => {
    const search = document.querySelector("input[type='search']");
    search.addEventListener("search", (evt) => {
      evt.preventDefault();
      findAllPosts(search.value);
    });
  };
  
  //function that searches posts from fetch
  const findAllPosts = async (keyword) => {
    try {
      const res = await fetch(`./jobs/search/?query=${keyword}`, {
        method: "POST",
        body: new URLSearchParams({ query: `${keyword}` }),
      });
      const resPosts = await res.json();
      if (resPosts.data.length === 0) {
        alert("No Search Results");
      } else {
        renderPosts(resPosts.data);
      }
    } catch (err) {
      alert(`There is an error ${err}`);
    }
  };

  //function that takes care of pagination
  const pagination = () => {
    let currPage = 1;
    let currClick = 1;
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    const p1 = document.getElementById("p1");
    const p2 = document.getElementById("p2");
    const p3 = document.getElementById("p3");
    const p4 = document.getElementById("p4");

    prev.addEventListener("click", (evt) => {
      evt.preventDefault();
      currPage -= 4;
      getCurrPage(currPage);
      getPosts(currClick);
    });

    next.addEventListener("click", (evt) => {
      evt.preventDefault();
      currPage += 4;
      getCurrPage(currPage);
      getPosts(currClick);
    });

    const getCurrPage = () => {
      if (currPage > 0) {
        p1.innerHTML = `${currPage}`;
        p2.innerHTML = `${currPage + 1}`;
        p3.innerHTML = `${currPage + 2}`;
        p4.innerHTML = `${currPage + 3}`;
      }
    };
    p1.addEventListener("click", (evt) => {
      evt.preventDefault();
      currClick = p1.innerHTML;
      getPosts(currClick);
    });
    p2.addEventListener("click", (evt) => {
      evt.preventDefault();
      currClick = p2.innerHTML;
      getPosts(currClick);
    });
    p3.addEventListener("click", (evt) => {
      evt.preventDefault();
      currClick = p3.innerHTML;
      getPosts(currClick);
    });
    p4.addEventListener("click", (evt) => {
      evt.preventDefault();
      currClick = p4.innerHTML;
      getPosts(currClick);
    });
  };

  pagination();
  getPosts();
  searchPosts();

  jobClient.getPosts = getPosts;
  return jobClient;
}
JobClient();
