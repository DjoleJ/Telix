Meteor.methods({
    addService: (data) => {
        console.log(data);

        const komitent = data.komitent === '0' ? null : data.komitent;

        Services.insert({
            datum: new Date().getTime(),
            status: 'primljeno',
            visible: true,
            imeIPrezime: data.ime,
            kontaktTelefon: data.kontakt,
            modelUredjaja: data.model,
            imeiBroj: data.imei,
            opisPosla: data.opis,
            ocekivanaCena: data.cena,
            obojen: false,
            komitent
        })

        return { isError: false }
    },
    updateServiceToServisirano: (id) => {
        Services.update({ _id: id }, {
            $set: { status: 'servisirano' }
        })

        return { isError: false };
    },
    updateServiceToNaplaceno: (data) => {
        const service = Services.find({ _id: data.id }).fetch()[0];

        Services.update({ _id: data.id }, {
            $set: { status: 'naplaceno', nabavnaCena: data.nabavnaCena, naplatnaCena: data.naplatnaCena }
        })

        if(service.komitent) {
            const profit = data.naplatnaCena - data.nabavnaCena;
            
            Clients.update({ _id: service.komitent }, {
                $inc: { servisi: profit }
            })
        }

        // const client = Clients.find({ imeIPrezime: service.imeIPrezime }).fetch()[0];

        // if(client) {
        //     if(client.kontaktTelefon === '/') {
        //         Clients.update({ imeIPrezime: service.imeIPrezime }, {
        //             $inc: { servisi: 1 },
        //             $set: { kontaktTelefon: service.kontaktTelefon }
        //         })
        //     } else {
        //         Clients.update({ imeIPrezime: service.imeIPrezime }, {
        //             $inc: { servisi: 1 }
        //         })
        //     }
        // } else {
        //     Clients.insert({
        //         imeIPrezime: service.imeIPrezime,
        //         kontaktTelefon: service.kontaktTelefon,
        //         servisi: 1,
        //         telefoni: 0,
        //         artikli: 0,
        //         artikli2: 0,
        //         delovi: 0
        //     })
        // }

        return { isError: false };
    },
    updateServiceToVraceno: (data) => {

        Services.update({ _id: data.id }, {
            $set: { status: 'vraceno' }
        })

        return { isError: false };
    },
    editService: (id, data) => {

        Services.update({ _id: id }, {
            $set: data
        })

        return { isError: false };
    },
    removeService: (id) => {
        Services.update({ _id: id }, {
            $set: { visible: false }
        })

        return { isError: false };
    }
})