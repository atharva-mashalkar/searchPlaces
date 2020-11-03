const ResponseUtils = {
    process404: (err, errorMessage) => {
        return {
            status: 404,
            error: err ? err : "Not found",
            data: null,
            errorCode: "NOT_FOUND_ERROR",
            errorMessage: errorMessage ? errorMessage : 'Not found'
        };
    },
    process401: (err, msg, errorCode) => {
        return {
            status: 401,
            error: err,
            data: null,
            errorCode: errorCode ? errorCode : "UNAUTHORIZED",
            errorMessage: msg ? msg : "Unauthorized"
        }
    },
    process200: (res) => {
        return {
            status:200,
            error:null,
            data:res
        }
    }
}

module.exports = ResponseUtils;