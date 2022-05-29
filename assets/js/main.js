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
        console.table(jsonData)
        if(jsonData.repos_url.length > 0) {
            requestRepo(jsonData.repos_url, input.value)
        }
        container.innerHTML = 
         `<div class="card" style="width: 18rem;">
            <img src="${jsonData.avatar_url}" class="card-img-top" alt="Photo de profil github">
            <div class="card-body">
                <h5 class="card-title">${jsonData.name}</h5>
                <p class="card-text"></p>
                <a target="_BLANK" href="https://github.com/${input.value}" class="btn btn-primary">Voir son profil</a>
            </div>
          </div>`
    })
})