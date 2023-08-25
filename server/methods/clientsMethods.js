Meteor.methods({
    addClient: (data) => {
        console.log(data);

        Clients.insert({
            datum: new Date().getTime(),
            status: 'active',
            visible: true,
            imeIPrezime: data.ime,
            kontaktTelefon: data.kontakt,
            servisi: 0,
            telefoni: 0,
            artikli: 0,
            artikli2: 0,
            delovi: 0
        })

        return { isError: false }
    },
    editClient: (id, data) => {

        Clients.update({ _id: id }, {
            $set: data
        })

        return { isError: false };
    },
    removeClient: (id) => {
        const user = Meteor.users.find({ _id: Meteor.userId() }).fetch()[0];

        if(user.username === 'admin') {
            Clients.update({ _id: id }, {
                $set: { visible: false }
            })
    
            return { isError: false };
        } else {
            return { isError: true, error: 'Nemate dozvolu za ovu akciju.' };
        }
    }
})