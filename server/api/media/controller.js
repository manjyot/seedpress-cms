const Media = require('../../../models').Media;

// Register new media
function saveMedia(req, res) {
  const title = req.body.title ? req.body.title.trim() : '';
  const image = req.body.image ? req.body.image.trim() : '';
  const text = req.body.text ? req.body.text.trim() : '';
  const speaker = req.body.speaker ? req.body.speaker.trim() : '';
  const date = req.body.date ? req.body.date : new Date();
  const category = req.body.category ? req.body.category.trim() : '';
  const link = req.body.link ? req.body.link.trim() : '';
  const tags = req.body.tags ? req.body.tags : [];
  const updated = req.body.updated ? req.body.updated : new Date();
  const status = req.body.status ? req.body.status.trim() : '';

  if (!title) {
    return res
      .status(422)
      .send({
        error: 'A title is required.'
      });
  }

  // Check if title already exists
  Media.findAll({where: {title}})
    .then((mediaRes) => {
      if (mediaRes.length > 0) {
        return res
          .status(400)
          .send({
            error: 'The media has already been created'
          });
      }

      const newMedia = {title,image,text,speaker,date,category,link,tags,updated,status};

      Media.create(newMedia)
        .then((media) => {
          return res.json({media});
        })
        .catch((err) => res.status(400).send({
          error: err.message
        }));
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

// Get all posts
function getAllMedia(req, res) {
  Media.findAll()
    .then((media) => {
      return res.json(media);
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

// Get one media
function getMedia(req, res) {
  Media.findById(req.params.id)
    .then((media) => {
      if (!media || media.title.length <= 0) {
        return res.status(400).send({
          error: 'No media found'
        });
      }
      return res.json({media});
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

module.exports = {
  saveMedia,
  getAllMedia,
  getMedia
};
