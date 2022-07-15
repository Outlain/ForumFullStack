const { Router } = require("express");
const router = new Router();

const Boards = require("../models/Board.model");
const Posts = require("../models/Post.model");
const CommentModel = require('../models/Commentmodel.model')

const { isLoggedIn, isLoggedOut } = require("../middleware/routeguard");

router.get("/boards/:board", (req, res, next) => {
    let currentboard = req.params.board;
    Boards.findOne({ board: currentboard })
        .populate("postArray")
        .then((foundBoard) => {
            // console.log(foundBoard + '\\\\\\\\\\\\OOOOOOOOOOOOOOOOO\\\\\\\\\\\\')
            res.render("boards/boards.hbs", { currentboard, foundBoard });
        });
});
Boards.findOne({ board: "freeForAll" });
// .then(here => console.log(here + '////////////////////////////////////////////'))

router.get("/boards/:board/newPost", isLoggedIn, (req, res, next) => {
    currentboard = req.params.board;
    // console.log(currentboard + 'even more stgringsadfsdf')
    res.render(`newPost.hbs`, { currentboard });
});

router.post("/boards/:board/newPost", (req, res, next) => {
    currentboard = req.params.board;
    // console.log(currentboard + "///////////////////////")
    console.log("The Post is happening")
    const { paragraph } = req.body;
    // console.log(paragraph);
    console.log(req.session);

    Posts.create({
        paragraph: paragraph,
        board: currentboard,
        currentUser: req.session.currentUser.username,
    }).then((posts) => {
        console.log(posts);
        Boards.findOne({ board: currentboard }).then((mainboard) => {
            mainboard.postArray.push(posts._id);
            mainboard.save()
                .then(() => res.redirect(`/boards/${currentboard}`)
                )
                .catch(err => next(err))
            console.log(
                mainboard.postArray + "/////////////////////////////////////"
            );
        });
        // .then(response => console.log(`response: ` + response))
    });
    // console.log(posts + 'this one')
    // console.log(Boards)
    // let unique = Boards.find(currentboard)
    // console.log(unique)
    // // console.log(unique._id)
    // Boards.findByIdAndUpdate(unique._id, { $push: { postsArray: posts._id } }, { new: true })
    //         .then(response => console.log(`response: ` + response))

});

router.get("/boards/:all/AllPosts", (req, res, next) => {
    // all = req.params.all;
    // res.send(all + "even more stgringsadfsdf");
    let all = req.params.all;
    console.log(all)
    Posts.findOne({ paragraph: all })
        .populate("CommentArray")
        .then((foundPostsPopulate) => {
            // console.log(foundPostsPopulate.CommentArray[0].comment + '\\\\\\\\\\\\OOOOOOOOOOOOOOOOO\\\\\\\\\\\\')
            res.render("boards/commentsRender.hbs", { all, foundPostsPopulate });
        });
});

router.get("/boards/createcomment/:comment", isLoggedIn, (req, res, next) => {
    comment = req.params.comment;
    res.render("boards/comments", { comment });
    console.log(comment + 'even more stgringsadfsdf')
    // res.render(`newPost.hbs`, { currentboard });
});
router.post("/boards/createcomment/:comment", (req, res, next) => {
    let commentz = req.params.comment;
    console.log("The Post is happening")
    console.log(commentz + "even more stgringsadfsdf");
    const { thecomment } = req.body;
    console.log(thecomment)
    CommentModel.create({
        comment: thecomment,
        postType: comment,
    }).then((comment) => {
        console.log(comment)
        Posts.findOne({ paragraph: commentz }).then((mainPost) => {
            mainPost.CommentArray.push(comment._id);
            mainPost.save()
                .then(() => res.redirect(`/boards/${commentz}/AllPosts`)
                )
                .catch(err => next(err))
            console.log(mainPost.CommentArray + "THIS IS THE MAIN POST!!!!!")
        })
    })
});

module.exports = router;

// router.get("/freeforall", (req, res, next) => {
//     res.render("forums/freeforall.hbs");
// });

// router.get("/shareTank", (req, res, next) => {
//     res.render("forums/shareTank.hbs");
// });

// router.get("/fishTrades", (req, res, next) => {
//     res.render("forums/fishTrades.hbs");
// });

// router.get("/brakish", (req, res, next) => {
//     res.render("forums/brakish.hbs");
// });

// router.get("/freeforall/newPost", (req, res, next) => {
//     res.render("newPost.hbs");
// });
// router.post("/freeforall/newPost", (req, res, next) => {
//     const {paragraph} = req.body

// });
