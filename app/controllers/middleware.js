exports.authUser = function(req,res,next) {
    next();
};

exports.authAdmin = function(req,res,next) {
    next();
};

exports.verifyTrack = function(req,res,next) {
    next();
};

exports.forbidden = function(req, res, next) {
    return res.json(403, 'not-allowed');
}