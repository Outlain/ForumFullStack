const { Router } = require('express');
const router = new Router();

const Boards = require('../models/Board.model');
const Posts = require('../models/Post.model');

const { isLoggedIn, isLoggedOut } = require('../middleware/routeguard')

router.get("/boards/:board", (req, res, next) => {
    let currentboard = req.params.board
    Boards.findOne({ board: currentboard })
    .populate('postArray')
        .then(foundBoard => {
            console.log(foundBoard + '\\\\\\\\\\\\OOOOOOOOOOOOOOOOO\\\\\\\\\\\\')
            res.render("boards/boards.hbs", { currentboard, foundBoard });
        })
});
Boards.findOne({ board: 'freeForAll' })
    .then(here => console.log(here + '////////////////////////////////////////////')
    )

    
    router.get("/boards/:board/newPost", (req, res, next) => {
        currentboard = req.params.board
        // console.log(currentboard + 'even more stgringsadfsdf')
        res.render(`newPost.hbs`, { currentboard });
    });
    router.post("/boards/:board/newPost", (req, res, next) => {
        currentboard = req.params.board
        console.log(currentboard + "///////////////////////")
        const { paragraph } = req.body
        console.log(paragraph)
        console.log(req.session)

        Posts.create({
            paragraph: paragraph,
            board: currentboard,
            currentUser: req.session.currentUser.username
        })
        .then(posts => {
            console.log(posts)
            Boards.findOne({ board: currentboard })
            .then(mainboard => {
                mainboard.postArray.push(posts._id)
                mainboard.save('done');
                console.log(mainboard.postArray + '/////////////////////////////////////')
            })
            // .then(response => console.log(`response: ` + response))
        })
        // console.log(posts + 'this one')
        // console.log(Boards)
        // let unique = Boards.find(currentboard)
        // console.log(unique)
        // // console.log(unique._id)
        // Boards.findByIdAndUpdate(unique._id, { $push: { postsArray: posts._id } }, { new: true })
        //         .then(response => console.log(`response: ` + response))
        
        res.redirect(`/boards/${currentboard}`)
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