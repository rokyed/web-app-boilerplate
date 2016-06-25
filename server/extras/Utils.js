module.exports = {
    encodeHtml: function (str) {
        return str.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
    },
    safeParseJSON: function (json) {
        try {
            return JSON.parse(json);
        } catch (e) {
            return {};
        }
    }
}
