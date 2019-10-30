//require mysql 
var mysql = require('mysql');
// require inquirer
var inquirer = require('inquirer');
// require config
const conf = require('./config.js')
var connection = mysql.createConnection(conf)
var items= null
connection.connect(function (err){
if (err) throw err
init();
});
function init() {
  //prints the items for sale and info 
  connection.query('SELECT * FROM Products', function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name
        + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
      console.log('--------------------------------------------------------------------------------------------------')
      if (err) throw err;
    }
    items=res
    makepurchse()
  })
}
function makepurchse() {
  inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "What is the ID of the product you would like to purchase?",
      validate: function (value) {
        if (isNaN(value) == false &&  parseInt(value) > 0) {
          return true;
        }
        else {
          return false;
        }
      }
    },

    {
      type: "input",
      name: "amount",
      message: "How much would you like to purchase?",
      validate: function (value) {
        if (isNaN(value)) {
          return false;
        } else {
          return true;
        }
      }
    }
  ]).then(function (ans) {
    var whatToBuy = items.find(function(it){return it.item_id==ans.id});
    var howMuch = parseInt(ans.amount);
    console.log(items);
    var Total = parseFloat(whatToBuy.price * howMuch).toFixed(2);
    

    //check if amount is available 
    if (whatToBuy.stock_quantity >= howMuch) {
      //after purchase, updates quantity in Products
      connection.query("UPDATE Products SET ? WHERE ?", [
        { stock_quantity: (whatToBuy.stock_quantity - howMuch) },
        { item_id: ans.id }
      ], function (err, result) {
        if (err) throw err;
        console.log("Success! Your total is $" + Total +
          ". it will be shipped soon ");
          askagain();
      });


    } else {
      
      console.log("not enough in stock");
      askagain();
    }


  })
}
// }
//ask if they are done
function askagain() {
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to keep shopping?"
  }]).then(function (ans) {
    if (ans.reply) {
      init();
    } else {
      console.log("See you soon!");
    }
  });
}
