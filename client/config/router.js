BlazeLayout.setRoot('body');

FlowRouter.route('/', {
    action() {
        if (Meteor.userId()) {
            if(Meteor.userId() === 'oPLhnp63eTgLtR9ws') {
                FlowRouter.go('/telefoni');
            } else {
                FlowRouter.go('/servisi');
            }
        } else {
            FlowRouter.go('/login');
        }
    },
});

// FlowRouter.route('/', {
//     action() {
//         FlowRouter.go('/servisi');
//     },
// });

FlowRouter.route('/login', {
    name: 'login',
    action() {
        BlazeLayout.render('emptyLayout', { content: 'login' });
    },
});

FlowRouter.route('/servisi', {
    name: 'servisi',
    action() {
        BlazeLayout.render('mainLayout', { content: 'servisi' });
    },
});

FlowRouter.route('/telefoni', {
    name: 'telefoni',
    action() {
        BlazeLayout.render('mainLayout', { content: 'telefoni' });
    },
});

FlowRouter.route('/artikli', {
    name: 'artikli',
    action() {
        BlazeLayout.render('mainLayout', { content: 'artikli' });
    },
});

FlowRouter.route('/artikliDva', {
    name: 'artikliDva',
    action() {
        BlazeLayout.render('mainLayout', { content: 'artikliDva' });
    },
});

FlowRouter.route('/delovi', {
    name: 'delovi',
    action() {
        BlazeLayout.render('mainLayout', { content: 'delovi' });
    },
});

FlowRouter.route('/izvestaji', {
    name: 'izvestaji',
    action() {
        BlazeLayout.render('mainLayout', { content: 'izvestaji' });
    },
});

FlowRouter.route('/komitenti', {
    name: 'komitenti',
    action() {
        BlazeLayout.render('mainLayout', { content: 'komitenti' });
    },
});