const axios = require('axios'),
    github = axios.create({
        baseURL: 'https://api.github.com'
    })

github.defaults.headers.common['Authorization'] = `token ${process.env.TOKEN}`

class Repository {

    static repoStarred(req, res) {
        github
            .get('/user/starred', {
                params: {
                    sort: 'created'
                }
            })
            .then(function ({ data }) {
                if (data.length === 0) {
                    res.status(404).json({
                        msg: 'Not found'
                    })
                } else {
                    if (req.query.name) {
                        let result = []
                        data.forEach(e => {
                            if (e.name.indexOf(req.query.name) !== -1) {
                                result.push(e)
                            }
                        });
                        res.status(200).json(result)
                    }
                    else {
                        res.status(200).json(data)
                    }
                }

            })
            .catch(function (err) {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static repoCreate(req, res) {
        console.log('masuk ke create')
        console.log(req.body)
        github
            .post('/user/repos', {
                name: req.body.name,
                auto_init: true
            })
            .then(function ({ data }) {
                res.status(201).json(data)
            })
            .catch(function (err) {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static repoSearch(req, res) {
        github
            .get(`/users/${req.query.username}/repos`)
            .then(function ({ data }) {
                res.status(200).json(data)
            })
            .catch(function (err) {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static unstar(req, res) {
        github.delete(`/user/starred/${req.params.owner}/${req.params.name}`)
            .then(function ({ data }) {
                res.status(200).json(data)
            })
            .catch(function (err) {
                res.status(500).json({
                    msg: err.message
                })
            })
    }

    static repoSelf(req, res) {
        github
            .get('/user/repos', {
                params: {
                    affiliation: 'owner'
                }
            })
            .then(function ({ data }) {
                if (data.length === 0) {
                    res.status(404).json({
                        msg: 'Not found'
                    })
                } else {
                    res.status(200).json(data)
                }

            })
            .catch(function (err) {
                res.status(500).json({
                    msg: err.message
                })
            })
    }
}

module.exports = Repository