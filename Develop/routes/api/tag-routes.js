const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    res.status(200).json(await Tag.findAll({
      include: [ 
        {
          model: Product, 
          through: ProductTag,
        }
      ]
    }))
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
  
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    res.status(200).json(await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product, 
        through: {
          attributes: []
        }
      }
    }));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  // create a new tag
  try {
    res.status(200).json(await Tag.create(req.body));
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    res.status(200).json(await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    }));
  } catch (err) {
    console.log(err);
    res.status(400);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    res.status(200).json(await Tag.destroy({
      where: {
        id: req.params.id
      }
    }));
  } catch (err) {
    console.log(err);
    res.status(400);
  }
});

module.exports = router;
