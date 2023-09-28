const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll();
    return res.status(200).json(categoryData)
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!oneCategoryData) {
      return res.status(404).json({ message: "Sorry no category with that id was found. Please try again." })
    }
    return res.status(200).json(oneCategoryData);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategoryData = await Category.create({
      category_name: req.body.category_name
    })
    return res.status(200).json(createCategoryData)
  } catch (err) {
    return res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {

    const updateCategoryData = await Category.update({
      category_name: req.body.category_name
    },
      {
        where: {
          id: req.params.id,
        }
      }
    );

    if (!updateCategoryData[0]) {
      return res.status(404).json({ message: "Sorry no category with that id was found. Please try again." })
    }
    return res.status(200).json({ message: `Category with the id of ${req.params.id} had it's name changed to ${req.body.category_name}` });

  } catch (err) {
    return res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const destroyCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if (destroyCategory === 0) {
      return res.json({ message: "Sorry no category with that id was found. Please try again." })
    }
    return res.status(200).json({ message: `Category with the id of ${req.params.id} has been destroyed` })
  } catch (err) {
    return res.status(500).json(err)
  }
});

module.exports = router;
