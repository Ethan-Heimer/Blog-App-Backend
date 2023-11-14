async function TryDataBaseMethod(method, res, resMessage){
    await method()
    .then(response => postResponse(res, response, resMessage))
    .catch(error => postError(error, res))
}
function postError(error, res){
    res.send({
        error: error,
        status: 403
    })
}
function postResponse(res, responseObject, message){
    res.send({
                data: responseObject,
                message: message,
                status: 200
            })
}

module.exports = TryDataBaseMethod;