const Userlib = $.import('xsjs.user', 'user').user;
const userLib = new Userlib($.hdb.getConnection({
    treatDateAsUTC: true
}));

function forRequest(obj) {
    userLib.obj(JSON.parse($.request.body.asString()));
}

(function () {
    (function handleRequest() {
        try {
            switch ($.request.method) {
                case $.net.http.PUT : {
                    forRequest(doPut);
                    // userLib.doPut(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.POST : {
                    forRequest(doPost);
                    // userLib.doPost(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.DEL : {
                    forRequest(doDelete);
                    // userLib.doDelete(JSON.parse($.request.body.asString()));
                    break;
                }
                case $.net.http.GET : {
                    userLib.doGet();
                    break;
                }
                default: {
                    $.response.status = $.net.http.METHOD_NOT_ALLOWED;
                }
            }
        } catch (e) {
                $.response.status = $.net.http.BAD_REQUEST;
                $.response.setBody(e.message);
        }
    }());
}());
