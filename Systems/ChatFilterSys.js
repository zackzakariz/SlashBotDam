const Schema = require("../Structures/Schemas/FilterDB");

module.exports = (client) => {
    Schema.find().then((documents) => {
        documents.forEach((doc) => {
            client.filters.set(doc.Guild, doc.Words);
            client.filtersLog.set(doc.Guild, doc.Log);
        });
    });
};