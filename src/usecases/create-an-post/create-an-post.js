const { Post } = require("@/entities");

const createAnPostUseCase = async ({ payload = Post }) => {
  const payloadValuesToArray = Object.values(payload);
  const hasInvalidPayloadProp = payloadValuesToArray.some(
    (prop) => typeof prop !== "string"
  );
  if (hasInvalidPayloadProp) {
    throw new Error("Received publication to be wrong");
  }
};

module.exports = createAnPostUseCase;
