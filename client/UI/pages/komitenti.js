Template.komitenti.onCreated(function() {
    Session.set('filterStatus', 'sve');
    Session.set('updateServiceIdServisirano', null);
    Session.set('updateServiceIdNaplaceno', null);
    Session.set('viewDocId', null);
    Session.set('partPlusId', null);
    Session.set('partMinusId', null);
    Session.set('updatePartStatusId', null);
    Session.set('deloviSort', null);
    Session.set('deloviSortOrder', -1);


    this.subscribe('clients');
})

Template.komitenti.onRendered(function() {
    // $('[data-toggle="tooltip"]').tooltip();
})

Template.komitenti.helpers({
    getClients: () => {
        // const custom = Session.get('deloviSort');
        // const order = Session.get('deloviSortOrder');
        // if(custom) {
        //     if(custom === 'proizvodjac') {
        //         return Parts.find({ status: 'naStanju' }, { sort: { proizvodjac: order } });
        //     } else {
        //         return Parts.find({ status: 'naStanju' }, { sort: { komada: order } });
        //     }
        // } else {
        //     return Parts.find({ status: 'naStanju' }, { sort: { komada: order } });
        // }
        return Clients.find({}, { sort: { imeIPrezime: 1 } });
    },
    getPartSales: () => {
        return PartSales.find();
    },
    ifFilterChecked: (value) => {
        const current = Session.get('filterStatus');
        return current === value ? 'checked' : '';
    },
    getFilterStatus: () => {
        return Session.get('filterStatus');
    },
    getClientForView: () => {
        const id = Session.get('viewDocId');
        return Clients.find({ _id: id }).fetch()[0];
    },
})

Template.komitenti.events({
    'click #btnSave'(event) {
        const ime = $('#imeIPrezime').val();
        const kontakt = $('#kontaktTelefon').val();

        const data = {
            ime,
            kontakt
        }

        Meteor.call('addClient', data, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                if (res.isError) {
                    console.log(res);
                } else {
                    // console.log(res);

                    $('#imeIPrezime').val('');
                    $('#kontaktTelefon').val('');
                }
            }
        })
    },
    'click #btnSaveFilter'(event) {
        const filter = $('input:radio[name="filterStatus"]:checked').val();
        Session.set('filterStatus', filter);
    },
    'click #btnPlus'(event) {
        const id = Session.get('partPlusId');
        const num = parseFloat($('#formPlusKomada').val());

        Meteor.call('increaseParts', id, num, (err, res) => {
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
        const id = Session.get('partMinusId');
        const kupac = $('#formMinusKupac').val();
        const komada = parseFloat($('#formMinusKomada').val());

        const part = Parts.find({ _id: id }).fetch()[0];

        const data = {
            id: id,
            deo: part.naziv,
            proizvodjac: part.proizvodjac,
            model: part.model,
            kupac: kupac,
            komada: komada,
            cena: part.prodajnaCena,
            profit: part.prodajnaCena - part.nabavnaCena
        }

        Meteor.call('addPartSale', data, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                if (res.isError) {
                    console.log(res);
                } else {
                    // console.log(res);

                    $('#formMinusKupac').val('');
                    $('#formMinusKomada').val('');
                    Session.set('partMinusId', null);
                }
            }
        })
    },
    'click #btnSwitch'(event) {
        const id = Session.get('updatePartStatusId');

        Meteor.call('changePartStatus', id, (err, res) => {
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
    'click .to-servisirano'(event) {
        Session.set('updateServiceIdServisirano', this._id);
    },
    'click .to-naplaceno'(event) {
        Session.set('updateServiceIdNaplaceno', this._id);
    },
    'click .btn-view-doc'(event) {
        Session.set('viewDocId', this._id);
    },
    'click .btn-plus-parts'(event) {
        Session.set('partPlusId', this._id);
    },
    'click .btn-minus-parts'(event) {
        Session.set('partMinusId', this._id);
    },
    'click .btn-delete-part'(event) {
        Session.set('updatePartStatusId', this._id);
    },
    'click .btn-edit-doc'(event) {
        Session.set('viewDocId', this._id);
    },
    'click .btn-remove-doc'(event) {
        Session.set('viewDocId', this._id);
    },
    'click #btnSaveUpdate'(event) {
        const nabavna = parseFloat($(`#nabavnaCena`).val());
        const naplatna = parseFloat($(`#naplatnaCena`).val());

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
    'click .delovi-sort'(event) {
        const sort = $(event.currentTarget).attr('data-sort');
        const order = Session.get('deloviSortOrder');
        Session.set('deloviSort', sort);
        Session.set('deloviSortOrder', -order);
    },
    'keyup #komitentiSearch'(event) {
        const searchArr = [];
        if (event.target.value != "") {
            const items = $('.komitenti-search-row');
            $('.komitenti-search-row').attr('style', 'display: none !important');

            items.each(function(index) {
                const long = $(this).find('.komitenti-search-target').text();
                // const short = long === 'EUR' ? 'EURO' : long === 'RSD' ? 'DINAR' : 'DOLLAR';
                
                if (long.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1) {
                    $(this).attr('style', 'display: flex !important');
                }
            })
        } else {
            $('.komitenti-search-row').attr('style', 'display: flex !important');
        }
    },
    'click #btnEdit'(event) {
        const ime = $('#imeIPrezimeEdit').val();
        const kontakt = $('#kontaktTelefonEdit').val();

        const id = Session.get('viewDocId');

        const data = {
            imeIPrezime: ime,
            kontaktTelefon: kontakt
        }

        Meteor.call('editClient', id, data, (err, res) => {
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
    'click #btnRemove'(event) {
        const id = Session.get('viewDocId');

        Meteor.call('removeClient', id, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                if (res.isError) {
                    console.log(res);
                    Bert.alert(res.error, 'danger');
                } else {
                    // console.log(res);
                }
            }
        })
    }
})