const { PostToCreateDTO, PostToEditDTO } = require("./dto");

const PostRepositoryPort = {
  create: async (payload = PostToCreateDTO) => {
    throw new Error("NOT_IMPLEMENTED");
  },
  listAll: async () => {
    throw new Error("NOT_IMPLEMENTED");
  },
  update: async (payload = PostToEditDTO) => {
    throw new Error("NOT_IMPLEMENTED");
  }
};

module.exports = PostRepositoryPort;
