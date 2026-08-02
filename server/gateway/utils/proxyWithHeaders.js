import proxy from "express-http-proxy";



const proxyWithHeaders = (serviceUrl) => {
    return proxy(serviceUrl, {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            if (srcReq.userId) {
                proxyReqOpts.headers["x-user-id"] = srcReq.userId;
            }

            return proxyReqOpts;
        }
    })
}



const proxyWithHeadersForSPecificRoute = (serviceUrl) => {

    console.log("serviceUrl", serviceUrl)

    return proxy(serviceUrl, {
        proxyReqPathResolver: () => "/getme",

        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {

            if (srcReq.userId) {
                proxyReqOpts.headers["x-user-id"] = srcReq.userId;
            }

            return proxyReqOpts;

        }
    })
}

export {
    proxyWithHeaders,
    proxyWithHeadersForSPecificRoute
};