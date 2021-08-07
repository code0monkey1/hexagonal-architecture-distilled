const getSpecificPostUseCase = require("./get-specific-post");
const { handleErrorDecorator } = require("../decorators");
const { PostRepositoryInMemoryAdapter } = require("@/adapters/database/in-memory");
const { HttpFrameworkMockAdapter } = require("@/adapters/http/mock");

const makeFixture = () => ({
  id: "any_id"
});

const makeSut = () => {
  const makedPostRepositoryInMemoryAdapter = PostRepositoryInMemoryAdapter();
  const makedHttpFrameworkMockAdapter = HttpFrameworkMockAdapter();
  const sut = (payload) => {
    const makedUseCase = () =>
      getSpecificPostUseCase({ payload }, makedPostRepositoryInMemoryAdapter, makedHttpFrameworkMockAdapter);
    return handleErrorDecorator(makedUseCase, makedHttpFrameworkMockAdapter);
  };

  return {
    sut,
    makedPostRepositoryInMemoryAdapter
  };
};

describe("Get specific post", () => {
  test("should validate all required properties to get a specific post", async () => {
    const { sut } = makeSut();

    const testable = await sut({ id: null });

    expect(testable).toEqual({
      statusCode: 404,
      body: {
        message: "Received publication to be wrong"
      }
    });
  });

  test("should call repository correctly to get a specific post", async () => {
    const { sut, makedPostRepositoryInMemoryAdapter } = makeSut();

    const spyUpdate = jest.spyOn(makedPostRepositoryInMemoryAdapter, "listOne");
    spyUpdate.mockImplementationOnce(() => Promise.resolve({}));

    await sut(makeFixture());

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(spyUpdate).toHaveBeenCalledWith(makeFixture());
  });
});