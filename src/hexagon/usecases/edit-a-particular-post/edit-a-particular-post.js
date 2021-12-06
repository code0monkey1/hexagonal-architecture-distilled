const { PostRepositoryPort } = require("@/hexagon/ports/driven/for-post-repository");
const { HttpFrameworkPort } = require("@/hexagon/ports/driver/http-framework");
const { validateReceivedPublication } = require("@/hexagon/usecases/helpers");
const { EditAParticularPostDTO } = require("@/hexagon/usecases/edit-a-particular-post/dto");

const editAParticularPostUseCase =
  (postRepository = PostRepositoryPort, { badRequest, ok } = HttpFrameworkPort) =>
  async ({ payload = EditAParticularPostDTO }) => {
    validateReceivedPublication(payload.data);
    const postHasUpdated = await postRepository.update(payload);
    if (!postHasUpdated) return badRequest("The publication was not found");
    return ok("Post has been updated");
  };

module.exports = editAParticularPostUseCase;
