const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Category.findAll({
      include: [{ model: Product, through: ProductTag }]
    });
    return res.status(200).json(tagData)
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    });
    if (!oneTagData) {
      return res.status(404).json({ message: "Sorry no Tag with that id was found. Please try again." })
    }
    return res.status(200).json(oneTagData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createTagData = await Tag.create({
      tag_name: req.body.tag_name
    })
    return res.status(200).json(createTagData)
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateTagData = await Tag.update({
      tag_name: req.body.tag_name
    },
      {
        where: {
          id: req.params.id,
        }
      }
    );

    if (!updateTagData[0]) {
      return res.status(404).json({ message: "Sorry no Tag with that id was found. Please try again." })
    }
    return res.status(200).json({ message: `Tag with the id of ${req.params.id} had it's name changed to ${req.body.tag_name}` });

  } catch (err) {
    return res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const destroyTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    if (destroyTag === 0) {
      return res.json({ message: "Sorry no Tag with that id was found. Please try again." })
    }
    return res.status(200).json({ message: `Tag with the id of ${req.params.id} has been destroyed` })
  } catch (err) {
    return res.status(500).json(err)
  }
});

module.exports = router;
