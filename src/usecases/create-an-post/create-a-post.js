const { PostRepositoryPort } = require("@/ports/database/post-repository");
const { HttpFrameworkPort } = require("@/ports/http-framework");
const { validateReceivedPublication } = require("../helpers");
const { CreateAnPostDTO } = require("./dto");

const createAPostUseCase = async (
  { payload = CreateAnPostDTO },
  postRepository = PostRepositoryPort,
  { ok } = HttpFrameworkPort
) => {
  validateReceivedPublication(payload);
  const createdPost = await postRepository.create(payload);
  return ok(createdPost);
};

module.exports = createAPostUseCase;
