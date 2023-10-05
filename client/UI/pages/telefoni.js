import html2pdf from 'html2pdf.js';

Template.telefoni.onCreated(function() {
    Session.set('slika', null);
    Session.set('slikaEdit', null);
    Session.set('slikaEditProdato', null);
    Session.set('filterStatus', 'sve');
    Session.set('updateServiceIdServisirano', null);
    Session.set('updateServiceIdNaplaceno', null);
    Session.set('viewDocId', null);
    Session.set('phonesSort', null);
    Session.set('phonesSortOrder', -1);
    Session.set('tipProdaje', null);
    Session.set('printDocName', null);
    Session.set('imgFull', null);

    this.subscribe('phones');
    this.subscribe('clients');
})

Template.telefoni.onRendered(function() {
    // $('[data-toggle="tooltip"]').tooltip();
})

Template.telefoni.helpers({
    getPhones: () => {
        const status = Session.get('filterStatus');
        const sort = Session.get('phonesSort');
        const order = Session.get('phonesSortOrder');
        if(status === 'sve') {
            if(sort === 'preporucenaCena') {
                return Phones.find({}, { sort: { preporucenaCena: order } });
            } else if(sort === 'prodajnaCena') {
                return Phones.find({}, { sort: { prodajnaCena: order } });
            } else if(sort === 'modelUredjaja') {
                return Phones.find({}, { sort: { modelUredjaja: order } });
            } else {
                return Phones.find({}, { sort: { datum: order } });
            }
        } else {
            if(sort === 'preporucenaCena') {
                return Phones.find({ status: status }, { sort: { preporucenaCena: order } });
            } else if(sort === 'prodajnaCena') {
                return Phones.find({ status: status }, { sort: { prodajnaCena: order } });
            } else if(sort === 'modelUredjaja') {
                return Phones.find({ status: status }, { sort: { modelUredjaja: order } });
            } else {
                return Phones.find({ status: status }, { sort: { datum: order } });
            }
        }

        // const custom = Session.get('deloviSort');
        // if(custom) {
        //     if(custom === 'proizvodjac') {
        //         return Parts.find({ status: 'naStanju' }, { sort: { proizvodjac: 1 } });
        //     } else {
        //         return Parts.find({ status: 'naStanju' }, { sort: { komada: -1 } });
        //     }
        // } else {
        //     return Parts.find({ status: 'naStanju' }, { sort: { komada: -1 } });
        // }
    },
    ifFilterChecked: (value) => {
        const current = Session.get('filterStatus');
        return current === value ? 'checked' : '';
    },
    getFilterStatus: () => {
        return Session.get('filterStatus');
    },
    getPhoneForView: () => {
        const id = Session.get('viewDocId');
        return Phones.find({ _id: id }).fetch()[0];
    },
    getTipProdaje: () => {
        return Session.get('tipProdaje');
    },
    getCurrentDate: () => {
        return new Date();
    },
    returnNaN: () => {
        return NaN;
    },
    getClients: () => {
        return Clients.find({}, { sort: { imeIPrezime: 1 } });
    },
    hasContact: (contact) => {
        // const client = Clients.find({  })
        return contact !== '';
    },
    withImgFull: () => {
        return Session.get('imgFull');
    },
    isColored: (id) => {
        const phone = Phones.find({ _id: id }).fetch()[0];
        console.log('phone.serial:', phone.serial);
        if(phone.status === 'prodato' && phone.tipProdaje.tip === 'naRate') {
            console.log('prvi if');
            const rata1 = phone.tipProdaje.rata1;
            const rata2 = phone.tipProdaje.rata2;
            const rata3 = phone.tipProdaje.rata3;

            if(!rata1.placeno) {
                return true;
            }

            if(rata2.rata2 != '/') {
                if(!rata2.placeno) {
                    return true;
                }
            }

            if(rata3.rata3 != '/') {
                if(!rata2.placeno) {
                    return true;
                }
            }

            return false;

            // if(!rata1.placeno || !rata2.placeno) {
            //     console.log('drugi if');
            //     return true;
            // } else {
            //     console.log('drugi else');
            //     if(rata3.rata3 != '/') {
            //         console.log('treci if');
            //         if(!rata3.placeno) {
            //             console.log('cetrvti if');
            //             return true;
            //         } else {
            //             console.log('cetrvti else');
            //             return false;
            //         }
            //     } else {
            //         console.log('treci else');
            //         return false;
            //     }
            // }
        } else {
            console.log('prvi else');
            return false;
        }
    },
    getOppositeTipProdaje: (tip) => {
        if(tip === 'gotovina') {
            return 'naRate'
        } else {
            return 'gotovina'
        }
    },
    getTipProdajeForShow: (tip) => {
        if(tip === 'gotovina') {
            return 'Gotovina'
        } else {
            return 'Na Rate'
        }
    },
    getDateForInput: (ts) => {
        if(ts === '/') {
            return '/';
        } else {
            const d = new Date(ts);

        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();

        return `${year}-${month}-${day}`;
        }
    }
})

