const input = document.querySelector('.form-control')
const container = document.querySelector('.card-content')

const requestRepo = (url, gitname) => {
    fetch(url)
        .then(repoData=> repoData.json())
        .then((jsonRepo) => {
            const repoList = document.querySelector('.card-text');
            let checkSize = 0;
            let projectName;
            for(let i=0; i < jsonRepo.length; i++) {
                if(jsonRepo[i].size > checkSize) {
                    checkSize = jsonRepo[i].size
                    projectName = jsonRepo[i].name
                }
            }
            repoList.innerHTML = `Son plus gros projet public est <a target="_BLANK" href="https://github.com/${gitname}/${projectName}"><strong>${projectName}</strong></a>`
            
        })
}

input.addEventListener('change', (e) => {
    e.preventDefault();
    e.stopPropagation();
    fetch(`https://api.github.com/users/${input.value}`)
    .then(data=> data.json())
    .then((jsonData) => {
        if(jsonData.repos_url.length > 0) {
            requestRepo(jsonData.repos_url, input.value)
        }
        container.innerHTML = 
        `<div class="card mb-3" style="max-width: 100%;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${jsonData.avatar_url}" class="img-fluid rounded-start" alt="Photo de profil github">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title text-center">${jsonData.name}</h5>
                        <p class="card-text"></p>
                    </div>
                </div>
            </div>
         </div>`
    })
})