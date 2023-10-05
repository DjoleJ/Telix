Meteor.startup(() => {
    // code to run on server at startup
    // Accounts.createUser({ username: 'gost', email: 'telix.guest@gmail.com', password: 'Telix2023' });

    // const phones = Phones.find({}, { sort: { datum: 1 } }).fetch();

    // let num = 0;

    // phones.forEach(pho => {
    //     num = num+1;
    //     console.log(num);
    //     Phones.update({ _id: pho._id }, {
    //         $set: { serial: num }
    //     })
    //     console.log('-----------------');
    // })

    // const arts = ArticlesTwo.find().fetch();

    // arts.forEach(ar => {
    //     const sifra = ar.sifra;
    //     const sifraFloat = parseFloat(sifra);
    //     console.log(sifra);
    //     console.log(sifraFloat);

    //     ArticlesTwo.update({ _id: ar._id }, {
    //         $set: { sifraNum: sifraFloat }
    //     })

    //     console.log('-----------------------');
    // })

    SyncedCron.start();
});
