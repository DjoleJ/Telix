import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import localeEn from 'air-datepicker/locale/en';

Template.izvestaji.onCreated(function() {
    // Session.set('filterStatus', 'sve');
    // Session.set('updateServiceIdServisirano', null);
    // Session.set('updateServiceIdNaplaceno', null);
    // Session.set('viewDocId', null);

    // this.subscribe('services');
    Session.set('servicesProfit', 0);
    Session.set('phonesProfit', 0);
    Session.set('articleSalesProfit', 0);
    Session.set('articleSalesTwoProfit', 0);
    Session.set('partSalesProfit', 0);

    Session.set('izvestajiFrom', null);
    Session.set('izvestajiTo', null);

    this.subscribe('services');
    this.subscribe('phones');
    this.subscribe('articleSales');
    this.subscribe('articleSalesTwo');
    this.subscribe('partSales');
})

Template.izvestaji.onRendered(function() {
    new AirDatepicker('#izvestajiFrom', {
        locale: localeEn,
        dateFormat(date) {
            return date.toLocaleString('en', {
                year: 'numeric',
                day: '2-digit',
                month: 'long'
            });
        },
        onSelect({ date, formattedDate, datepicker }) {
            Session.set('izvestajiFrom', new Date(date).getTime());
            datepicker.hide();
        }
    });

    new AirDatepicker('#izvestajiTo', {
        locale: localeEn,
        dateFormat(date) {
            return date.toLocaleString('en', {
                year: 'numeric',
                day: '2-digit',
                month: 'long'
            });
        },
        onSelect({ date, formattedDate, datepicker }) {
            Session.set('izvestajiTo', new Date(date).getTime() + 86340000);
            datepicker.hide();
        }
    });
})

Template.izvestaji.helpers({
    getServicesProfit: () => {
        const from = Session.get('izvestajiFrom');
        const to = Session.get('izvestajiTo');

        let services;

        if(from && to) {
            services = Services.find({ status: 'naplaceno', datum: { $gte: from, $lte: to } }).fetch();
        } else if(from) {
            services = Services.find({ status: 'naplaceno', datum: { $gte: from } }).fetch();
        } else if(to) {
            services = Services.find({ status: 'naplaceno', datum: { $lte: to } }).fetch();
        } else {
            services = Services.find({ status: 'naplaceno' }).fetch();
        }

        let total = 0;

        services.forEach(srv => {
            total += srv.naplatnaCena - srv.nabavnaCena;
        })

        Session.set('servicesProfit', total);
        return total;
    },
    getPhonesProfit: () => {
        const from = Session.get('izvestajiFrom');
        const to = Session.get('izvestajiTo');

        let phones;

        if(from && to) {
            phones = Phones.find({ status: 'prodato', datumProdaje: { $gte: from, $lte: to } }).fetch();
        } else if(from) {
            phones = Phones.find({ status: 'prodato', datumProdaje: { $gte: from } }).fetch();
        } else if(to) {
            phones = Phones.find({ status: 'prodato', datumProdaje: { $lte: to } }).fetch();
        } else {
            phones = Phones.find({ status: 'prodato' }).fetch();
        }

        let total = 0;

        phones.forEach(pho => {
            total += pho.prodajnaCena - pho.otkupnaCena;
        })

        Session.set('phonesProfit', total);
        return total;
    },
    getArticleSalesProfit: () => {
        const from = Session.get('izvestajiFrom');
        const to = Session.get('izvestajiTo');

        let sales;

        if(from && to) {
            sales = ArticleSales.find({ datum: { $gte: from, $lte: to } }).fetch();
        } else if(from) {
            sales = ArticleSales.find({ datum: { $gte: from } }).fetch();
        } else if(to) {
            sales = ArticleSales.find({ datum: { $lte: to } }).fetch();
        } else {
            sales = ArticleSales.find({}).fetch();
        }

        let total = 0;

        sales.forEach(sal => {
            total += sal.profit * sal.komada;
        })

        Session.set('articleSalesProfit', total);
        return total;
    },
    getArticleSalesTwoProfit: () => {
        const from = Session.get('izvestajiFrom');
        const to = Session.get('izvestajiTo');

        let sales;

        if(from && to) {
            sales = ArticleSalesTwo.find({ datum: { $gte: from, $lte: to } }).fetch();
        } else if(from) {
            sales = ArticleSalesTwo.find({ datum: { $gte: from } }).fetch();
        } else if(to) {
            sales = ArticleSalesTwo.find({ datum: { $lte: to } }).fetch();
        } else {
            sales = ArticleSalesTwo.find({}).fetch();
        }

        let total = 0;

        sales.forEach(sal => {
            total += sal.profit * sal.komada;
        })

        Session.set('articleSalesTwoProfit', total);
        return total;
    },
    getPartSalesProfit: () => {
        const from = Session.get('izvestajiFrom');
        const to = Session.get('izvestajiTo');

        let sales;

        if(from && to) {
            sales = PartSales.find({ datum: { $gte: from, $lte: to } }).fetch();
        } else if(from) {
            sales = PartSales.find({ datum: { $gte: from } }).fetch();
        } else if(to) {
            sales = PartSales.find({ datum: { $lte: to } }).fetch();
        } else {
            sales = PartSales.find({}).fetch();
        }

        let total = 0;

        sales.forEach(sal => {
            total += sal.profit * sal.komada;
        })

        Session.set('partSalesProfit', total);
        return total;
    },
    getTotalProfit: () => {
        const services = Session.get('servicesProfit');
        const phones = Session.get('phonesProfit');
        const articles = Session.get('articleSalesProfit');
        const articlesTwo = Session.get('articleSalesTwoProfit');
        const parts = Session.get('partSalesProfit');

        return services + phones + articles + articlesTwo + parts;
    }
    // getServices: () => {
    //     const status = Session.get('filterStatus');
    //     if(status === 'sve') {
    //         return Services.find();
    //     } else {
    //         return Services.find({ status: status });
    //     }
    // },
    // ifFilterChecked: (value) => {
    //     const current = Session.get('filterStatus');
    //     console.log(value);
    //     console.log(current);
    //     return current === value ? 'checked' : '';
    // },
    // getFilterStatus: () => {
    //     return Session.get('filterStatus');
    // },
    // getServiceForView: () => {
    //     const id = Session.get('viewDocId');
    //     return Services.find({ _id: id }).fetch()[0];
    // },
    // getRowNumber: (index) => {
    //     return index+1;
    // }
})

