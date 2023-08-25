Template.delovi.onCreated(function() {
    Session.set('filterStatus', 'sve');
    Session.set('updateServiceIdServisirano', null);
    Session.set('updateServiceIdNaplaceno', null);
    Session.set('viewDocId', null);
    Session.set('partPlusId', null);
    Session.set('partMinusId', null);
    Session.set('updatePartStatusId', null);
    Session.set('deloviSort', null);
    Session.set('deloviSortOrder', -1);


    this.subscribe('parts');
    this.subscribe('partSales');
    this.subscribe('clients');
})

Template.delovi.onRendered(function() {
    // $('[data-toggle="tooltip"]').tooltip();
})

Template.delovi.helpers({
    getParts: () => {
        const custom = Session.get('deloviSort');
        const order = Session.get('deloviSortOrder');
        if(custom) {
            if(custom === 'proizvodjac') {
                return Parts.find({ status: 'naStanju' }, { sort: { proizvodjac: order } });
            } else {
                return Parts.find({ status: 'naStanju' }, { sort: { komada: order } });
            }
        } else {
            return Parts.find({ status: 'naStanju' }, { sort: { komada: order } });
        }
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
    getServiceForView: () => {
        const id = Session.get('viewDocId');
        return Services.find({ _id: id }).fetch()[0];
    },
    getModalMinusProdajnaCena: () => {
        const id = Session.get('partMinusId');
        if(id) {
            const part = Parts.find({ _id: id }).fetch()[0];
            return part.prodajnaCena;
        } else {
            return '';
        }
    },
    getClients: () => {
        return Clients.find({}, { sort: { imeIPrezime: 1 } });
    },
    hasContact: (contact) => {
        // const client = Clients.find({  })
        return contact !== '';
    },
    getPartForView: () => {
        const id = Session.get('viewDocId');
        return Parts.find({ _id: id }).fetch()[0];
    },
    getPartSaleForView: () => {
        const id = Session.get('viewDocId');
        return PartSales.find({ _id: id }).fetch()[0];
    },
})

Template.delovi.events({
    'click #btnSave'(event) {
        const naziv = $('#naziv').val();
        const proizvodjac = $('#proizvodjac').val();
        const model = $('#model').val();
        const nabavnaCena = $('#nabavnaCena').val() === '' ? 0 : $('#nabavnaCena').val();
        const prodajnaCena = $('#prodajnaCena').val() === '' ? 0 : $('#prodajnaCena').val();
        const komada = $('#komada').val() === '' ? 0 : parseFloat($('#komada').val());

        const data = {
            naziv,
            proizvodjac,
            model,
            nabavnaCena,
            prodajnaCena,
            komada
        }

        Meteor.call('addPart', data, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                if (res.isError) {
                    console.log(res);
                } else {
                    // console.log(res);

                    $('#naziv').val('');
                    $('#proizvodjac').val('');
                    $('#model').val('');
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
        const prodajnaCena = $('#formMinusProdajnaCena').val() === '' ? 0 : parseFloat($('#formMinusProdajnaCena').val());

        const part = Parts.find({ _id: id }).fetch()[0];

        const komitent = $('#formMinusKomitent').val();

        const data = {
            id: id,
            deo: part.naziv,
            proizvodjac: part.proizvodjac,
            model: part.model,
            kupac: kupac,
            komada: komada,
            cena: prodajnaCena,
            profit: prodajnaCena - part.nabavnaCena,
            komitent
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
                    $('#formMinusKomitent').val('0');
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
    'click .delovi-sort'(event) {
        const sort = $(event.currentTarget).attr('data-sort');
        const order = Session.get('deloviSortOrder');
        Session.set('deloviSort', sort);
        Session.set('deloviSortOrder', -order);
    },
    'keyup #deloviSearch'(event) {
        const searchArr = [];
        if (event.target.value != "") {
            const items = $('.delovi-search-row');
            $('.delovi-search-row').attr('style', 'display: none !important');

            items.each(function(index) {
                const long = $(this).find('.delovi-search-target').text();
                const long2 = $(this).find('.delovi-search-target-two').text();
                const long3 = $(this).find('.delovi-search-target-three').text();
                // const short = long === 'EUR' ? 'EURO' : long === 'RSD' ? 'DINAR' : 'DOLLAR';

                if (long.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1 || long2.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1 || long3.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1) {
                    $(this).attr('style', 'display: flex !important');
                }
            })
        } else {
            $('.delovi-search-row').attr('style', 'display: flex !important');
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
        const id = Session.get('viewDocId');

        const naziv = $('#nazivEdit').val();
        const proizvodjac = $('#proizvodjacEdit').val();
        const model = $('#modelEdit').val();
        const nabavnaCena = $('#nabavnaCenaEdit').val() === '' ? 0 : $('#nabavnaCenaEdit').val();
        const prodajnaCena = $('#prodajnaCenaEdit').val() === '' ? 0 : $('#prodajnaCenaEdit').val();
        const komada = $('#komadaEdit').val() === '' ? 0 : parseFloat($('#komadaEdit').val());

        const data = {
            naziv,
            proizvodjac,
            model,
            nabavnaCena,
            prodajnaCena,
            komada
        }

        Meteor.call('editPart', id, data, (err, res) => {
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
        const id = Session.get('viewDocId');

        const naziv = $('#nazivEditProdaje').val();
        const proizvodjac = $('#proizvodjacEditProdaje').val();
        const model = $('#modelEditProdaje').val();
        const kupac = $('#kupacEditProdaje').val();
        const prodajnaCena = $('#prodajnaCenaEditProdaje').val() === '' ? 0 : $('#prodajnaCenaEditProdaje').val();
        const komada = $('#komadaEditProdaje').val() === '' ? 0 : parseFloat($('#komadaEditProdaje').val());

        const data = {
            deo: naziv,
            proizvodjac,
            model,
            kupac,
            prodajnaCena,
            komada
        }

        Meteor.call('editPartSale', id, data, (err, res) => {
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