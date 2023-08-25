Template.artikli.onCreated(function() {
    Session.set('filterStatus', 'sve');
    Session.set('updateServiceIdServisirano', null);
    Session.set('updateServiceIdNaplaceno', null);
    Session.set('viewDocId', null);
    Session.set('articlePlusId', null);
    Session.set('articleMinusId', null);


    this.subscribe('articles');
    this.subscribe('articleSales');
    this.subscribe('clients');
})

Template.artikli.onRendered(function() {
    // $('[data-toggle="tooltip"]').tooltip();
})

Template.artikli.helpers({
    getArticles: () => {
        return Articles.find({}, { sort: { sifra: 1 } });
    },
    getArticleSales: () => {
        return ArticleSales.find();
    },
    ifFilterChecked: (value) => {
        const current = Session.get('filterStatus');
        return current === value ? 'checked' : '';
    },
    getFilterStatus: () => {
        return Session.get('filterStatus');
    },
    getServiceForView: () => {
        const id = Session.get('viewDocId');
        return Services.find({ _id: id }).fetch()[0];
    },
    getClients: () => {
        return Clients.find({}, { sort: { imeIPrezime: 1 } });
    },
    hasContact: (contact) => {
        // const client = Clients.find({  })
        return contact !== '';
    },
    getArticleForView: () => {
        const id = Session.get('viewDocId');
        return Articles.find({ _id: id }).fetch()[0];
    },
    getArticleSaleForView: () => {
        const id = Session.get('viewDocId');
        return ArticleSales.find({ _id: id }).fetch()[0];
    },
})

