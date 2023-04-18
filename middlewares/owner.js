const fs = require("fs");
const blogs = JSON.parse(fs.readFileSync(`data/blogs.json`));

/*

Complete the middleware isOwner

which will move further only if the creator_id of the request blog is same as request_by in req.body
API /api/v1/blogs/:id --> here id is id of blog
req.body = {
    request_by : request_by
}

Response:

1. blog with given id doesnot exist --> 

404 Status code 
json = {
    status: "Failed",
    message: "Blog not found!",
}

2. requested blog creator_id does not match with request_by
403 Status code 
json = {
    status: "Failed",
    message: "Access Denied",
}

3. Success -> Next.

*/

function isOwner() {
    try {
        return function (req, res, next) {

            const { request_by } = req.body;
            
        }

    } catch (err) {
        return res.status(400).json({
            status: "Failed",
            message: "Unable to check access level"
        })
    }
}

module.exports = { isOwner };