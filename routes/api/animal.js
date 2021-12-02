const router = require('express').Router();
const Animal = require('../../database/models/Animal');
const TipoAnimal = require('../../database/models/TipoAnimal');
const Enfermedad = require('../../database/models/Enfermedad');
const Tratamiento = require('../../database/models/Tratamiento');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage})

//consultar todos los Animales
router.get('/', async(req, res) => {
    const animal = await Animal.findAll(
        {
        include:[{
            model: TipoAnimal,
            attributes: ['nombreTipoAnimal']
        },
        {
            model: Enfermedad,
            attributes:['nombreEnfermedad']
        },
        {
            model: Tratamiento,
            attributes:['nombreTratamiento']
        }],
    })
    res.json(animal);
});


//consultar todos los animales adoptados
router.get('/adoptados', async(req, res) => {
    const animal = await Animal.findAll(
        {
        where: {estadoAnimal: 'adoptado'},
        include:[{
            model: TipoAnimal,
            attributes: ['nombreTipoAnimal']
        },
        {
            model: Enfermedad,
            attributes:['nombreEnfermedad']
        },
        {
            model: Tratamiento,
            attributes:['nombreTratamiento']
        }],
    });
    
    res.json(animal);
});


//consultar todos los animales en tratamiento
router.get('/enTratamiento', async(req, res) => {
    const animal = await Animal.findAll(
        {
        where: {estadoAnimal: 'en tratamiento'},
        include:[{
            model: TipoAnimal,
            attributes: ['nombreTipoAnimal']
        },
        {
            model: Enfermedad,
            attributes:['nombreEnfermedad']
        },
        {
            model: Tratamiento,
            attributes:['nombreTratamiento']
        }],
    });
     res.json(animal);
});

//consultar todos los animales en proceso de adopcion
router.get('/enProcesoAdopcion', async(req, res) => {
    const animal = await Animal.findAll(
        {
        where: {estadoAnimal: 'en proceso de adopción'},
        include:[{
            model: TipoAnimal,
            attributes: ['nombreTipoAnimal']
        },
        {
            model: Enfermedad,
            attributes:['nombreEnfermedad']
        },
        {
            model: Tratamiento,
            attributes:['nombreTratamiento']
        },
        ],
        
    });
     res.json(animal);
});

// CREATE 
router.post('/nuevo', upload.single('fotografia') , async (req, res) => {
   console.log(req.file)
   const animal = await Animal.create({
       nombreAnimal: req.body.nombreAnimal,
       edad: req.body.edad,
       fechaLlegada: req.body.fechaLlegada,
       motivoLlegada: req.body.motivoLlegada,
       genero: req.body.genero,
       estadoAnimal: "en tratamiento",
       fotografia: req.file,
       idTipoAnimal_FK: req.body.idTipoAnimal_FK,
       idEnfermedad_FK: req.body.idEnfermedad_FK,
       idTratamiento_FK: req.body.idTratamiento_FK,

   }).catch(err=>{
       res.json({err:"error al crear el Animal", detallesError:err.errors[0]});
   });

   res.status(201).json({success: "Animal Creado Con Exito"});
});

// UPDATE
router.put('/actualizar/:idAnimal',upload.single('fotografia'), async(req, res) => {
    const animal = await Animal.update({
        nombreAnimal: req.body.nombreAnimal,
        edad: req.body.edad,
        fechaLlegada: req.body.fechaLlegada,
        motivoLlegada: req.body.motivoLlegada,
        genero: req.body.genero,
        estadoAnimal: req.body.estadoAnimal,
        fotografia: req.file,
        idTipoAnimal_FK: req.body.idTipoAnimal_FK,
        idEnfermedad_FK: req.body.idEnfermedad_FK,
        idTratamiento_FK: req.body.idTratamiento_FK,
    },{
        where: { idAnimal: req.params.idAnimal }
    });
     res.json({success:"Animal Actualizado con exito"});
});

// Cambiar estado a adoptado
router.put('/cambiarEstadoAdoptado/:idAnimal', async(req, res) => {
    const animal = await Animal.update({
        estadoAnimal : 'adoptado'
    }, {
        where: { idAnimal: req.params.idAnimal }
    });
    res.status(201).json({message: 'Estado actual adoptado'});
});

// Cambiar estado a "en tratamiento"
router.put('/cambiarEstadoEnTratamiento/:idAnimal', async(req, res) => {
    const animal = await Animal.update({
        estadoAnimal : 'en tratamiento'
    }, {
        where: { idAnimal: req.params.idAnimal }
    });

    res.status(201).json({message: 'Estado actual en tratamiento'});
});


//Cambiar estado a en proceso de adopcion
router.put('/cambiarEstadoEnProcesoAdopcion/:idAnimal', async(req, res) => {
    const animal = await Animal.update({
        estadoAnimal : 'en proceso de adopción'
    }, {
        where: { idAnimal: req.params.idAnimal }
    });

    res.status(201).json({message: 'Estado actual en proceso de adopción'});
});


module.exports = router;