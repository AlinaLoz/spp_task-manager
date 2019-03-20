exports.get = function(req, resp) {
    resp.send(200, {auth: true});
};