Template.telefoni.events({
    'click #btnSave'(event) {
        const ime = $('#imeIPrezime').val();
        const jmbg = $('#jmbg').val();
        const kontakt = $('#kontaktTelefon').val();
        const model = $('#modelUredjaja').val();
        const imei = $('#imeiBroj').val();
        const oprema = $('#oprema').val();
        const cena = $('#otkupnaCena').val() === '' ? 0 : parseFloat($('#otkupnaCena').val());
        const preporucenaCena = $('#preporucenaCena').val() === '' ? 0 : parseFloat($('#preporucenaCena').val());
        const status = $('#status').val();
        const slika = Session.get('slika');

        const data = {
            prodavac: {
                imeIPrezime: ime,
                kontaktTelefon: kontakt,
                jmbg
            },
            model,
            imei,
            oprema,
            cena,
            preporucenaCena,
            status,
            slika,
        }

        Meteor.call('addPhone', data, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                if (res.isError) {
                    console.log(res);
                } else {
                    // console.log(res);

                    $('#imeIPrezime').val('');
                    $('#jmbg').val('');
                    $('#kontaktTelefon').val('');
                    $('#modelUredjaja').val('');
                    $('#imeiBroj').val('');
                    $('#oprema').val('');
                    $('#otkupnaCena').val('');
                    $('#preporucenaCena').val('')
                    $('#status').val('');
                    Session.set('slika', null);
                }
            }
        })
    },
    'click #btnSaveFilter'(event) {
        const filter = $('input:radio[name="filterStatus"]:checked').val();
        Session.set('filterStatus', filter);
    },
    'click #btnSwitch'(event) {
        const id = Session.get('updateServiceIdServisirano');

        const cena = parseFloat($('#cenaPopravke').val());

        Meteor.call('updatePhoneToNaStanju', id, cena, (err, res) => {
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
    'click .btn-print-doc'(event) {
        Session.set('viewDocId', this._id);
        Session.set('printDocName', this.kupac.imeIPrezime);
    },
    'click .btn-edit-doc'(event) {
        Session.set('viewDocId', this._id);
    },
    'click .btn-remove-doc'(event) {
        Session.set('viewDocId', this._id);
    },
    'click #btnSaveUpdate'(event) {
        const ime = $(`#imeIPrezimeUpdate`).val();
        const kontakt = $(`#kontaktTelefonUpdate`).val();
        const jmbg = $(`#jmbgUpdate`).val();
        const cena = $(`#prodajnaCenaUpdate`).val() === '' ? 0 : parseFloat($(`#prodajnaCenaUpdate`).val());
        const tip = $(`#tipProdaje`).val();

        const komitent = $('#komitentUpdate').val() == '0' ? null : $('#komitentUpdate').val();

        let data = {};

        if(tip === 'naRate') {
            const rata1 = $('#rata1').val() === '' ? 0 : parseFloat($('#rata1').val());
            const rata1Datum = new Date($('#rata1Datum').val()).getTime();
            const rata2 = $('#rata2').val();
            const rata2Datum = $('#rata2Datum').val();
            const rata3 = $('#rata3').val();
            const rata3Datum = $('#rata3Datum').val();

            const rata2Final = rata2 == '' ? '/' : parseFloat(rata2);
            const rata2DatumFinal = rata2Datum == '' ? '/' : new Date(rata2Datum).getTime();
            const rata3Final = rata3 == '' ? '/' : parseFloat(rata3);
            const rata3DatumFinal = rata3Datum == '' ? '/' : new Date(rata3Datum).getTime();

            data = {
                id: Session.get('updateServiceIdNaplaceno'),
                kupac: {
                    imeIPrezime: ime,
                    kontaktTelefon: kontakt,
                    jmbg: jmbg,
                    komitent
                },
                prodajnaCena: cena,
                tipProdaje: {
                    tip: tip,
                    rata1: {
                        rata1,
                        rata1Datum,
                        placeno: false
                    },
                    rata2: {
                        rata2: rata2Final,
                        rata2Datum: rata2DatumFinal,
                        placeno: false
                    },
                    rata3: {
                        rata3: rata3Final,
                        rata3Datum: rata3DatumFinal,
                        placeno: false
                    }
                }
            }
        } else {
            data = {
                id: Session.get('updateServiceIdNaplaceno'),
                kupac: {
                    imeIPrezime: ime,
                    kontaktTelefon: kontakt,
                    jmbg: jmbg,
                    komitent
                },
                prodajnaCena: cena,
                tipProdaje: {
                    tip: tip
                }
            }
        }


        Meteor.call('updatePhoneToProdato', data, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                if (res.isError) {
                    console.log(res);
                } else {
                    // console.log(res);

                    $(`#imeIPrezimeUpdate`).val('');
                    $(`#kontaktTelefonUpdate`).val('');
                    $(`#jmbgUpdate`).val('');
                    $(`#prodajnaCenaUpdate`).val('');
                    $('#komitentUpdate').val('0');
                    Session.set('updateServiceIdNaplaceno', null);
                    Session.set('tipProdaje', null);
                }
            }
        })
    },
    'change #slika'(event) {
        const pic = $(event.target).get(0).files[0];

        if(pic) {
            Images.insert(pic, (err,fileObj) => {
                if(err) {
                    console.log(err);
                } else {
                    // console.log('fileObj:', fileObj);
                    const picId = fileObj._id;
                    Session.set('slika', picId);
                }
            })
        }
    },
    'change #slikaEdit'(event) {
        const pic = $(event.target).get(0).files[0];

        if(pic) {
            Images.insert(pic, (err,fileObj) => {
                if(err) {
                    console.log(err);
                } else {
                    // console.log('fileObj:', fileObj);
                    const picId = fileObj._id;
                    Session.set('slikaEdit', picId);
                }
            })
        }
    },
    'change #slikaEditProdato'(event) {
        const pic = $(event.target).get(0).files[0];

        if(pic) {
            Images.insert(pic, (err,fileObj) => {
                if(err) {
                    console.log(err);
                } else {
                    // console.log('fileObj:', fileObj);
                    const picId = fileObj._id;
                    Session.set('slikaEditProdato', picId);
                }
            })
        }
    },
    'click .phones-sort'(event) {
        const sort = $(event.currentTarget).attr('data-sort');
        const order = Session.get('phonesSortOrder');
        Session.set('phonesSort', sort);
        Session.set('phonesSortOrder', -order);
    },
    'change #tipProdaje'(event) {
        const tip = $('#tipProdaje').val();
        Session.set('tipProdaje', tip);
    },
    'click .placeno-false'(event) {
        const id = this._id;
        const rata = $(event.target).parent().attr('data-placeno');

        Meteor.call('updatePhoneRateToPaid', id, rata, (err, res) => {
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
    'click .placeno-true'(event) {
        const id = this._id;
        const rata = $(event.target).parent().attr('data-placeno');

        Meteor.call('updatePhoneRateToNotPaid', id, rata, (err, res) => {
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
    'click #btnPrint'(event) {
        const elem = document.getElementById('pdfDocPhones');
        const name = Session.get('printDocName');
        
        html2pdf(elem, {
            image: {type: 'jpeg', quality: 1},
            filename: `rate_${name}`,
            margin: 2,
            html2canvas: { 
                scale: 2,
                letterRendering: true,
            },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        });
    },
    'change #komitentUpdate'(event) {
        const val = $(event.target).val();
        console.log(this)
        console.log(val);

        if(val != 0) {
            const client = Clients.find({ _id: val }).fetch()[0];

            $('#imeIPrezimeUpdate').val(client.imeIPrezime);
            $('#kontaktTelefonUpdate').val(client.kontaktTelefon);
        } else {
            $('#imeIPrezimeUpdate').val('');
            $('#kontaktTelefonUpdate').val('');
        }
    },
    'click #btnEdit'(event) {
        const id = Session.get('viewDocId');

        const oldImageEdit = Phones.find({ _id: id }).fetch()[0].image;

        const ime = $('#imeIPrezimeEdit').val();
        const jmbg = $('#jmbgEdit').val();
        const kontakt = $('#kontaktTelefonEdit').val();
        const model = $('#modelUredjajaEdit').val();
        const imei = $('#imeiBrojEdit').val();
        const oprema = $('#opremaEdit').val();
        const cena = $('#otkupnaCenaEdit').val() === '' ? 0 : parseFloat($('#otkupnaCenaEdit').val());
        const preporucenaCena = $('#preporucenaCenaEdit').val() === '' ? 0 : parseFloat($('#preporucenaCenaEdit').val());
        const image = Session.get('slikaEdit') ? Session.get('slikaEdit') : oldImageEdit;

        const data = {
            prodavac: {
                imeIPrezime: ime,
                kontaktTelefon: kontakt,
                jmbg
            },
            modelUredjaja: model,
            imeiBroj: imei,
            oprema,
            otkupnaCena: cena,
            preporucenaCena,
            image,
        }

        console.log(id);
        console.log(data);

        Meteor.call('editPhone', id, data, (err, res) => {
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
    'click #btnEditProdato'(event) {
        const id = Session.get('viewDocId');

        const oldPhone = Phones.find({ _id: id }).fetch()[0];

        console.log(oldPhone);

        const oldImageEdit = Phones.find({ _id: id }).fetch()[0].image;

        const ime = $('#imeIPrezimeEditProdato').val();
        const jmbg = $('#jmbgEditProdato').val();
        const kontakt = $('#kontaktTelefonEditProdato').val();
        const model = $('#modelUredjajaEditProdato').val();
        const imei = $('#imeiBrojEditProdato').val();
        const oprema = $('#opremaEditProdato').val();
        const cena = $('#otkupnaCenaEditProdato').val() === '' ? 0 : parseFloat($('#otkupnaCenaEditProdato').val());
        const preporucenaCena = $('#preporucenaCenaEditProdato').val() === '' ? 0 : parseFloat($('#preporucenaCenaEditProdato').val());
        const image = Session.get('slikaEditProdato') ? Session.get('slikaEditProdato') : oldImageEdit;
        const imeProdavac = $('#imeIPrezimeKupacEditProdato').val();
        const jmbgProdavac = $('#jmbgKupacEditProdato').val();
        const kontaktProdavac = $('#kontaktTelefonKupacEditProdato').val();
        const prodajnaCena = $(`#prodajnaCenaEditProdato`).val() === '' ? 0 : parseFloat($(`#prodajnaCenaEditProdato`).val());

        const tipProdaje = $('#tipProdajeEdit').val();

        let data = {};

        if(tipProdaje === 'naRate') {
            const rata1 = $('#rata1Edit').val() === '' ? 0 : parseFloat($('#rata1Edit').val());
            const rata1Datum = new Date($('#rata1DatumEdit').val()).getTime(); 
            const rata2 = $('#rata2Edit').val();
            const rata2Datum = $('#rata2DatumEdit').val(); 
            const rata3 = $('#rata3Edit').val();
            const rata3Datum = $('#rata3DatumEdit').val(); 

            const rata2Final = rata2 == '' || rata2 == '/' ? '/' : parseFloat(rata2);
            const rata2DatumFinal = rata2Datum == '' || rata2Datum == '/' ? '/' : new Date(rata2Datum).getTime(); 
            const rata3Final = rata3 == '' || rata3 == '/'  ? '/' : parseFloat(rata3);
            const rata3DatumFinal = rata3Datum == '' || rata3Datum == '/' ? '/' : new Date(rata3Datum).getTime(); 

            data = {
                prodavac: {
                    imeIPrezime: ime,
                    kontaktTelefon: kontakt,
                    jmbg
                },
                modelUredjaja: model,
                imeiBroj: imei,
                oprema,
                otkupnaCena: cena,
                preporucenaCena,
                image,
                kupac: {
                    imeIPrezime: imeProdavac,
                    kontaktTelefon: kontaktProdavac,
                    jmbg: jmbgProdavac
                },
                prodajnaCena,
                tipProdaje: {
                    tip: tipProdaje,
                    rata1: {
                        rata1: rata1,
                        rata1Datum: rata1Datum,
                        placeno: oldPhone.tipProdaje.rata1.placeno,
                    },
                    rata2: {
                        rata2: rata2Final,
                        rata2Datum: rata2DatumFinal,
                        placeno: oldPhone.tipProdaje.rata2.placeno,
                    },
                    rata3: {
                        rata3: rata3Final,
                        rata3Datum: rata3DatumFinal,
                        placeno: oldPhone.tipProdaje.rata3.placeno,
                    },
                }
            }
        } else {
            data = {
                prodavac: {
                    imeIPrezime: ime,
                    kontaktTelefon: kontakt,
                    jmbg
                },
                modelUredjaja: model,
                imeiBroj: imei,
                oprema,
                otkupnaCena: cena,
                preporucenaCena,
                image,
                kupac: {
                    imeIPrezime: imeProdavac,
                    kontaktTelefon: kontaktProdavac,
                    jmbg: jmbgProdavac
                },
                prodajnaCena
            }
        }

        console.log(id);
        console.log(data);

        Meteor.call('editPhone', id, data, (err, res) => {
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

        Meteor.call('removePhone', id, (err, res) => {
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
    'click #phoneImg'(event) {
        const id = $(event.target).attr('data-id');
        if(id) {
            Session.set('imgFull', id);
            $('#imgFull').css({ 'display': 'block' });
        }
    },
    'click #imgFullClose'(event) {
        $('#imgFull').css({ 'display': 'none' });
    },
    'keyup #telefoniSearch'(event) {
        const searchArr = [];
        if (event.target.value != "") {
            const items = $('.telefoni-search-row');
            $('.telefoni-search-row').attr('style', 'display: none !important');

            items.each(function(index) {
                const long = $(this).find('.telefoni-search-target').text();
                // const short = long === 'EUR' ? 'EURO' : long === 'RSD' ? 'DINAR' : 'DOLLAR';
                
                if (long.toLowerCase().indexOf(event.target.value.toLowerCase()) != -1) {
                    $(this).attr('style', 'display: flex !important');
                }
            })
        } else {
            $('.telefoni-search-row').attr('style', 'display: flex !important');
        }
    },
})