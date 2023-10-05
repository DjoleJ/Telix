Meteor.methods({
    addArticle: (data) => {
        console.log(data);

        const sifraNum = parseFloat(data.sifra);

        Articles.insert({
            datum: new Date().getTime(),
            naziv: data.naziv,
            sifra: data.sifra,
            sifraNum,
            nabavnaCena: data.nabavnaCena,
            prodajnaCena: data.prodajnaCena,
            komada: data.komada
        })

        return { isError: false }
    },
    increaseArticle: (id, num) => {
        Articles.update({ _id: id }, {
            $inc: { komada: num }
        })

        return { isError: false };
    },
    addArticleTwo: (data) => {
        console.log(data);

        const sifraNum = parseFloat(data.sifra);

        ArticlesTwo.insert({
            datum: new Date().getTime(),
            naziv: data.naziv,
            sifra: data.sifra,
            sifraNum,
            nabavnaCena: data.nabavnaCena,
            prodajnaCena: data.prodajnaCena,
            komada: data.komada
        })

        return { isError: false }
    },
    increaseArticleTwo: (id, num) => {
        ArticlesTwo.update({ _id: id }, {
            $inc: { komada: num }
        })

        return { isError: false };
    },
    // updateServiceToNaplaceno: (data) => {
    //     Services.update({ _id: data.id }, {
    //         $set: { status: 'naplaceno', nabavnaCena: data.nabavnaCena, naplatnaCena: data.naplatnaCena }
    //     })

    //     return { isError: false };
    // },
    editArticle: (id, data) => {

        Articles.update({ _id: id }, {
            $set: data
        })

        return { isError: false };
    },
    editArticleTwo: (id, data) => {

        ArticlesTwo.update({ _id: id }, {
            $set: data
        })

        return { isError: false };
    }
})