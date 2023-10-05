import html2pdf from 'html2pdf.js';

Template.servisi.onCreated(function() {
    Session.set('filterStatus', 'sve');
    Session.set('updateServiceIdServisirano', null);
    Session.set('updateServiceIdNaplaceno', null);
    Session.set('viewDocId', null);
    Session.set('printDocId', null);
    Session.set('printDocName', null);

    this.subscribe('services');
    this.subscribe('clients');
})

Template.servisi.onRendered(function() {
    // $('[data-toggle="tooltip"]').tooltip();

    // Meteor.setTimeout(() => {
    //     $('.table-main-body-row').each(function(idx){
    //         console.log(1);
    //         // $(this).children('.table-main-body-row-item:eq(0)').text(idx + 1);
    //     });
    // }, 500);
})

Template.servisi.helpers({
    getServices: () => {
        const status = Session.get('filterStatus');
        if(status === 'sve') {
            return Services.find();
        } else {
            return Services.find({ status: status });
        }
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
    getServiceForPrint: () => {
        const id = Session.get('printDocId');
        return Services.find({ _id: id }).fetch()[0];
    },
    getRowNumber: (index) => {
        return index+1;
    },
    getCurrentDate: () => {
        return new Date();
    },
    getClients: () => {
        return Clients.find({}, { sort: { imeIPrezime: 1 } });
    },
    hasContact: (contact) => {
        // const client = Clients.find({  })
        return contact !== '';
    }
})

Template.servisi.events({
    'click #btnSave'(event) {
        const ime = $('#imeIPrezime').val();
        const kontakt = $('#kontaktTelefon').val();
        const model = $('#modelUredjaja').val();
        const imei = $('#imeiBroj').val();
        const opis = $('#opisPosla').val();
        const cena = $('#ocekivanaCena').val() === '' ? 0 : $('#ocekivanaCena').val();

        const komitent = $('#komitent').val();

        const data = {
            ime,
            kontakt,
            model,
            imei,
            opis,
            cena,
            komitent
        }

        Meteor.call('addService', data, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                if (res.isError) {
                    console.log(res);
                } else {
                    // console.log(res);

                    $('#imeIPrezime').val('');
                    $('#kontaktTelefon').val('');
                    $('#modelUredjaja').val('');
                    $('#imeiBroj').val('');
                    $('#opisPosla').val('');
                    $('#ocekivanaCena').val('');
                    $('#komitent').val('0');
                }
            }
        })
    },
    'click #btnSaveFilter'(event) {
        const filter = $('input:radio[name="filterStatus"]:checked').val();
        Session.set('filterStatus', filter);
    },
    'click #btnSwitch'(event) {
        const id = Session.get('updateServiceIdServisirano')

        Meteor.call('updateServiceToServisirano', id, (err, res) => {
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
    'click .btn-edit-doc'(event) {
        Session.set('viewDocId', this._id);
    },
    'click .btn-remove-doc'(event) {
        Session.set('viewDocId', this._id);
    },
    'click .btn-print-doc'(event) {
        Session.set('viewDocId', this._id);
        Session.set('printDocName', this.imeIPrezime);
    },
    'click #btnSaveUpdate'(event) {

        const vraceno = document.getElementById('vraceno').checked;

        if(vraceno) {
            const data = {
                id: Session.get('updateServiceIdNaplaceno'),
            }

            Meteor.call('updateServiceToVraceno', data, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    if (res.isError) {
                        console.log(res);
                    } else {
                        // console.log(res);
    
                        $(`#nabavnaCena`).val('');
                        $(`#naplatnaCena`).val('');
                        $('#vraceno').prop('checked', false);
                        Session.set('updateServiceIdNaplaceno', null);
                    }
                }
            })
        } else {
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
                        $('#vraceno').prop('checked', false);
                        Session.set('updateServiceIdNaplaceno', null);
                    }
                }
            })
        }
    },
    'keyup #servisiSearch'(event) {
        const searchArr = [];
        if (event.target.value != "") {
            const items = $('.servisi-search-row');
            $('.servisi-search-row').attr('style', 'display: none !important');

            items.each(function(index) {
                const long = $(this).find('.servisi-search-target').text();
                // const short = long === 'EUR' ? 'EURO' : long === 'RSD' ? 'DINAR' : 'DOLLAR';
                
                if (long.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1) {
                    $(this).attr('style', 'display: flex !important');
                }
            })
        } else {
            $('.servisi-search-row').attr('style', 'display: flex !important');
        }
    },
    'click #btnPrint'(event) {
        const elem = document.getElementById('pdfDoc');
        const name = Session.get('printDocName');
        
        html2pdf(elem, {
            image: {type: 'jpeg', quality: 1},
            margin: 2,
            html2canvas: { 
                scale: 2,
                letterRendering: true,
            },
            filename: `servis_${name}`,
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        });
    },
    'change #komitent'(event) {
        const val = $(event.target).val();
        console.log(this)
        console.log(val);

        if(val != 0) {
            const client = Clients.find({ _id: val }).fetch()[0];

            $('#imeIPrezime').val(client.imeIPrezime);
            $('#kontaktTelefon').val(client.kontaktTelefon);
        } else {
            $('#imeIPrezime').val('');
            $('#kontaktTelefon').val('');
        }
    },
    'click #btnEdit'(event) {
        const ime = $('#imeIPrezimeEdit').val();
        const kontakt = $('#kontaktTelefonEdit').val();
        const model = $('#modelUredjajaEdit').val();
        const imei = $('#imeiBrojEdit').val();
        const opis = $('#opisPoslaEdit').val();
        const cena = $('#ocekivanaCenaEdit').val() === '' ? 0 : $('#ocekivanaCenaEdit').val();

        const id = Session.get('viewDocId');

        const data = {
            imeIPrezime: ime,
            kontaktTelefon: kontakt,
            modelUredjaja: model,
            imeiBroj: imei,
            opisPosla: opis,
            ocekivanaCena: cena,
        }

        Meteor.call('editService', id, data, (err, res) => {
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
    'click #btnEditNaplaceno'(event) {
        const ime = $('#imeIPrezimeEditNaplaceno').val();
        const kontakt = $('#kontaktTelefonEditNaplaceno').val();
        const model = $('#modelUredjajaEditNaplaceno').val();
        const imei = $('#imeiBrojEditNaplaceno').val();
        const opis = $('#opisPoslaEditNaplaceno').val();
        const cena = $('#ocekivanaCenaEditNaplaceno').val() === '' ? 0 : $('#ocekivanaCenaEditNaplaceno').val();
        const nabavna = $(`#nabavnaCenaEditNaplaceno`).val() === '' ? 0 : parseFloat($(`#nabavnaCenaEditNaplaceno`).val());
        const naplatna = $(`#naplatnaCenaEditNaplaceno`).val() === '' ? 0 : parseFloat($(`#naplatnaCenaEditNaplaceno`).val());

        const id = Session.get('viewDocId');

        const data = {
            imeIPrezime: ime,
            kontaktTelefon: kontakt,
            modelUredjaja: model,
            imeiBroj: imei,
            opisPosla: opis,
            ocekivanaCena: cena,
            nabavnaCena: nabavna,
            naplatnaCena: naplatna
        }

        Meteor.call('editService', id, data, (err, res) => {
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

        Meteor.call('removeService', id, (err, res) => {
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
    }
})



$(document).keypress(function(e) {
    if ($("#modalAdd").hasClass('show') && (e.keycode == 13 || e.which == 13)) {
        $('#btnSave').click();
    }
});

$(document).keypress(function(e) {
    if ($("#modalFilter").hasClass('show') && (e.keycode == 13 || e.which == 13)) {
        $('#btnSaveFilter').click();
    }
});

$(document).keypress(function(e) {
    if ($("#modalSwitch").hasClass('show') && (e.keycode == 13 || e.which == 13)) {
        $('#btnSwitch').click();
    }
});

$(document).keypress(function(e) {
    if ($("#modalRemove").hasClass('show') && (e.keycode == 13 || e.which == 13)) {
        $('#btnRemove').click();
    }
});

$(document).keypress(function(e) {
    if ($("#modalUpdate").hasClass('show') && (e.keycode == 13 || e.which == 13)) {
        $('#btnSaveUpdate').click();
    }
});

$(document).keypress(function(e) {
    if ($("#modalView").hasClass('show') && (e.keycode == 13 || e.which == 13)) {
        $('#btnSaveView').click();
    }
});

$(document).keypress(function(e) {
    if ($("#modalEdit").hasClass('show') && (e.keycode == 13 || e.which == 13)) {
        $('#btnEdit').click();
    }
});

$(document).keypress(function(e) {
    if ($("#modalEditNaplaceno").hasClass('show') && (e.keycode == 13 || e.which == 13)) {
        $('#btnEditNaplaceno').click();
    }
});

$(document).keypress(function(e) {
    if ($("#modalPdf").hasClass('show') && (e.keycode == 13 || e.which == 13)) {
        $('#btnPrint').click();
    }
});

$(document).keypress(function(e) {
    if ($("#modalEditProdato").hasClass('show') && (e.keycode == 13 || e.which == 13)) {
        $('#btnEditProdato').click();
    }
});

$(document).keypress(function(e) {
    if ($("#modalMinus").hasClass('show') && (e.keycode == 13 || e.which == 13)) {
        $('#btnMinus').click();
    }
});

$(document).keypress(function(e) {
    if ($("#modalPlus").hasClass('show') && (e.keycode == 13 || e.which == 13)) {
        $('#btnPlus').click();
    }
});

$(document).keypress(function(e) {
    if ($("#modalEditProdaje").hasClass('show') && (e.keycode == 13 || e.which == 13)) {
        $('#btnEditProdaje').click();
    }
});