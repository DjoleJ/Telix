SyncedCron.config({
    log: true
})

SyncedCron.add({
    name: 'Older then 10 days',
    schedule: function (parser) {
        // parser is a later.parse object
        return parser.text('every 4 hours');
    },
    job: function () {
        const tenDaysAgo = new Date().getTime() - 864000000;
        
        Services.update({ status: 'primljeno', datum: { $lte: tenDaysAgo } }, {
            $set: { obojen: true }
        }, { multi: true });
    }
});