module.exports = {
    servers: {
        one: {
            host: "www.telix.vip",
            username: "root",
            // ovde dodati putanju za vase PM
            // pem: '/home/dev7gvisp/.ssh/trade' // Djole Linux
            // pem: '/Users/sasa/.ssh/new_id_rsa' // Sasa Mac
            // pem: '/home/sasa/.ssh/id_rsa_First' // Sasa Linux
            // pem: '/home/djolekb/.ssh/id_rsa' // Djole Linux
        }
    },
    app: {
        name: "TelixDashboard",
        path: "../",
        servers: {
            one: {}
        },
        buildOptions: {
            serverOnly: true,
            cleanAfterBuild: true
        },
        env: {
            DISABLE_WEBSOCKETS: true,
            HTTP_FORWARDED_COUNT: 2,
            ROOT_URL: "https://www.telix.vip",
            MONGO_URL: 'mongodb://Admin:Glory123.@167.99.142.77/production?autoReconnect=true&connectTimeout=60000&authSource=admin',
            PORT: 4000
        },
        docker: {
            // buildInstructions: ['RUN apt-get update && apt-get install -y graphicsmagick', 'RUN gm version'],
            image: "abernix/meteord:node-12-base"
        },
        deployCheckWaitTime: 600,
        enableUploadProgressBar: true
    }
};