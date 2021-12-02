const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Usuario = require('./usuario');
const Animal = require('./animal');

class SolicitudAdopcion extends Model {}
SolicitudAdopcion.init({
    
    idSolicitudAdopcion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    estadoSolicitudAdopcion: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    fechaSolicitud:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    documentoSolicitud:{
        type: DataTypes.BLOB,
        allowNull: false
    },
    idUsuario_FK: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idAnimal_FK: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "SolicitudAdopcion",
    timestamps: false,
    freezeTableName: true
});



//Relacion de 1:M con la tabla de Usuario
SolicitudAdopcion.belongsTo(Usuario,{ foreignKey: 'idUsuario_FK'});
Usuario.hasMany(SolicitudAdopcion,{ foreignKey: 'idUsuario_FK'});

//Relacion de 1:M con la tabla de Animal
SolicitudAdopcion.belongsTo(Animal,{ foreignKey: 'idAnimal_FK'});
Animal.hasMany(SolicitudAdopcion,{ foreignKey: 'idAnimal_FK'});

module.exports = SolicitudAdopcion;