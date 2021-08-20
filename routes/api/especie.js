const router = require('express').Router();

const Especie = require('../../database/models/especie');
const TipoAnimal = require('../../database/models/tipoanimal');

//consultar todos los tipoUsuario
router.get('/', async (req, res) => {
    
    const especie = await Especie.findAll({
        include: {
            model: TipoAnimal,
            attributes: ['nombreTipoAnimal']
        },
        attributes:['idEspecie','nombreEspecie']
    });
     res.json(especie);
});


// CREATE 
router.post('/', async (req, res) => {
     
   const especie = await Especie.create(  {
       nombreEspecie: req.body.nombreEspecie, 
       idTipoAnimal_FK: req.body.idTipoAnimal_FK    
   });
   
    res.json({succes: "Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idDep', async(req, res) => {
    const especie = await Especie.update({
        nombreEspecie: req.body.nombreEspecie,
        idTipoAnimal_FK: req.body.idTipoAnimal_FK
    },{
        where: { idEspecie: req.params.idDep }
    });
    
     res.json({success:"Actualizado con exito"});
});

router.delete('/:idDep', async(req, res) => {
    await Especie.destroy({
        where: { idEspecie: req.params.idEspecie}
    });
     res.json({succes: 'Eliminado con exito'});
});
module.exports = router;