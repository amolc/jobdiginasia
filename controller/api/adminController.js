const connection = require('../../db/db')


exports.getAllData = (req, res) => {
    connection.query(`select * from Candidate `,(err,result,fields)=>{
      if(err){
        return console.log(err);
      }
      res.send(result);
    })
}

exports.getallCandidate=(req, res) => {
    connection.query(`select * from Candidate `,(err,result,fields)=>{
      if(err){
        return console.log(err);
      }
      res.send(result);
    })
}

exports.addDataInCandidate = (req, res) => {
    connection.query('INSERT INTO Candidate SET ?', req.body, (err, result) => {
      if (err) throw err;
  
      res.status(201).send(`User added with ID: ${result.id}`);
  });
}

exports.findUser = (req, res) => {
    connection.query(`select * from Candidate WHERE ID = ?`,[req.params.id],(err,result,fields)=>{
      if(err){
        throw err;
      }
      res.send(result);
    })
}

exports.deleteUser = (req, res) => {
  
    connection.query('DELETE FROM Candidate WHERE ID = ?', [req.params.id], (err, result,fields) => {
        if (err){ throw err;}
  
        res.send('User deleted.');
    });
}

exports.updateUser = (req, res) => {
    const id = req.params.id;
  
    connection.query('UPDATE Candidate SET Category = ? WHERE id = ?', [req.body.Category, id], (error, result) => {
        if (error) throw error;
  
        res.send('User updated successfully.');
    });
}