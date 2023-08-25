Meteor.methods({
    addPartSale: (data) => {
        console.log(data);

        const part = Parts.find({ _id: data.id  }).fetch()[0];

        const komitent = data.komitent === '0' ? null : data.komitent;

        if(data.komada <= part.komada) {
            PartSales.insert({
                partId: data.id,
                datum: new Date().getTime(),
                deo: data.deo,
                proizvodjac: data.proizvodjac,
                model: data.model,
                kupac: data.kupac,
                komada: data.komada,
                cena: data.cena,
                profit: data.profit,
                ukupnaCena: data.komada * parseFloat(data.cena),
                komitent
            })
    
            Parts.update({ _id: data.id }, {
                $inc: { komada: -data.komada }
            })

            if(komitent) {
                const profit = data.profit * data.komada;
                
                Clients.update({ _id: komitent }, {
                    $inc: { delovi: profit }
                })
            }

            // const client = Clients.find({ imeIPrezime: data.kupac }).fetch()[0];

            // if(client) {
            //     Clients.update({ imeIPrezime: data.kupac }, {
            //         $inc: { delovi: 1 }
            //     })
            // } else {
            //     Clients.insert({
            //         imeIPrezime: data.kupac,
            //         kontaktTelefon: '/',
            //         servisi: 0,
            //         telefoni: 0,
            //         artikli: 0,
            //         artikli2: 0,
            //         delovi: 1
            //     })
            // }
    
            return { isError: false }
        } else {
            return { isError: true, error: 'Nema dovoljno komada.' }
        }
    },
    editPartSale: (id, data) => {

        PartSales.update({ _id: id }, {
            $set: data
        })

        return { isError: false };
    },
})