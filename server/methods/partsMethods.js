Meteor.methods({
    addPart: (data) => {
        console.log(data);

        Parts.insert({
            datum: new Date().getTime(),
            status: 'naStanju',
            naziv: data.naziv,
            proizvodjac: data.proizvodjac,
            model: data.model,
            nabavnaCena: data.nabavnaCena,
            prodajnaCena: data.prodajnaCena,
            komada: data.komada
        })

        return { isError: false }
    },
    increaseParts: (id, num) => {
        Parts.update({ _id: id }, {
            $inc: { komada: num }
        })

        return { isError: false };
    },
    changePartStatus: (id) => {
        Parts.update({ _id: id }, {
            $set: { status: 'vanStanja' }
        })

        return { isError: false };
    },
    // updateServiceToNaplaceno: (data) => {
    //     Services.update({ _id: data.id }, {
    //         $set: { status: 'naplaceno', nabavnaCena: data.nabavnaCena, naplatnaCena: data.naplatnaCena }
    //     })

    //     return { isError: false };
    // },
    editPart: (id, data) => {

        Parts.update({ _id: id }, {
            $set: data
        })

        return { isError: false };
    },
})