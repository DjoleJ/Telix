Meteor.methods({
    addPhone: (data) => {
        console.log(data);

        const last = Phones.find({}, { sort: { datum: -1 } }).fetch()[0].serial;

        Phones.insert({
            datum: new Date().getTime(),
            status: data.status,
            visible: true,
            prodavac: data.prodavac,
            modelUredjaja: data.model,
            imeiBroj: data.imei,
            oprema: data.oprema,
            otkupnaCena: data.cena,
            preporucenaCena: data.preporucenaCena,
            image: data.slika,
            serial: last+1
        })

        return { isError: false }
    },
    updatePhoneToNaStanju: (id, cena) => {
        Phones.update({ _id: id }, {
            $set: { status: 'naStanju' },
            $inc: { otkupnaCena: cena }
        })

        return { isError: false };
    },
    updatePhoneToProdato: (data) => {
        Phones.update({ _id: data.id }, {
            $set: { status: 'prodato', kupac: data.kupac, prodajnaCena: data.prodajnaCena, tipProdaje: data.tipProdaje, datumProdaje: new Date().getTime(),  }
        })

        const phone = Phones.find({ _id: data.id }).fetch()[0];

        if(data.komitent) {
            const profit = data.prodajnaCena - phone.otkupnaCena;
            
            Clients.update({ _id: data.komitent }, {
                $inc: { telefoni: profit }
            })
        }

        // const client = Clients.find({ imeIPrezime: data.kupac.imeIPrezime }).fetch()[0];

        // if(client) {
        //     if(client.kontaktTelefon === '/') {
        //         Clients.update({ imeIPrezime: data.kupac.imeIPrezime  }, {
        //             $inc: { telefoni: 1 },
        //             $set: { kontaktTelefon: data.kupac.kontaktTelefon }
        //         })
        //     } else {
        //         Clients.update({ imeIPrezime: data.kupac.imeIPrezime  }, {
        //             $inc: { telefoni: 1 }
        //         })
        //     }
        // } else {
        //     Clients.insert({
        //         imeIPrezime: data.kupac.imeIPrezime,
        //         kontaktTelefon: data.kupac.kontaktTelefon,
        //         servisi: 0,
        //         telefoni: 1,
        //         artikli: 0,
        //         artikli2: 0,
        //         delovi: 0
        //     })
        // }

        return { isError: false };
    },
    updatePhoneRateToPaid: (id, rata) => {
        let updateObj = {};

        if(rata === 'rata1') {
            updateObj = {
                'tipProdaje.rata1.placeno': true
            }
        } else if(rata === 'rata2') {
            updateObj = {
                'tipProdaje.rata2.placeno': true
            }
        } else if(rata === 'rata3') {
            updateObj = {
                'tipProdaje.rata3.placeno': true
            }
        }

        Phones.update({ _id: id }, {
            $set: updateObj
        })
    },
    updatePhoneRateToNotPaid: (id, rata) => {
        let updateObj = {};

        if(rata === 'rata1') {
            updateObj = {
                'tipProdaje.rata1.placeno': false
            }
        } else if(rata === 'rata2') {
            updateObj = {
                'tipProdaje.rata2.placeno': false
            }
        } else if(rata === 'rata3') {
            updateObj = {
                'tipProdaje.rata3.placeno': false
            }
        }

        Phones.update({ _id: id }, {
            $set: updateObj
        })
    },
    editPhone: (id, data) => {

        Phones.update({ _id: id }, {
            $set: data
        })

        return { isError: false };
    },
    removePhone: (id) => {
        Phones.update({ _id: id }, {
            $set: { visible: false }
        })

        return { isError: false };
    }
})