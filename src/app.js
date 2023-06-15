const fs = require("fs");
const express = require("express");
const app = express();

// Importing discussions from discussions.json file
const blogs = JSON.parse(fs.readFileSync(`data/blogs.json`));
const { isOwner } = require('../middlewares/owner')

// Middlewares
app.use(express.json());


app.get("/api/v1/blogs", (req, res) => {

    res.status(200).json({
        status: "Success",
        message: "Blogs fetched successfully",
        data: {
          blogs,
        },
      });

});


app.post("/api/v1/blogs", (req, res) => {

  var obj = req.body;
  obj['id'] = (blogs[blogs.length-1].id)+1;
  blogs.push(obj);

  fs.writeFile(
    `data/blogs.json`,
    JSON.stringify(blogs),
    (err) => {
      res.status(200).json({
        status: "Success",
        message: "Blog added successfully"
      })
    }
  );

});


app.patch("/api/v1/blogs/:id", isOwner, (req, res) => {

  const id = req.params.id * 1;
  const updatedDetails = blogs.find(
    (updatedDetails) => updatedDetails.id === id
  );

  const index = blogs.indexOf(updatedDetails);

  if (!updatedDetails) {
    return res.status(404).send({
      status: "Failed",
      message: "Blog not found!",
    });
  }

  Object.assign(updatedDetails, req.body);

  fs.writeFile(
    `data/blogs.json`,
    JSON.stringify(blogs),
    (err) => {
      res.status(200).json({
        status: "Success",
        message: `Blog Updated Successfully`
      });
    }
  );
});


app.delete("/api/v1/blogs/:id", isOwner, (req, res) => {
  const id = req.params.id * 1;
  const userDetailToDelete = blogs.find(
    (detailTODelete) => detailTODelete.id === id
  );
  if (!userDetailToDelete) {
    return res.status(404).send({
      status: `Failed`,
      message: `Blog not found!`,
    });
  }
  const index = blogs.indexOf(userDetailToDelete);
  blogs.splice(index, 1);
  fs.writeFile(
    `data/blogs.json`,
    JSON.stringify(blogs),
    (err) => {
      res.status(200).json({
        status: `Success`,
        message: `Blog Deleted Successfully`
      });
    }
  );
});



module.exports = app;
