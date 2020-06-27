const express = require('express');
const app = express()
const pool = require("./db");
const cors = require("cors");
app.use(cors());
app.use(express.json()); 


app.post("/bugs", async (req, res) => {
    try {
      const { description } = req.body;
      const newBug = await pool.query(
        "INSERT INTO bug (description) VALUES($1) RETURNING *",
        [description]
      );
  
      res.json(newBug.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });


  app.get("/bugs", async (req, res) => {
    try {
      const allBugs = await pool.query("SELECT * FROM bug");
      res.json(allBugs.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

  app.put("/bugs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateBug = await pool.query(
        "UPDATE bug SET description = $1 WHERE bug_id = $2",
        [description, id]
      );
  
      res.json("Bug was updated!");
    } catch (err) {
      console.error(err.message);
    }
  });
  
  
  app.delete("/bugs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteBug = await pool.query("DELETE FROM bug WHERE bug_id = $1", [
        id
      ]);
      res.json("Bug was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });
  


app.use(express.static('public'))
app.listen(process.env.PORT || 4000, () => console.log('All is running'))