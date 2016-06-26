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
    },

    dataPurge: function(unpurgedData) {
        var purgedData = {};

        for(var key in unpurgedData) {
            purgedData[this.encodeHtml(key)] =  this.encodeHtml(unpurgedData[key]);
        }

        return purgedData;
    },

    stripUnwantedData: function (data, wantedData) {
        var strippedData = {};

        for(var key in data) {
            if (wantedData.indexOf(key) != -1)
                strippedData[key] = data[key];
        }

        return strippedData;
    },

    validateFields: function(data, fields) {
        var success = true;

        for (var key in fields) {
            if (data[key].length < fields[key].minLength)
                success = false;

            if (data[key].length > fields[key].maxLength)
                success = false;

            if (fields[key].equalsTo && data[key] != data[fields[key].equalsTo])
                success = false;

            if (fields[key].isEmail) {
                var rgx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

                if(!data[key].match(rgx))
                    success = false;
            }
        }

        return success;
    }
}
