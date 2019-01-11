function validateEmail(email) {
    var mailRegex = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (mailRegex.test(email)) {
        return true;
    } else {
        return false;
    }
}

const respJson = (status, data, msg) => ({
    status: (typeof status === undefined) ? false : status,
    data: (typeof data === undefined) ? {} : data,
    msg: (typeof msg === undefined) ? '' : msg
})

module.exports = {
    validateEmail,
    respJson
}