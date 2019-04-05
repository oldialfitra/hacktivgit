let urlLink = `http://localhost:5000/users/repos`

$(document).ready(function () {
    if (localStorage.getItem('token')) {
        $('.container').show()
        $('#googleIn').hide()
        $('#googleOut').show()
    }
    else {
        $('.container').hide()
        $('#googleIn').show()
        $('#googleOut').hide()
    }

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

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var id_token = googleUser.getAuthResponse().id_token;
    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', 'http://localhost:5000/users');
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.onload = function () {
    //     console.log('Signed in as: ' + xhr.responseText);
    // };
    // xhr.send('idtoken=' + id_token);
    $.ajax({
        url: 'http://localhost:5000/users',
        method: 'POST',
        data: {
            idToken: id_token
        }
    })
        .done(function (data) {
            console.log('masuk ke done========================')
            let html = ''
            console.log('ini token')
            console.log(data)
            localStorage.setItem('token', data.token)
            $('.container').show()
            $('#googleIn').hide()
            $('#googleOut').show()
            // $('.classTodo').show()
            // $('.addTodo').show()
            // $('.updateTodo').show()
            // $('.user').hide()
            // $('.logout').show()
            // $('.google').hide()
            // $('#updateTodo').hide()
        })
        .fail(function (err) {
            console.log(err.response)
        })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        console.log(localStorage.getItem('token'))
        // localStorage.removeItem('token')
        $('.container').hide()
        $('#googleIn').show()
        $('#googleOut').hide()
        localStorage.clear()
    });
}
