const express = require('express');
const db = require('./connection');

const app = express();
//Static Folder
app.use(express.static('public'));
//EJS
app.set('view engine', 'ejs');

//How many posts we want to show on each page
const resultsPerPage = 30;

app.get('/', (req, res) => {
    let sql = 'SELECT * FROM photos';
    db.query(sql, (err, result) => {
        if(err) throw err;
        const numOfResults = result.length;
        const numberOfPages = Math.ceil(numOfResults / resultsPerPage);
        let page = req.query.page ? Number(req.query.page) : 1;
        if(page > numberOfPages){
            res.redirect('/?page='+encodeURIComponent(numberOfPages));
        }else if(page < 1){
            res.redirect('/?page='+encodeURIComponent('1'));
        }
        //Determine the SQL LIMIT starting number
        const startingLimit = (page - 1) * resultsPerPage;
        //Get the relevant number of POSTS for this starting page
        sql = `SELECT * FROM photos LIMIT ${startingLimit},${resultsPerPage}`;
        db.query(sql, (err, result)=>{
            if(err) throw err;
            let iterator = (page - 5) < 1 ? 1 : page - 5;
            let endingLink = (iterator + 9) <= numberOfPages ? (iterator + 9) : page + (numberOfPages - page);
            if(endingLink < (page + 4)){
                iterator -= (page + 4) - numberOfPages;
            }
            res.render('index', {data: result, page, iterator, endingLink, numberOfPages});
        });
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server has started on PORT 3000');
});