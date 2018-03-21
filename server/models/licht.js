'use strict';
module.exports = (sequelize, DataTypes) => {
    var Licht = sequelize.define('Licht', {
        title: DataTypes.STRING
    }, {});
    // Licht.associate = function (models) {
    // associations can be defined here
    // };
    return Licht;
};