Template.izvestaji.events({
    // 'click #btnSave'(event) {
    //     const ime = $('#imeIPrezime').val();
    //     const kontakt = $('#kontaktTelefon').val();
    //     const model = $('#modelUredjaja').val();
    //     const imei = $('#imeiBroj').val();
    //     const opis = $('#opisPosla').val();
    //     const cena = $('#ocekivanaCena').val();

    //     const data = {
    //         ime,
    //         kontakt,
    //         model,
    //         imei,
    //         opis,
    //         cena
    //     }

    //     Meteor.call('addService', data, (err, res) => {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             if (res.isError) {
    //                 console.log(res);
    //             } else {
    //                 console.log(res);

    //                 $('#imeIPrezime').val('');
    //                 $('#kontaktTelefon').val('');
    //                 $('#modelUredjaja').val('');
    //                 $('#imeiBroj').val('');
    //                 $('#opisPosla').val('');
    //                 $('#ocekivanaCena').val('');
    //             }
    //         }
    //     })
    // },
    // 'click #btnSaveFilter'(event) {
    //     const filter = $('input:radio[name="filterStatus"]:checked').val();
    //     Session.set('filterStatus', filter);
    // },
    // 'click #btnSwitch'(event) {
    //     const id = Session.get('updateServiceIdServisirano')

    //     Meteor.call('updateServiceToServisirano', id, (err, res) => {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             if (res.isError) {
    //                 console.log(res);
    //             } else {
    //                 console.log(res);
    //             }
    //         }
    //     })
    // },
    // 'click .to-servisirano'(event) {
    //     Session.set('updateServiceIdServisirano', this._id);
    // },
    // 'click .to-naplaceno'(event) {
    //     Session.set('updateServiceIdNaplaceno', this._id);
    // },
    // 'click .btn-view-doc'(event) {
    //     Session.set('viewDocId', this._id);
    // },
    // 'click #btnSaveUpdate'(event) {
    //     console.log(this);

    //     const nabavna = parseFloat($(`#nabavnaCena`).val());
    //     const naplatna = parseFloat($(`#naplatnaCena`).val());

    //     const data = {
    //         id: Session.get('updateServiceIdNaplaceno'),
    //         nabavnaCena: nabavna,
    //         naplatnaCena: naplatna
    //     }

    //     console.log(data);

    //     Meteor.call('updateServiceToNaplaceno', data, (err, res) => {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             if (res.isError) {
    //                 console.log(res);
    //             } else {
    //                 console.log(res);

    //                 $(`#nabavnaCena`).val('');
    //                 $(`#naplatnaCena`).val('');
    //                 Session.set('updateServiceIdNaplaceno', null);
    //             }
    //         }
    //     })
    // },
    // 'keyup #servisiSearch'(event) {
    //     const searchArr = [];
    //     if (event.target.value != "") {
    //         const items = $('.servisi-search-row');
    //         $('.servisi-search-row').attr('style', 'display: none !important');

    //         items.each(function(index) {
    //             const long = $(this).find('.servisi-search-target').text();
    //             // const short = long === 'EUR' ? 'EURO' : long === 'RSD' ? 'DINAR' : 'DOLLAR';
    //             console.log(long);
    //             // console.log(short);

    //             if (long.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1) {
    //                 $(this).attr('style', 'display: flex !important');
    //             }
    //         })
    //     } else {
    //         $('.servisi-search-row').attr('style', 'display: flex !important');
    //     }
    // },
})