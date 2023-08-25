Meteor.methods({
    addArticleSale: (data) => {
        console.log(data);

        const article = Articles.find({ _id: data.id  }).fetch()[0];

        const komitent = data.komitent === '0' ? null : data.komitent;

        if(data.komada <= article.komada) {
            ArticleSales.insert({
                articleId: data.id,
                datum: new Date().getTime(),
                artikal: data.artikal,
                kupac: data.kupac,
                komada: data.komada,
                cena: data.cena,
                profit: data.profit,
                ukupnaCena: data.komada * parseFloat(data.cena),
                komitent
            })
    
            Articles.update({ _id: data.id }, {
                $inc: { komada: -data.komada }
            })

            if(komitent) {
                const profit = data.profit * data.komada;
                
                Clients.update({ _id: komitent }, {
                    $inc: { artikli: profit }
                })
            }

            // const client = Clients.find({ imeIPrezime: data.kupac }).fetch()[0];

            // if(client) {
            //     Clients.update({ imeIPrezime: data.kupac }, {
            //         $inc: { artikli: 1 }
            //     })
            // } else {
            //     Clients.insert({
            //         imeIPrezime: data.kupac,
            //         kontaktTelefon: '/',
            //         servisi: 0,
            //         telefoni: 0,
            //         artikli: 1,
            //         artikli2: 0,
            //         delovi: 0
            //     })
            // }
    
            return { isError: false }
        } else {
            return { isError: true, error: 'Nema dovoljno komada.' }
        }
    },
    addArticleSaleTwo: (data) => {
        console.log(data);

        const article = ArticlesTwo.find({ _id: data.id  }).fetch()[0];

        const komitent = data.komitent === '0' ? null : data.komitent;

        if(data.komada <= article.komada) {
            ArticleSalesTwo.insert({
                articleId: data.id,
                datum: new Date().getTime(),
                artikal: data.artikal,
                kupac: data.kupac,
                komada: data.komada,
                cena: data.cena,
                profit: data.profit,
                ukupnaCena: data.komada * parseFloat(data.cena),
                komitent
            })
    
            ArticlesTwo.update({ _id: data.id }, {
                $inc: { komada: -data.komada }
            })

            if(komitent) {
                const profit = data.profit * data.komada;
                
                Clients.update({ _id: komitent }, {
                    $inc: { artikli2: profit }
                })
            }

            // const client = Clients.find({ imeIPrezime: data.kupac }).fetch()[0];

            // if(client) {
            //     Clients.update({ imeIPrezime: data.kupac }, {
            //         $inc: { artikli2: 1 }
            //     })
            // } else {
            //     Clients.insert({
            //         imeIPrezime: data.kupac,
            //         kontaktTelefon: '/',
            //         servisi: 0,
            //         telefoni: 0,
            //         artikli: 0,
            //         artikli2: 1,
            //         delovi: 0
            //     })
            // }
    
            return { isError: false }
        } else {
            return { isError: true, error: 'Nema dovoljno komada.' }
        }
    },
    editArticleSale: (id, data) => {

        ArticleSales.update({ _id: id }, {
            $set: data
        })

        return { isError: false };
    },
    editArticleSaleTwo: (id, data) => {

        ArticleSalesTwo.update({ _id: id }, {
            $set: data
        })

        return { isError: false };
    },
})