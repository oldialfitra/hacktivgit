let urlLink = `http://localhost:5000/users/repos`

$(document).ready(function () {
    $.ajax({
        url: urlLink + '/starred',
        method: 'GET'
    })
        .done(function (response) {
            let html = ''
            response.forEach(e => {
                html += `<li>${e.full_name} <button type="button" class="btn btn-secondary" value="${e.name}" onclick="unstarRepo('${e.owner.login}', this.value)">Unstar</button></li>`
            });
            $(`#starred`).empty()
            $(`#starred`).append(html)
        })
        .fail(function (err) {
            console.log(err)
        })

    $.ajax({
        url: urlLink,
        method: 'GET'
    })
        .done(function (response) {
            let html = ''
            response.forEach(e => {
                html += `<li>${e.full_name}</li>`
            });
            $(`#myRepo`).empty()
            $(`#myRepo`).append(html)
        })
        .fail(function (err) {
            console.log(err)
        })

    $('#add-form').submit(function () {
        event.preventDefault();
        $.ajax({
            method: 'POST',
            url: urlLink,
            data: {
                name: $('#name').val()
            }
        })
            .done(newRepo => {
                $('#name').val('')
                $('#myRepo').append(`<li>${newRepo.full_name}</li>`)
            })
            .fail(err => {
                console.log(err)
            })
    })
})

function unstarRepo(username, repoName) {
    $.ajax({
        url: urlLink + `/unstar/${username}/${repoName}`,
        method: 'DELETE'
    })
        .done(function (response) {
            repoStarred('')
        })
        .fail(function (err) {
            console.log(err)
        })
}

function repoStarred(option) {
    $.ajax({
        url: urlLink + `/starred?name=${option}`,
        method: 'GET'
    })
        .done(function (response) {
            let html = ``
            response.forEach(e => {
                html += `<li>${e.full_name} <button type="button" class="btn btn-secondary" value="${e.name}" onclick="unstarRepo('${e.owner.login}', this.value)">Unstar</button></li>`
            })
            $('#nameStarred').val('')
            $(`#starred`).empty()
            $(`#starred`).append(html)
        })
        .fail(function (err) {
            console.log(err)
        })
}

function otherRepos(option) {
    $.ajax({
        url: urlLink + `/search?username=${option}`,
        method: 'GET'
    })
        .done(function (response) {
            let html = ''
            response.forEach(e => {
                html += `<li>${e.full_name}</li>`
            })
            $('#username').val('')
            $(`#otherRepo`).empty()
            $(`#otherRepo`).append(html)
        })
        .fail(function (err) {
            console.log(err)
        })
}