Template.artikli.events({
    'click #btnSave'(event) {
        const naziv = $('#naziv').val();
        const sifra = $('#sifra').val();
        const nabavnaCena = $('#nabavnaCena').val() === '' ? 0 : $('#nabavnaCena').val();
        const prodajnaCena = $('#prodajnaCena').val() === '' ? 0 : $('#prodajnaCena').val();
        const komada = $('#komada').val() === '' ? 0 : parseFloat($('#komada').val());

        const data = {
            naziv,
            sifra,
            nabavnaCena,
            prodajnaCena,
            komada
        }

        Meteor.call('addArticle', data, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                if (res.isError) {
                    console.log(res);
                } else {
                    // console.log(res);

                    $('#naziv').val('');
                    $('#sifra').val('');
                    $('#nabavnaCena').val('');
                    $('#prodajnaCena').val('');
                    $('#komada').val('');
                }
            }
        })
    },
    'click #btnSaveFilter'(event) {
        const filter = $('input:radio[name="filterStatus"]:checked').val();
        Session.set('filterStatus', filter);
    },
    'click #btnPlus'(event) {
        const id = Session.get('articlePlusId');
        const num = parseFloat($('#formPlusKomada').val());

        Meteor.call('increaseArticle', id, num, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                if (res.isError) {
                    console.log(res);
                } else {
                    // console.log(res);

                    $('#formPlusKomada').val('')
                }
            }
        })
    },
    'click #btnMinus'(event) {
        const id = Session.get('articleMinusId');
        const kupac = $('#formMinusKupac').val();
        const komada = parseFloat($('#formMinusKomada').val());

        const komitent = $('#formMinusKomitent').val();

        const article = Articles.find({ _id: id }).fetch()[0];

        const data = {
            id: id,
            artikal: article.naziv,
            kupac: kupac,
            komada: komada,
            cena: article.prodajnaCena,
            profit: article.prodajnaCena - article.nabavnaCena,
            komitent
        }

        Meteor.call('addArticleSale', data, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                if (res.isError) {
                    console.log(res);
                    Bert.alert(res.error, 'danger');
                } else {
                    // console.log(res);

                    $('#formMinusKupac').val('');
                    $('#formMinusKomada').val('');
                    $('#formMinusKomitent').val('0');
                    Session.set('articleMinusId', null);
                }
            }
        })
    },
    'click .to-servisirano'(event) {
        Session.set('updateServiceIdServisirano', this._id);
    },
    'click .to-naplaceno'(event) {
        Session.set('updateServiceIdNaplaceno', this._id);
    },
    'click .btn-view-doc'(event) {
        Session.set('viewDocId', this._id);
    },
    'click .btn-plus-articles'(event) {
        Session.set('articlePlusId', this._id);
    },
    'click .btn-minus-articles'(event) {
        Session.set('articleMinusId', this._id);
    },
    'click .btn-edit-doc'(event) {
        Session.set('viewDocId', this._id);
    },
    'click #btnSaveUpdate'(event) {

        const nabavna = $(`#nabavnaCena`).val() === '' ? 0 : parseFloat($(`#nabavnaCena`).val());
        const naplatna = $(`#naplatnaCena`).val() === '' ? 0 : parseFloat($(`#naplatnaCena`).val());

        const data = {
            id: Session.get('updateServiceIdNaplaceno'),
            nabavnaCena: nabavna,
            naplatnaCena: naplatna
        }

        Meteor.call('updateServiceToNaplaceno', data, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                if (res.isError) {
                    console.log(res);
                } else {
                    // console.log(res);

                    $(`#nabavnaCena`).val('');
                    $(`#naplatnaCena`).val('');
                    Session.set('updateServiceIdNaplaceno', null);
                }
            }
        })
    },
    'click .table-title'(event) {
        $(event.target).siblings('.table-main').slideToggle();
        $(event.target).toggleClass('closed');
    },
    'keyup #artikliSearch'(event) {
        const searchArr = [];
        if (event.target.value != "") {
            const items = $('.artikli-search-row');
            $('.artikli-search-row').attr('style', 'display: none !important');

            items.each(function(index) {
                const long = $(this).find('.artikli-search-target').text();
                // const short = long === 'EUR' ? 'EURO' : long === 'RSD' ? 'DINAR' : 'DOLLAR';
                // console.log(short);

                if (long.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1) {
                    $(this).attr('style', 'display: flex !important');
                }
            })
        } else {
            $('.artikli-search-row').attr('style', 'display: flex !important');
        }
    },
    'change #formMinusKomitent'(event) {
        const val = $(event.target).val();
        console.log(this)
        console.log(val);

        if(val != 0) {
            const client = Clients.find({ _id: val }).fetch()[0];

            $('#formMinusKupac').val(client.imeIPrezime);
        } else {
            $('#formMinusKupac').val('');
        }
    },
    'click #btnEdit'(event) {
        const naziv = $('#nazivEdit').val();
        const sifra = $('#sifraEdit').val();
        const nabavnaCena = $('#nabavnaCenaEdit').val() === '' ? 0 : $('#nabavnaCenaEdit').val();
        const prodajnaCena = $('#prodajnaCenaEdit').val() === '' ? 0 : $('#prodajnaCenaEdit').val();
        const komada = $('#komadaEdit').val() === '' ? 0 : parseFloat($('#komadaEdit').val());

        const id = Session.get('viewDocId');

        const data = {
            naziv,
            sifra,
            nabavnaCena,
            prodajnaCena,
            komada
        }

        Meteor.call('editArticle', id, data, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                if (res.isError) {
                    console.log(res);
                } else {
                    // console.log(res);

                }
            }
        })
    },
    'click #btnEditProdaje'(event) {
        const naziv = $('#nazivEditProdaje').val();
        const kupac = $('#kupacEditProdaje').val();
        const prodajnaCena = $('#prodajnaCenaEditProdaje').val() === '' ? 0 : $('#prodajnaCenaEditProdaje').val();
        const komada = $('#komadaEditProdaje').val() === '' ? 0 : parseFloat($('#komadaEditProdaje').val());

        const id = Session.get('viewDocId');

        const data = {
            artikal: naziv,
            kupac,
            prodajnaCena,
            komada
        }

        Meteor.call('editArticleSale', id, data, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                if (res.isError) {
                    console.log(res);
                } else {
                    // console.log(res);

                }
            }
        })
    },
})