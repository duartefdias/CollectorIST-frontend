var Credentials = {
    username: null,
    id: -1,
    rank: 0,
    token: null,


    getUsername: function() {
        return this.username
    },
    setUsername: function(username) {
        this.username = username
    },
    getId: function() {
        return this.id
    },
    setId: function(id) {
        this.id = id
    },
    getRank: function() {
        return this.rank
    },
    setRank: function(rank) {
        this.rank = rank
    },
    canEditWorks: function() {
        if(this.rank == 1 || this.rank == 2)
            return true
        else
            return false
    },
    setToken(newToken) {
        this.token = newToken
    }
}

export default Credentials