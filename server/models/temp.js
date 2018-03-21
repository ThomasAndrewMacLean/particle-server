'use strict';
module.exports = (sequelize, DataTypes) => {
    var Temp = sequelize.define('Temp', {
        title: DataTypes.STRING
    }, {});
    //    Temp.associate = function (models) {
    // associations can be defined here
    //  };
    return Temp;
};