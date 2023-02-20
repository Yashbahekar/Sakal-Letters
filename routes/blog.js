const express = require("express");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/letters");
});

// router.get("/posts", async function (req, res) {
//   const query = `
//   select posts.*,authors.name from posts 
//   INNER JOIN authors 
//   ON posts.author_id = authors.id 
//   `;

//   const [posts] = await db.query(query);

//   res.render("posts-list", { posts: posts });
// });


router.get("/new-letter", async function(req,res){

  const[receivers] = await db.query("select * from receivers");
  const[lettertypes] = await db.query("select * from letter_type");

  res.render("new-letter",{receivers:receivers,lettertypes:lettertypes});
})


router.get("/letters", async function (req, res) {
  const query = `
  select letterfrom.Location,letterfrom.Office_name,letterfrom.Person_name,letterfrom.Date_time,receivers.Emp_name from letterfrom, receivers 
  where letterfrom.Emp_id = receivers.Emp_id;
  `;

  const [letters] = await db.query(query);

  res.render("letter-list", { letters: letters });
});

router.get("/receivers", async function(req,res){
  const query = `
  select receivers.Emp_name,receivers.Contact_no,receivers.Email, departments.Dept_name from
  receivers, departments
  where receivers.Dept_id = departments.Dept_id
  `;

  const [receivers] = await db.query(query);
  res.render('receivers',{receivers:receivers});
})

router.get("/departs", async function(req,res){
  const query = `
  select Dept_name, IsActive from departments`;

  const [departs] = await db.query(query);
  res.render('departments', {departs:departs});
})

router.post("/letters",async function(req,res){
  
  const data = [
    req.body.location,
    req.body.officename,
    req.body.sender,
    req.body.datetime,
    req.body.receiver,
    req.body.lettertype
  ]

  await db.query(
    "insert into letterfrom(Location,Office_name,Person_name,Date_time,Emp_id,Letter_id) values(?)", [data]
  );
  res.redirect("letters");
})

// router.post("/posts", async function (req, res) {
  //   // req.body;
  //   const data = [
    //     req.body.title,
    //     req.body.summary,
    //     req.body.content,
    //     req.body.author,
    //   ];
    //   await db.query(
      //     "INSERT INTO posts(title, summary, body, author_id) VALUES(?)",
      //     [data]
      //   );
      //   res.redirect("/posts");
      // });
      
      // router.get("/new-post", async function (req, res) {
      //   const [authors] = await db.query("SELECT * FROM authors");
      
      //   res.render("create-post", { authors: authors });
      //   // res.render("post-item",{authors:authors});
      // });

      // router.get("/posts/:id", async function (req, res) {
        //   const query = `
//     SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts
//     INNER JOIN authors ON posts.author_id = authors.id
//     WHERE posts.id = ?

//   `;

//   const [posts] = await db.query(query, [req.params.id]);

//   if (!posts || posts.length === 0) {
//     return res.status(404).render("404");
//   }

//   const postData = {
//     ...posts[0],
//     date: posts[0].date.toISOString(),
//     humanReadableDate: posts[0].date.toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     }),
//   };

//   res.render("post-detail", { post: postData });
// });

// router.get("/posts/:id/edit", async function (req, res) {
//   const query = `
//   select * from posts where id = ?
//   `;
//   const [posts] = await db.query(query, [req.params.id]);

//   if (!posts || posts.length === 0) {
//     return res.status(404).render("404");
//   }

//   res.render("update-post", { post: posts[0] });
// });

// router.post("/posts/:id/edit", async function (req, res) {
  
//   const query = `
//   UPDATE posts
//   SET title = ?,
//   summary = ?,
//   body = ?
//   where id = ?
//   `;

//   await db.query(query, [
//     req.body.title,
//     req.body.summary,
//     req.body.content,
//     req.params.id,
//   ]);

//   res.redirect("/posts");
// });


// router.post('/posts/:id/delete', async function(req,res){

//   await db.query('DELETE FROM posts WHERE id = ?',[req.params.id]);
//   res.redirect('/posts');
// });

module.exports = router;
