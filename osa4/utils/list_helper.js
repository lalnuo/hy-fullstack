const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => blogs.reduce((acc, i) => acc + i.likes, 0);

const favoriteBlog = blogs =>
  blogs.reduce((acc, i) => (i.likes > acc.likes ? i : acc));

const mostBlogs = blogs => {
  const authors = {};

  blogs.forEach(blog => {
    authors[blog.author] = (authors[blog.author] || 0) + 1;
  });

  const max = Math.max(...Object.values(authors));
  return {
    author: Object.keys(authors).find(key => authors[key] === max),
    blogs: max
  };
};

const mostLikes = blogs => {
  const authors = {};

  blogs.forEach(blog => {
    authors[blog.author] = (authors[blog.author] || 0) + blog.likes;
  });

  const max = Math.max(...Object.values(authors));
  return {
    author: Object.keys(authors).find(key => authors[key] === max),
    likes: max
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
