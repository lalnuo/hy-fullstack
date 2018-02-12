const supertest = require("supertest");
const app = require("../server");
const api = supertest(app);
const Blog = require("../blog");

test("notes are returned as json", async () => {
  const response = await api.get("/api/blogs").expect(200);

  expect(response.body.length).toBe(0);
});

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

describe("creating blogs", () => {
  beforeEach(async () => {
    await Blog.remove({});
    console.log("everything removed");
  });
  test("adding a new blog", async () => {
    const newBlog = {
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12
    };

    const response = await api
      .post("/api/blogs")
      .send({
        title: "foo",
        author: "bar",
        url: "bar",
        likes: 44
      })
      .expect(201);
    const blogs = await Blog.find({});

    expect(blogs.length).toBe(1);
  });
});

afterAll(() => {
  server.close();
});
